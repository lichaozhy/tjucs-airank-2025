<template>
	<q-table
		class="app-rank-table fixed-layout-table width-full"
		table-style="overflow-y: hidden;"
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
						size="sm"
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
				<q-checkbox
					v-if="selectedRows !== null && props.rowSelectable[slotProps.row.id]"
					class="absolute"
					style="top: 2px; right: 2px"
					v-model="selectedRows[slotProps.row.id]"
					size="sm"
					dense
				/>
				<router-link
					style="text-decoration: none"
					:to="{
						name: 'app.model.detail',
						params: { id: slotProps.row.id },
					}"
					class="col-shrink text-black"
				>
					<span class="text-weight-medium">{{ slotProps.row.name }}</span>
				</router-link>
			</q-td>
		</template>

		<template
			v-for="(property, index) in props.columns"
			:key="index"
			#[`body-cell-item(${index})`]="props"
		>
			<q-td :props="props">{{
				toNoneOrFixed((props.row as ModelData).scores[index]!, property.fixed ?? 2)
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

export interface Column {
	name: string;
	sorting: 'desc' | 'asc' | null;
	fixed?: number;
}

export type ColumnAlignment = 'left' | 'center' | 'right';

export interface ColumnOptions {
	name: string;
	label: string;
	field: string | ((data: ModelData) => unknown);
	align?: ColumnAlignment;
	headerStyle: string;
	[key: string]: unknown;
}

export interface GroupOptions {
	label: string;
	colspan: number;
}

const PREFIX_COLUMN_LIST: ColumnOptions[] = [
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
		style: 'border-bottom-width: 0',
	},
];

const props = withDefaults(
	defineProps<{
		rows?: ModelData[];
		columns?: Column[];
		groups?: null | GroupOptions[];
		rowSelectable?: Record<string, boolean>;
		columnSelectable?: Record<string, boolean>;
	}>(),
	{
		rows: () => [],
		columns: () => [],
		groups: null,
		rowSelectable: () => ({}),
		columnSelectable: () => ({}),
	},
);

type SelectedRecord = Record<string, boolean>;

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

watch([() => props.columns, selectedColumns], async () => {
	if (selectedColumns.value === null) {
		return;
	}

	const record: SelectedRecord = {};

	for (let index = 0; index < props.columns.length; index++) {
		record[index] = selectedColumns.value[index] || false;
	}

	Object.assign(selectedColumns.value, record);
}, { immediate: true });

const selectableColumns = computed<Record<string, boolean>>(() => {
	const record: Record<string, boolean> = {};

	for (const [index, flag] of Object.entries(props.columnSelectable)) {
		record[`item(${index})`] = flag === true ? true : false;
	}

	return record;
});

const columnNameSortingRecord = computed(() => {
	const record: Record<string, string | null> = {};

	for (const [index, options] of props.columns.entries()) {
		const { sorting } = options;

		record[`item(${index})`] = sorting;
	}

	return record;
});

watch(pagination, () => {
	const { sortBy } = pagination.value!;

	if (columnNameSortingRecord.value[sortBy!] === 'desc') {
		pagination.value!.descending = true;
	}

	if (columnNameSortingRecord.value[sortBy!] === 'asc') {
		pagination.value!.descending = false;
	}
});

const columnList = computed(() => {
	const propertyColumnList: ColumnOptions[] = [];

	for (const [index, options] of props.columns.entries()) {
		const styleList = [`width:${getColumnEMWidth(options.name.length)}em`];

		propertyColumnList.push({
			name: `item(${index})`,
			field: (data) => data.scores[index],
			label: options.name,
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
