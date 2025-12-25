<template>
	<div class="relative-position full-width full-height">
		<app-bar-chart
			:legend-show="false"
			y-name="Sample Size"
			:x-data="xData"
			:data-list="yData"
			class="fit"
			:font-size="14"
		></app-bar-chart>
		<div class="text-h5 text-center text-grey-6 text-weight-bold">
			Core Capabilities
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

const capabilityLevel0List = ref<Capability.CapabilityAbstract[]>([]);
const capabilityLevel1List = ref<Capability.CapabilityAbstract[]>([]);

const xData = computed(() => {
	return capabilityLevel0List.value.map(({ name }) => name);
});

const yData = ref<number[]>([]);

watch(
	() => props.benchmarkList,
	async () => {
		const _capabilityLevel0List = await Capability.fetchLevel0();
		const _capabilityLevel1List = await Capability.fetchLevel1();

		const levelMap: Record<string, string> = {};

		for (const { parent, id } of _capabilityLevel1List) {
			levelMap[id] = parent as string;
		}

		const count: Record<string, number> = {};

		for (const { id } of _capabilityLevel0List) {
			count[id] = 0;
		}

		for (const benchmarkId of props.benchmarkList) {
			const { statistics } = await Benchmark.fetch(benchmarkId);

			for (const [id, value] of Object.entries(statistics.capabilities)) {
				count[levelMap[id]!]! += value;
			}
		}

		capabilityLevel0List.value = _capabilityLevel0List;
		capabilityLevel1List.value = _capabilityLevel1List;
		yData.value = _capabilityLevel0List.map(({ id }) => count[id]!);
	},
	{ immediate: true },
);

defineOptions({ name: 'AppPageStatisticsChartMultipleLevel0' });
</script>
