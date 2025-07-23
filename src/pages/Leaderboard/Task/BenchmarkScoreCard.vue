<template>
	<AppScoreCard v-if="benchmark !== null">
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section class="col-shrink">
					<div class="text-h6 text-weight-600 q-py-sm text-white">
						{{ benchmark.name }}
					</div>
				</q-item-section>
				<q-item-section side v-if="false">
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
import type { BenchmarkAbstract } from './type';
import type { ModelData } from 'components/ScoreTable.vue';
import type { ModelFilter } from 'components/ModelFilter.vue';
import { computed, onBeforeMount, ref } from 'vue';

import AppScoreCard from 'components/ScoreCard.vue';
import AppScoreTable from 'components/ScoreTable.vue';
import AppModelFilter from 'components/ModelFilter.vue';

import * as Backend from 'src/backend';
import { toNumberOrNull } from 'components/utils';

const props = defineProps<{
	benchmarkId: string;
}>();

const benchmark = ref<BenchmarkAbstract & {
	properties: Record<string, Data.BenchmarkProperty>;
} | null>(null);

const modelList = ref<(Data.Model & { id: string })[]>([]);
const modelScoreRecord = ref<Record<string, Data.ScoreValueList>>({});
const currentFilter = ref<ModelFilter>(() => true);

const columnList = computed(() => {
	return Object.values(benchmark.value!.properties)
		.sort((a, b) => a.order - b.order)
		.map((property) => property.label);
});

function setFilter(filter: ModelFilter) {
	currentFilter.value = filter;
}

const rowList = computed<ModelData[]>(() => {
	const list: ModelData[] = [];

	const propertyList = Object.values(benchmark.value!.properties)
		.sort((a, b) => a.order - b.order);

	const scores = modelScoreRecord.value;

	for (const model of modelList.value.filter(currentFilter.value)) {
		const data: ModelData = {
			id: model.id,
			name: model.name,
			scores: [],
		};

		const items = scores[model.id]!;

		for (const [index, property] of propertyList.entries()) {
			data.scores[index] = toNumberOrNull(items[property.index]);
		}

		list.push(data);
	}

	return list;
});

onBeforeMount(async () => {
	const BenchmarkAPI = Backend.API.Benchmark(props.benchmarkId);
	const benchmarkData = await BenchmarkAPI.get();

	benchmark.value = {
		id: benchmarkData.id,
		name: benchmarkData.name,
		properties: benchmarkData.properties,
	};

	modelList.value = await Backend.API.Model.queryHasBenchmark(props.benchmarkId);

	for (const { id, score } of modelList.value) {
		modelScoreRecord.value[id] = score.benchmark[benchmarkData.id]!.legacy!;
	}
});

defineOptions({ name: 'AppPageScoreCard' });
</script>
