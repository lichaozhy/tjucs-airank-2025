<template>
	<q-item-section class="q-pt-lg q-px-md">
		<q-range
			v-model="range"
			:min="props.min"
			:max="props.max"
			:step="props.step"
			label
			label-always
			markers
			color="indigo-10"
			drag-range
			snap
		></q-range>
	</q-item-section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';

type Range = { min: number, max: number };
type ResetHandler = () => unknown;
type Filter = (value: number) => boolean;

const props = withDefaults(defineProps<{
	min: number;
	max: number;
	step?: number;
}>(), {
	step: 1,
});

const range = defineModel<Range>({ required: true });
const reset = defineModel<ResetHandler>('reset', { required: true });
const filter = defineModel<Filter>('filter', { required: true });

onMounted(() => {
	reset.value = () => range.value = { min: props.min, max: props.max };
});

watch(range, ({ min, max }) => {
	filter.value = (value) => value >= min && value <= max;
});

defineOptions({ name: 'AppModelFilterItemRange' });
</script>
