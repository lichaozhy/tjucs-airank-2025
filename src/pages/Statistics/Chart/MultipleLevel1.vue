<template>
	<div class="relative-position full-width full-height">
		<app-bar-chart
			y-name="Sample Size"
			:legend-show="false"
			:x-data="xData"
			:data-list="yData"
			class="fit"
			:font-size="14"
			tooltip
		></app-bar-chart>
		<div class="text-h5 text-center text-grey-6 text-weight-bold">
			Fine-grained Capabilities
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import AppBarChart from 'components/BarChart.vue';
import * as Capability from './Capability';
import * as Benchmark from './Benchmark';

const props = defineProps<{
	benchmarkList: string[];
}>();

const capabilityLevel1List = ref<Capability.CapabilityAbstract[]>([]);

const xData = computed(() => {
	return capabilityLevel1List.value.map(({ name }) => name);
});

const yData = ref<number[]>([]);

watch(
	() => props.benchmarkList,
	async () => {
		const _capabilityLevel1List = await Capability.fetchLevel1();

		const count: Record<string, number> = {};

		for (const { id } of _capabilityLevel1List) {
			count[id] = 0;
		}

		for (const benchmarkId of props.benchmarkList) {
			const { statistics } = await Benchmark.fetch(benchmarkId);

			for (const [id, value] of Object.entries(statistics.capabilities)) {
				count[id]! += value;
			}
		}

		capabilityLevel1List.value = _capabilityLevel1List;
		yData.value = _capabilityLevel1List.map(({ id }) => count[id]!);
	},
	{ immediate: true },
);
defineOptions({ name: 'AppPageStatisticsChartMultipleLevel1' });
</script>
