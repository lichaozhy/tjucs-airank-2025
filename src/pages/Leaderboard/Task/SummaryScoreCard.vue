<template>
	<AppScoreCard v-if="summary !== null">
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
import type * as Data from 'src/data';
import type { SummaryAbstract, BenchmarkAbstract } from './type';
import type { ModelData } from 'components/ScoreTable.vue';
import type { ModelFilter } from 'components/ModelFilter.vue';
import { computed, onBeforeMount, ref } from 'vue';

import AppScoreCard from 'components/ScoreCard.vue';
import AppScoreTable from 'components/ScoreTable.vue';
import AppModelFilter from 'components/ModelFilter.vue';

import * as Backend from 'src/backend';
import { toNumberOrNull } from 'components/utils';

const props = defineProps<{
	summaryId: string;
	leaderboardId: string;
}>();

function avg(a: number[]) {
	return a.length ? a.reduce((a, b) => a + b) / a.length : null;
}

const LeaderboardAPI = Backend.API.Leaderboard(props.leaderboardId);
const SummaryAPI = LeaderboardAPI.Summary(props.summaryId);

const summary = ref<SummaryAbstract | null>(null);
const benchmarkList = ref<BenchmarkAbstract[]>([]);
const modelList = ref<Data.Model[]>([]);
const currentFilter = ref<ModelFilter>(() => true);

const columnList = computed(() => {
	return summary.value!.properties.map((property) => property.label);
});

function setFilter(filter: ModelFilter) {
	currentFilter.value = filter;
}

const rowList = computed<ModelData[]>(() => {
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
	const selectedModels = summaryData?.models ?? {};

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
		if (Object.hasOwn(selectedModels, score.model)) {
			models[score.model] = true;
		}
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
