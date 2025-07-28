<template>
	<div ref="container" class="absolute-full"></div>
</template>

<script setup lang="ts">
import type * as Echart from 'echarts';
import { onDeactivated, onMounted, ref, watch } from 'vue';
import * as charts from 'echarts';

const container = ref<HTMLDivElement | null>(null);
let chart: Echart.ECharts;

export interface IndicatorOptions {
	name: string;
}

export interface DataObject {
	name: string;
	value: number[];
}

const props = withDefaults(defineProps<{
	indicatorList?: IndicatorOptions[];
	dataList?: DataObject[];
}>(), {
	indicatorList: () => [],
	dataList: () => [],
});

function resizeChart() {
	chart.resize();
}

onMounted(() => {
	chart = charts.init(container.value, 'embodied');
	console.log(chart);
	window.addEventListener('resize', resizeChart);

	watch(props, () => {
		chart.setOption({
			legend: {
				orient: 'vertical',
				left: 20,
				top: 'middle',
				data: props.dataList.map(({ name }) => name),
			},
			radar: {
				indicator: props.indicatorList.map(({ name }) => ({ name, max: 100 })),
			},
			series: [
				{
					type: 'radar',
					symbolSize: 2,
					data: [...props.dataList.map(object => ({ ...object }))],
					lineStyle: {
						width: 1,
						opacity: 0.7,
					},
					emphasis: {
						lineStyle: {
							width: 2,
							opacity: 1,
							color: '#666',
						},
					},
				},
			],
		});
	}, { immediate: true });
});


onDeactivated(() => {
	window.removeEventListener('resize', resizeChart);
	chart.dispose();
});
</script>
