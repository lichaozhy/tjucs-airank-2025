<template>
	<q-table
		class="app-rank-table fixed-layout-table width-full"
		:rows="props.rows"
		:columns="columnList"
		hide-pagination
		square
		flat
		:pagination="{ rowsPerPage: 30 }"
		bordered
	>
		<template #body-cell-rank="props">
			<q-td :props="props">
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
import { computed } from 'vue';
import AppRankBadge from './RankBadge.vue';
import { toNoneOrFixed, getColumnEMWidth } from './utils';

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
	field: () => null;
	align: ColumnAlignment;
	headerStyle: string;
	[key: string]: unknown;
}

const PREFIX_COLUMN_LIST = [
	{
		name: 'rank',
		label: '#',
		field: '',
		align: 'center',
		headerStyle: 'width: 6em',
	},
	{
		name: 'model',
		label: 'Model',
		field: 'model',
		align: 'left',
		headerStyle: 'width: 260px;',
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
	}>(),
	{
		rows: () => [],
		columns: () => [],
	},
);

const NULL_FIELD_ACCESSOR = () => null;

const columnList = computed(() => {
	const propertyColumnList: ColumnOptions[] = [];

	for (const [index, name] of props.columns.entries()) {
		propertyColumnList.push({
			name: `item(${index})`,
			field: NULL_FIELD_ACCESSOR,
			label: name,
			align: 'right',
			sortable: true,
			headerStyle: `width:${getColumnEMWidth(name.length)}em`,
		});
	}

	return [...PREFIX_COLUMN_LIST, ...propertyColumnList, ...SUFFIX_COLUNM_LIST];
});

defineOptions({ name: 'AppLeaderboardScoreTable' });
</script>
