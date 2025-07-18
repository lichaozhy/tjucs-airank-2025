<template>
	<q-table
		class="app-rank-table fixed-layout-table width-full"
		:rows="props.rows"
		:columns="columnList"
		hide-pagination
		square
		flat
		:pagination="{ rowsPerPage: 100 }"
		bordered
		separator="cell"
		binary-state-sort
		ref="table"
	>
		<template #header="scopeProps">
			<q-tr
				:props="scopeProps"
				style="visibility: collapse"
			>
				<q-th
					v-for="col in scopeProps.cols"
					:key="col.name"
					:props="scopeProps"
				></q-th>
			</q-tr>
			<q-tr v-if="props.groups !== null">
				<q-th
					colspan="2"
					class="app-cell-sticky"
				></q-th>
				<q-th
					style="z-index: 1"
					v-for="(column, index) in props.groups"
					:key="index"
					:colspan="column.colspan"
					>{{ column.label }}</q-th
				>
			</q-tr>
			<q-tr :props="scopeProps">
				<q-th
					v-for="col in scopeProps.cols"
					:key="col.name"
					:props="scopeProps"
				>
					{{ col.label }}
				</q-th>
			</q-tr>
		</template>

		<template #body-cell-rank="props">
			<q-td
				:props="props"
				style="padding: 0 !important"
			>
				<AppRankBadge :order="props.rowIndex + 1"></AppRankBadge>
			</q-td>
		</template>

		<template v-slot:body-cell-model="props">
			<q-td :props="props">
				<router-link
					style="text-decoration: none"
					:to="{
						name: 'app.model.detail',
						params: { id: props.row.id },
					}"
					class="col-shrink text-black"
				>
					<div class="text-weight-medium">{{ props.row.name }}</div>
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
import type { QTable } from 'quasar';
import { computed, onMounted, ref } from 'vue';

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
	}>(),
	{
		rows: () => [],
		columns: () => [],
		groups: null,
	},
);

const table = ref<QTable | null>(null);

const columnList = computed(() => {
	const propertyColumnList: ColumnOptions[] = [];

	for (const [index, name] of props.columns.entries()) {
		const styleList = [
			`width:${getColumnEMWidth(name.length)}em`,
			// 'writing-mode: vertical-rl',
			// 'text-orientation: mixed',
		];

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
