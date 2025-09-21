<template>
	<div v-if="fetched">
		<div class="text-h6">Model Portfolio</div>
		<q-separator class="q-my-sm"></q-separator>

		<div class="row q-col-gutter-md">
			<div class="col-12 col-md-6">
				<q-responsive :ratio="16 / 9">
					<AppRadarChart
						:indicator-list="radarIndicatorList"
						:data-list="radarDataList"
						:max="1"
					></AppRadarChart>
				</q-responsive>
				<app-markdown-html src="page/model/portfolio/radar"></app-markdown-html>
			</div>
			<div class="col-12 col-md-6">
				<q-responsive :ratio="16 / 9">
					<AppBarChart
						:x-data="barNameList"
						:data-list="barValueList"
						:serie-name="model!.name"
					></AppBarChart>
				</q-responsive>
				<app-markdown-html src="page/model/portfolio/bar"></app-markdown-html>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type * as Radar from 'components/RadarChart.vue';
import { computed, onBeforeMount, ref, inject } from 'vue';

import { API } from 'src/backend';
import * as Context from './Context';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import AppRadarChart from 'components/RadarChart.vue';
import AppBarChart from 'components/BarChart.vue';

interface BenchmarkAbstract {
	name: string;
	prIndex: number;
	defaultIndex: number;
}

const model = inject(Context.Model);
const benchmarkSortedIdList = ref<string[]>([]);
const benchmarkAbstractRecord = ref<Record<string, BenchmarkAbstract>>({});
const fetched = ref<boolean>(false);

if (model === undefined) {
	throw new Error('PageModelDetail required.');
}

const modelBenchmarkIdList = computed(() => {
	if (model.value === null) {
		return [];
	}

	const sorted = benchmarkSortedIdList.value;
	const benchmarkScoreGroups = model.value.score.benchmark;

	return Object.keys(benchmarkScoreGroups)
		.filter((benchmarkId) => 'legacy' in benchmarkScoreGroups[benchmarkId]!)
		.sort((a, b) => sorted.indexOf(b) - sorted.indexOf(a));
});

const barNameList = computed(() => {
	return modelBenchmarkIdList.value.map(
		(id) => benchmarkAbstractRecord.value[id]!.name,
	);
});

const barValueList = computed(() => {
	if (model.value === null) {
		return [];
	}

	const scoreBenchmarkGroup = model.value.score.benchmark;

	return modelBenchmarkIdList.value.map((id) => {
		const { defaultIndex } = benchmarkAbstractRecord.value[id]!;

		return scoreBenchmarkGroup[id]!.legacy![defaultIndex] ?? 0;
	});
});

const radarIndicatorList = computed<Radar.IndicatorOptions[]>(() => {
	if (model.value === null) {
		return [];
	}

	return modelBenchmarkIdList.value.map((benchmarkId) => ({
		name: benchmarkAbstractRecord.value[benchmarkId]!.name,
	}));
});

const radarDataList = computed<Radar.DataObject[]>(() => {
	if (model.value === null) {
		return [];
	}

	const scoreBenchmarkGroup = model.value.score.benchmark;

	return [
		{
			name: model.value.name,
			value: modelBenchmarkIdList.value.map((benchmarkId) => {
				const { prIndex } = benchmarkAbstractRecord.value[benchmarkId]!;

				return scoreBenchmarkGroup[benchmarkId]!.legacy![prIndex]!;
			}),
		},
	];
});

onBeforeMount(async () => {
	const _benchmarkAbstractRecord: Record<string, BenchmarkAbstract> = {};
	const benchmarkList = await API.Benchmark.query();

	for (const benchmark of benchmarkList) {
		const pr = benchmark.properties.PercentileRank;

		if (pr !== undefined) {
			_benchmarkAbstractRecord[benchmark.id] = {
				name: benchmark.name,
				prIndex: pr.index,
				defaultIndex: benchmark.properties[benchmark.default.property]!.index,
			};
		}
	}

	benchmarkSortedIdList.value = benchmarkList.map(({ id }) => id);
	benchmarkAbstractRecord.value = _benchmarkAbstractRecord;
	fetched.value = true;
});

defineOptions({ name: 'AppPageModelDetailIllustration' });
</script>
