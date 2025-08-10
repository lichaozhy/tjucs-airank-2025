<template>
	<div
		v-if="hasRadar && hasEnoughtColumns"
		class="app-echart-radar row justify-center"
		style="height: 560px"
	>
		<div class="col-lg-10 col-md-12 relative-position">
			<AppCapabilityRadarChart
				:indicator-list="radarIndicatorList"
				:data-list="radarDataList"
			></AppCapabilityRadarChart>
		</div>
	</div>
	<AppScoreCard>
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section>
					<div class="text-h6 text-weight-600 q-py-sm text-white row">
						<div class="col col-shrink q-mr-lg">
							Embodied Capability Leaderboard
						</div>
						<div class="col col-shrink content-end">
							<div class="text-weight-light text-body1">
								<slot name="subtitle"></slot>
							</div>
						</div>
					</div>
				</q-item-section>
				<q-item-section side>
					<AppModelFilter
						:models="props.rows"
						@filtered="setRowList"
					></AppModelFilter>
				</q-item-section>
			</q-item>
		</template>

		<AppScoreTable
			:columns="props.columns"
			:rows="filteredModelDataList"
			:groups="props.groups"
			:column-selectable="selectableColumns"
			:row-selectable="selectableRows"
			v-model:selected-rows="selectedRows"
			v-model:selected-columns="selectedColumns"
		></AppScoreTable>
	</AppScoreCard>
	<slot></slot>
</template>

<script setup lang="ts">
import type { ModelData, GroupOptions, Column } from 'components/ScoreTable.vue';
import type * as Radar from 'components/CapabilityRadarChart.vue';
import { computed, ref, watch } from 'vue';

import AppScoreCard from 'components/ScoreCard.vue';
import AppModelFilter from 'components/ModelFilter.vue';
import AppScoreTable from 'components/ScoreTable.vue';
import AppCapabilityRadarChart from 'components/CapabilityRadarChart.vue';

export interface RadarOptions {
	columns: Record<string, true>;
}

export type RadarProps = RadarOptions | null;

const props = withDefaults(
	defineProps<{
		groups?: GroupOptions[] | null;
		columns?: Column[];
		rows?: ModelData[];
		radarOptions?: RadarProps;
	}>(),
	{
		groups: null,
		columns: () => [],
		rows: () => [],
		radarOptions: null,
	},
);

const MIN_ITEN_LENGTH = 3;

const selectedRows = ref<Record<string, boolean> | null>(null);
const selectedColumns = ref<Record<string, boolean> | null>(null);
const filterPropertyValue = ref<number | string | null>(null);
const filteredModelDataList = ref<ModelData[]>([]);

function setRowList(
	result: ModelData[],
	_propertyName: string | null,
	propertyValue: string | number | null,
) {
	filteredModelDataList.value = result;
	filterPropertyValue.value = propertyValue;
}

const hasRadar = computed<boolean>(() => {
	if (props.radarOptions === null) {
		return false;
	}

	if (Object.keys(props.radarOptions.columns).length < MIN_ITEN_LENGTH) {
		return false;
	}

	if (filteredModelDataList.value.length === 0) {
		return false;
	}

	return true;
});

const selectableColumns = computed<Record<string, boolean>>(() => {
	const { radarOptions } = props;

	if (radarOptions === null) {
		return {};
	}

	return props.columns.map((_, index) => radarOptions.columns[index] || false);
});

const selectableRows = computed<Record<string, boolean>>(() => {
	const record: Record<string, boolean> = {};

	for (const { id } of filteredModelDataList.value) {
		record[id] = true;
	}

	return record;
});

const radarIndicatorList = computed<Radar.IndicatorOptions[]>(() => {
	const columnIndeies = selectedColumns.value;

	if (columnIndeies === null) {
		return [];
	}

	return Object.entries(columnIndeies)
		.filter(([, flag]) => flag)
		.map(([index]) => ({ name: props.columns[Number(index)]!.name }));
});

const radarDataList = computed<Radar.DataObject[]>(() => {
	const selected = selectedRows.value;

	if (selected === null) {
		return [];
	}

	const columns = Object.entries(selectedColumns.value!)
		.filter(([, flag]) => flag);

	return props.rows
		.filter(({ id }) => selected[id] === true)
		.map(({ name, scores }) => ({
			name, value: columns.map(([index]) => scores[Number(index)]!),
		}));
});

const hasEnoughtColumns = computed(() => {
	if (selectedColumns.value === null) {
		return false;
	}

	if (Object.values(selectedColumns.value).filter(flag => flag).length < 3) {
		return false;
	}

	return true;
});

watch(
	[hasRadar, selectableColumns, filteredModelDataList],
	([newHasRadar, newSelectableColumns, newModelDataList]) => {
		if (newHasRadar) {
			const columns: Record<string, boolean> = {};
			const rows: Record<string, boolean> = {};

			for (const [index, flag] of Object.entries(newSelectableColumns)) {
				if (flag === true) {
					columns[index] = true;
				}
			}

			newModelDataList.sort((a, b) => b.scores[0]! - a.scores[0]!);

			for (const [index, { id }] of Object.entries(newModelDataList)) {
				rows[id] = Number(index) < 5;
			}

			selectedColumns.value = columns;
			selectedRows.value = rows;
		} else {
			selectedColumns.value = null;
			selectedRows.value = null;
		}
	},
	{ immediate: true },
);

defineOptions({ name: 'AppPageLeaderboardCapabilityScoreCard' });
</script>
