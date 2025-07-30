<template>
	<AppScoreCard v-if="benchmark !== null">
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section class="col-shrink">
					<div class="text-h6 text-weight-600 q-py-sm text-white">
						{{ benchmark.name }}
					</div>
				</q-item-section>
				<q-item-section side>
					<AppModelFilter
						:models="rowList"
						@filtered="(list) => (filteredModelDataList = list)"
					></AppModelFilter>
				</q-item-section>
			</q-item>
		</template>
		<AppScoreTable
			:columns="columnList"
			:rows="filteredModelDataList"
		></AppScoreTable>
	</AppScoreCard>
	<app-markdown-html
		class="q-mt-md"
		:src="`benchmark/${props.benchmarkId}/comment`"
	></app-markdown-html>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type { BenchmarkAbstract } from './type';
import type { ModelData, Column } from 'components/ScoreTable.vue';
import { computed, onBeforeMount, ref } from 'vue';

import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import AppScoreCard from 'components/ScoreCard.vue';
import AppScoreTable from 'components/ScoreTable.vue';
import AppModelFilter from 'components/ModelFilter.vue';

import * as Backend from 'src/backend';
import { toNumberOrNull } from 'components/utils';

const props = defineProps<{
	benchmarkId: string;
}>();

const benchmark = ref<
	| (BenchmarkAbstract & {
			properties: Record<string, Data.BenchmarkProperty>;
	  })
		| null
		>(null);

const modelList = ref<(Data.Model & { id: string })[]>([]);
const modelScoreRecord = ref<Record<string, Data.ScoreValueList>>({});
const filteredModelDataList = ref<ModelData[]>([]);

const columnList = computed<Column[]>(() => {
	return Object.values(benchmark.value!.properties)
		.sort((a, b) => a.order - b.order)
		.map((property) => ({ name: property.label, sorting: 'desc' }));
});

const rowList = computed<ModelData[]>(() => {
	const list: ModelData[] = [];

	const propertyList = Object.values(benchmark.value!.properties).sort(
		(a, b) => a.order - b.order,
	);

	const scores = modelScoreRecord.value;

	for (const model of modelList.value) {
		const data: ModelData = {
			id: model.id,
			name: model.name,
			scores: [],
		};

		const items = scores[model.id]!;

		if (items === undefined) {
			const spanList = [
				`Model(${model.id}) `,
				`benchmark ${props.benchmarkId}) `,
				'legacy score is missing.',
			];

			console.log(spanList.join(''));
			continue;
		}

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

	modelList.value = await Backend.API.Model.queryHasBenchmark(
		props.benchmarkId,
	);

	for (const { id, score } of modelList.value) {
		modelScoreRecord.value[id] = score.benchmark[benchmarkData.id]!.legacy!;
	}
});

defineOptions({ name: 'AppPageScoreCard' });
</script>
