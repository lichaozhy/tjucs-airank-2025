<template>
	<q-card square>
		<q-item class="card-header justify-between">
			<q-item-section class="col-shrink">
				<div class="text-h6 text-weight-600 q-py-sm text-white">{{ summary?.name }}</div>
			</q-item-section>
		</q-item>

		<q-table
			class="app-rank-table fixed-layout-table width-full"
			:rows="rowList"
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

			<template #body-cell-model="props">
				<q-td :props="props">
					<router-link
						style="text-decoration: none"
						:to="{ name: 'app.model.detail', params: { id: props.row.model.id } }"
						class="col-shrink text-black"
					>
						<div class="text-weight-medium">{{ props.row.model.name }}</div>
					</router-link>
				</q-td>
			</template>

			<template
				v-for="(property, index) in summaryPropertyList"
				:key="index"
				#[`body-cell-item-index(${index})`]="props"
			>
				<q-td :props="props">{{ toNoneOrFixed(props.row[`property:${index}`]) }}</q-td>
			</template>
		</q-table>
	</q-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';
import type { ColumnAlignment } from './utils';

import {
	getColumnEMWidth,
	STATIC_COLUMN_LIST,
	toNoneOrFixed,
	toNumberOrNull,
	TAIL_BLANK_COLUMN,
} from './utils';

import AppRankBadge from './RankBadge.vue';

const props = defineProps<{
	summaryId: string;
	leaderboardId: string;
}>();

const avg = (a: number[]) => (a.length ? a.reduce((a, b) => a + b) / a.length : null);
const LeaderboardAPI = Backend.API.Leaderboard(props.leaderboardId);
const SummaryAPI = LeaderboardAPI.Summary(props.summaryId);
const summary = ref<Spec.Leaderboard.Summary | null>(null);
const benchmarkList = ref<Spec.Benchmark.Type[]>([]);
const scoreList = ref<Spec.Score.Type[]>([]);
const modelList = ref<Spec.Model.Type[]>([]);

const isReady = computed(() => {
	if (summary.value === null) {
		return false;
	}

	if (benchmarkList.value.length === 0) {
		return false;
	}

	if (scoreList.value.length === 0) {
		return false;
	}

	if (modelList.value.length === 0) {
		return false;
	}

	return true;
});

const summaryPropertyList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	return summary.value?.properties;
});

const columnList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	const dataColumns = summary.value!.properties.map((property, index) => {
		return {
			name: `item-index(${index})`,
			field: `property:${index}`,
			label: property.label,
			align: 'right' as ColumnAlignment,
			sortable: true,
			headerStyle: `width: ${getColumnEMWidth(property.label.length)}em`,
		};
	});

	return [...STATIC_COLUMN_LIST, ...dataColumns, TAIL_BLANK_COLUMN];
});

const rowList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	return modelList.value.map((model) => {
		const data: {
			model: Spec.Model.Type;
			[key: `property:${string}`]: number | null;
		} = { model };

		const valueList: number[] = [];

		for (const [index, property] of summary.value!.properties.entries()) {
			if (property.type !== 'reference') {
				continue;
			}

			const { benchmark: benchmarkId, key } = property.ref!;

			const score = scoreList.value.find((score) => {
				return score.benchmark === benchmarkId && score.model === model.id;
			});

			const benchmark = benchmarkList.value.find((benchmark) => {
				return benchmark.id === benchmarkId;
			});

			if (benchmark === undefined) {
				throw new Error('Bad data.');
			}

			const itemIndex = benchmark.properties[key]!.index;
			const value = score === undefined ? null : score.items[itemIndex]!;

			data[`property:${index}`] = toNumberOrNull(value);

			if (typeof value === 'number') {
				valueList.push(value);
			}
		}

		for (const [index, property] of summary.value!.properties.entries()) {
			if (property.type !== 'computed') {
				continue;
			}

			data[`property:${index}`] = toNumberOrNull(avg(valueList));
		}

		return data;
	});
});

onBeforeMount(async () => {
	const summaryData = await SummaryAPI.get();

	if (summaryData === undefined) {
		throw new Error('Bad data');
	}

	const fetchingBenchmark = summaryData.properties
		.filter((property) => property.type === 'reference')
		.map((property) => Backend.API.Benchmark(property.ref!.benchmark).get());

	const benchmarkListData = await Promise.all(fetchingBenchmark);

	const fetchingScoreList = benchmarkListData.map((benchmark) => {
		const BenchmarkAPI = Backend.API.Benchmark(benchmark.id);

		return BenchmarkAPI.Score.query();
	});

	const scoreListData = (await Promise.all(fetchingScoreList)).flat();
	const models: { [key: string]: true } = {};

	for (const score of scoreListData) {
		models[score.model] = true;
	}

	const fetchingModelList = Object.keys(models).map((modelId) => {
		return Backend.API.Model(modelId).get();
	});

	const modelListData = await Promise.all(fetchingModelList);

	summary.value = summaryData;
	benchmarkList.value = benchmarkListData;
	scoreList.value = scoreListData;
	modelList.value = modelListData;
});

defineOptions({ name: 'AppLeaderboardDetailSummary' });
</script>
