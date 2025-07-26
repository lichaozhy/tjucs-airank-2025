<template>
	<q-table
		class="app-rank-table fixed-layout-table width-full"
		:rows="props.rows"
		:columns="columnList"
		hide-pagination
		square
		flat
		v-model:pagination="pagination"
		bordered
		separator="cell"
		binary-state-sort
		ref="table"
	>
		<template #header="slotProps">
			<q-tr
				:props="slotProps"
				style="visibility: collapse"
			>
				<q-th
					v-for="col in slotProps.cols"
					:key="col.name"
					:props="slotProps"
				></q-th>
			</q-tr>
			<q-tr v-if="props.groups !== null">
				<q-th
					colspan="2"
					class="app-cell-sticky app-right-shadow"
				></q-th>
				<q-th
					style="z-index: 1"
					v-for="(column, index) in props.groups"
					:key="index"
					:colspan="column.colspan"
					>{{ column.label }}</q-th
				>
			</q-tr>
			<q-tr :props="slotProps">
				<q-th
					v-for="(col, index) in slotProps.cols"
					:key="col.name"
					:props="slotProps"
					class="relative-position"
					:class="{ 'app-right-shadow': col.name === 'model' }"
				>
					<q-checkbox
						class="absolute"
						style="top: 2px; left: 2px"
						v-model="selectedColumns[index - 2]"
						dense
						color="dark"
						v-if="selectedColumns !== null && selectableColumns[col.name]"
					/>
					{{ col.label }}
				</q-th>
			</q-tr>
		</template>

		<template #body-cell-rank="props">
			<q-td
				:props="props"
				style="padding: 0 !important"
			>
				<AppRankBadge
					:order="props.rowIndex + 1"
					v-if="props.rowIndex < 3"
				></AppRankBadge>
				<span v-else>{{ props.rowIndex + 1 }}</span>
			</q-td>
		</template>

		<template v-slot:body-cell-model="slotProps">
			<q-td
				class="app-right-shadow"
				:props="slotProps"
			>
				<router-link
					style="text-decoration: none"
					:to="{
						name: 'app.model.detail',
						params: { id: slotProps.row.id },
					}"
					class="col-shrink text-black"
				>
					<q-checkbox
						v-if="selectedRows !== null && selectableRows[slotProps.rowIndex]"
						class="absolute"
						style="top: 2px; right: 2px"
						v-model="selectedRows[slotProps.rowIndex]"
						dense
					/>
					<div class="text-weight-medium">{{ slotProps.row.name }}</div>
				</router-link>
			</q-td>
		</template>

		<template
			v-for="(property, index) in props.columns"
			:key="index"
			#[`body-cell-item(${index})`]="props"
		>
			<q-td :props="props">{{
				toNoneOrFixed((props.row as ModelData).scores[index]!)
			}}</q-td>
		</template>
	</q-table>
</template>

<script setup lang="ts">
import type { QTable, QTableProps } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';

import AppRankBadge from 'components/RankBadge.vue';
import { toNoneOrFixed, getColumnEMWidth } from 'components/utils';

export type Score = number | null;

export interface ModelData {
	id: string;
	name: string;
	scores: Score[];
}

export type ColumnAlignment = 'left' | 'center' | 'right';

export interface ColumnOptions {
	name: string;
	label: string;
	field: (data: ModelData) => unknown;
	align: ColumnAlignment;
	headerStyle: string;
	[key: string]: unknown;
}

export interface GroupOptions {
	label: string;
	colspan: number;
}

const PREFIX_COLUMN_LIST = [
	{
		name: 'rank',
		label: '#',
		field: '',
		align: 'center',
		classes: 'app-cell-sticky',
		headerClasses: 'app-cell-sticky',
		headerStyle: 'width: 4em;padding: 0 !important;',
	},
	{
		name: 'model',
		label: 'Model',
		field: 'model',
		align: 'left',
		classes: 'app-cell-sticky',
		headerClasses: 'app-cell-sticky',
		style: 'left:4em',
		headerStyle: 'width: 260px;left:4em',
	},
];

const SUFFIX_COLUNM_LIST = [
	{
		name: 'blank',
		label: ' ',
		field: 'blank',
	},
];

const props = withDefaults(
	defineProps<{
		rows?: ModelData[];
		columns?: string[];
		groups?: null | GroupOptions[];
		rowSelectable?: (boolean | undefined)[];
		columnSelectable?: (boolean | undefined)[];
	}>(),
	{
		rows: () => [],
		columns: () => [],
		groups: null,
		rowSelectable: () => [],
		columnSelectable: () => [],
	},
);

type SelectedRecord = Record<string, boolean>;

function SelectedRecord(length: number, fillValue: boolean = false) {
	const record: SelectedRecord = {};

	for (let index = 0; index < length; index++) {
		record[index] = fillValue;
	}

	return record;
}

const selectedRows = defineModel<SelectedRecord | null>('selectedRows', {
	default: null,
});

const selectedColumns = defineModel<SelectedRecord | null>('selectedColumns', {
	default: null,
});

const table = ref<QTable | null>(null);

const pagination = ref<QTableProps['pagination']>({
	sortBy: 'item(0)',
	descending: false,
	rowsPerPage: 30,
});

watch(pagination, () => pagination.value!.descending = true);

watch(() => props.rows, () => {
	selectedRows.value = SelectedRecord(props.rows.length);
}, { immediate: true });

watch(() => props.columns, () => {
	selectedColumns.value = SelectedRecord(props.columns.length);
}, { immediate: true });

const selectableColumns = computed<Record<string, boolean>>(() => {
	const record: Record<string, boolean> = {};

	for (const [index, flag] of props.columnSelectable.entries()) {
		record[`item(${index})`] = flag === true ? true : false;
	}

	return record;
});

const selectableRows = computed<Record<string, boolean>>(() => {
	const record: Record<string, boolean> = {};

	for (const [index, flag] of props.rowSelectable.entries()) {
		record[index] = flag === true ? true : false;
	}

	return record;
});

const columnList = computed(() => {
	const propertyColumnList: ColumnOptions[] = [];

	for (const [index, name] of props.columns.entries()) {
		const styleList = [`width:${getColumnEMWidth(name.length)}em`];

		propertyColumnList.push({
			name: `item(${index})`,
			field: (data) => data.scores[index],
			label: name,
			align: 'right',
			sortable: true,
			headerStyle: styleList.join(';'),
		});
	}

	return [...PREFIX_COLUMN_LIST, ...propertyColumnList, ...SUFFIX_COLUNM_LIST];
});

onMounted(() => {
	const tableComponent = table.value!;

	tableComponent.sort('item(0)');
	tableComponent.sort('item(0)');
});

defineOptions({ name: 'AppLeaderboardScoreTable' });
</script>

<style lang="scss">
$size: 4px;

.app-right-shadow {
	box-shadow: inset $size * -1 0 $size $size * -1 rgba(0, 0, 0, 0.2);
}
</style>
