<template>
	<AppScoreCard>
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section class="col-shrink">
					<div class="text-h6 text-weight-600 q-py-sm text-white">
						{{ benchmark.name }}
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

const { benchmark } = defineProps<{
	benchmark: Spec.Benchmark.Type;
}>();

const BenchmarkAPI = Backend.API.Benchmark(benchmark.id);
const scoreList = ref<Spec.Score.Type[]>([]);
const modelList = ref<Spec.Model.Type[]>([]);

const isReady = computed(() => {
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

	return Object.values(benchmark.properties)
		.sort((a, b) => a.order - b.order)
		.map(property => property.label);
});

const currentFilter = ref<ModelFilter>(() => true);

function setFilter(filter: ModelFilter) {
	currentFilter.value = filter;
}

const rowList = computed<ModelData[]>(() => {
	const list: ModelData[] = [];

	if (!isReady.value) {
		return [];
	}

	const scoreRecord = Object.groupBy(scoreList.value, (score) => score.model);
	const propertyList = Object.values(benchmark.properties);

	for (const model of modelList.value.filter(currentFilter.value)) {
		const data: ModelData = {
			id: model.id,
			name: model.name,
			scores: [],
		};

		const { items } = scoreRecord[model.id]![0]!;

		for (const { index } of propertyList) {
			data.scores[index] = toNumberOrNull(items[index]!);
		}

		list.push(data);
	}

	return list;
});

async function fetchModelFromScore(score: Spec.Score.Type) {
	return await Backend.API.Model(score.model).get();
}

onBeforeMount(async () => {
	scoreList.value = await BenchmarkAPI.Score.query();
	modelList.value = await Promise.all(scoreList.value.map(fetchModelFromScore));
});

defineOptions({ name: 'AppPageLeaderboardDetailBenchmarkScoreCard' });
</script>
