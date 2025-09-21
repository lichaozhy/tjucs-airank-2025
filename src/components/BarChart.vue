<template>
	<div
		ref="container"
		class="absolute-full"
	></div>
</template>

<script setup lang="ts">
import type * as Echart from 'echarts';
import { onDeactivated, onMounted, ref, watch } from 'vue';
import * as charts from 'echarts';

const container = ref<HTMLDivElement | null>(null);
let chart: Echart.ECharts;

const props = withDefaults(
	defineProps<{
		xData?: string[];
		dataList?: number[];
		serieName?: string;
	}>(),
	{
		xData: () => [],
		dataList: () => [],
	},
);

function resizeChart() {
	chart.resize();
}

onMounted(() => {
	chart = charts.init(container.value, 'embodied');
	window.addEventListener('resize', resizeChart);

	watch(
		props,
		() => {
			chart.setOption({
				legend: {},
				xAxis: {
					type: 'category',
					inverse: true,
					data: [...props.xData],
					axisLabel: {
						interval: 0,
						rotate: 20,
						fontSize: 10,
					},
				},
				yAxis: {
					type: 'value',
					max: 100,
				},
				series: [
					{
						data: [...props.dataList],
						type: 'bar',
						name: props.serieName,
						label: {
							show: true,
							position: 'top',
						},
					},
				],
			});
		},
		{ immediate: true },
	);
});

onDeactivated(() => {
	window.removeEventListener('resize', resizeChart);
	chart.dispose();
});
</script>
