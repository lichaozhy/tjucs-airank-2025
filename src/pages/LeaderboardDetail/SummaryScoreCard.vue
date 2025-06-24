<template>
	<AppScoreCard>
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section class="col-shrink">
					<div class="text-h6 text-weight-600 q-py-sm text-white">
						{{ summary?.name }}
					</div>
				</q-item-section>
				<q-item-section side>
					<AppModelFilter @filter-update="setFilter"></AppModelFilter>
				</q-item-section>
			</q-item>
		</template>
		<AppScoreTable
			:columns="columnList"
			:rows="rowList"
		></AppScoreTable>
	</AppScoreCard>
</template>

<script setup lang="ts">
import type { ModelData } from './ScoreTable.vue';
import type { ModelFilter } from './ModelFilter.vue';
import { computed, onBeforeMount, ref } from 'vue';

import AppScoreCard from './ScoreCard.vue';
import AppScoreTable from './ScoreTable.vue';
import AppModelFilter from './ModelFilter.vue';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';
import { toNumberOrNull } from './utils';

const props = defineProps<{
	summaryId: string;
	leaderboardId: string;
}>();

function avg(a: number[]) {
	return a.length ? a.reduce((a, b) => a + b) / a.length : null;
}

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

const columnList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	return summary.value!.properties.map(property => property.label);
});

const currentFilter = ref<ModelFilter>(() => true);

function setFilter(filter: ModelFilter) {
	currentFilter.value = filter;
}

const rowList = computed<ModelData[]>(() => {
	if (!isReady.value) {
		return [];
	}

	return modelList.value.filter(currentFilter.value).map((model) => {
		const data: ModelData = {
			id: model.id,
			name: model.name,
			scores: [],
		};

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

			data.scores[index] = value;

			if (typeof value === 'number') {
				valueList.push(value);
			}
		}

		for (const [index, property] of summary.value!.properties.entries()) {
			if (property.type !== 'computed') {
				continue;
			}

			data.scores[index] = toNumberOrNull(avg(valueList));
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

defineOptions({ name: 'AppPageLeaderboardDetailSummaryScoreCard' });
</script>
