<template>
	<div class="row full-width full-height">
		<div class="col-6 relative-position full-height">
			<app-bar-chart
				y-name="Sample Size"
				:legend-show="false"
				:x-data="benchmarkXData"
				:data-list="benchmarkYData"
				serie-name="Original Metric"
				class="fit"
			></app-bar-chart>
			<div class="text-h5 text-center text-grey-6 text-weight-bold">
				Original Metric
			</div>
		</div>
		<div class="col-6 relative-position full-height">
			<app-bar-chart
				y-name="Sample Size"
				:legend-show="false"
				:x-data="capabilityXData"
				:data-list="capabilityYData"
				serie-name="Capability"
				class="fit"
			></app-bar-chart>
			<div class="text-h5 text-center text-grey-6 text-weight-bold">
				Capability
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import AppBarChart from 'components/BarChart.vue';
import * as Capability from './Capability';
import * as Benchmark from './Benchmark';

const props = defineProps<{
	benchmark: string;
}>();

const capabilityLevel1List = ref<Capability.CapabilityAbstract[]>([]);
const benchmarkAbstract = ref<Benchmark.Abstract | null>(null);

const benchmarkXData = computed(() => {
	const abstract = benchmarkAbstract.value;

	if (abstract === null) {
		return [];
	}

	return abstract.propertyList.map(({ label }) => label);
});

const benchmarkYData = computed<number[]>(() => {
	const abstract = benchmarkAbstract.value;

	if (abstract === null) {
		return [];
	}

	const {
		statistics: { properties },
		propertyList,
	} = abstract;

	return propertyList.map(({ key }) => properties[key]!);
});

const capabilityXData = computed(() => {
	return capabilityLevel1List.value.map(({ name }) => name);
});

const capabilityYData = computed<number[]>(() => {
	const abstract = benchmarkAbstract.value;

	if (abstract === null) {
		return [];
	}

	const _capabilityLevel1List = capabilityLevel1List.value;
	const count: Record<string, number> = {};

	for (const { id } of _capabilityLevel1List) {
		count[id] = 0;
	}

	for (const [id, value] of Object.entries(abstract.statistics.capabilities)) {
		count[id]! += value;
	}

	return _capabilityLevel1List.map(({ id }) => count[id]!);
});

watch(
	() => props.benchmark,
	async (benchmarkId) => {
		const _benchmarkAbstract = await Benchmark.fetch(benchmarkId);
		const _capabilityLevel1List = await Capability.fetchLevel1();

		benchmarkAbstract.value = _benchmarkAbstract;
		capabilityLevel1List.value = _capabilityLevel1List;
	},
	{ immediate: true },
);

defineOptions({ name: 'AppPageStatisticsChartSingleLevel1' });
</script>
