<template>
	<div ref="container"></div>
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
		yName?: string;
		dataList?: number[];
		serieName?: string;
		max?: number;
		legendShow?: boolean;
		xInverse?: boolean;
		fontSize?: number;
		tooltip?: boolean;
	}>(),
	{
		xInverse: false,
		legendShow: true,
		xData: () => [],
		dataList: () => [],
		fontSize: 10,
		tooltip: false,
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
			const maxOptions: { max?: number } = {};

			if (typeof props.max === 'number') {
				maxOptions.max = props.max;
			}

			const tooltipOptions: Record<string, unknown> = {};

			if (props.tooltip) {
				tooltipOptions.tooltip = {
					axisPointer: {
						type: 'cross',
					},
				};
			}

			console.log(tooltipOptions);

			chart.setOption({
				...tooltipOptions,
				legend: {
					show: props.legendShow,
				},
				xAxis: {
					type: 'category',
					inverse: props.xInverse,
					data: [...props.xData],
					axisLabel: {
						interval: 0,
						rotate: 20,
						fontSize: props.fontSize,
					},
				},
				yAxis: {
					type: 'value',
					name: props.yName,
					...maxOptions,
					axisLabel: {
						fontSize: props.fontSize,
					},
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
