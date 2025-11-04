<template>
	<q-item-section class="q-pt-lg q-px-md">
		<q-range
			v-model="range"
			:min="props.min"
			:max="props.max + (overflow ? 1 : 0)"
			:step="props.step"
			:left-label-value="leftLabel"
			:right-label-value="rightLabel"
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
import { computed, onMounted, watch } from 'vue';

type Range = { min: number; max: number };
type ResetHandler = () => unknown;
type Filter = (value: number) => boolean;

const props = withDefaults(
	defineProps<{
		min: number;
		max: number;
		overflow?: boolean;
		step?: number;
		unit?: string;
	}>(),
	{
		overflow: false,
		step: 1,
	},
);

const range = defineModel<Range>({ required: true });
const reset = defineModel<ResetHandler>('reset', { required: true });
const filter = defineModel<Filter>('filter', { required: true });

const leftLabel = computed<string>(() => {
	const { min } = range.value;

	return `${min}${props.unit ?? ''}`;
});

const rightLabel = computed<string>(() => {
	const { max } = range.value;

	if (max > props.max) {
		return `${props.max}${props.unit ?? ''}+`;
	}

	return `${max}${props.unit ?? ''}`;
});

onMounted(() => {
	reset.value = () => (range.value = { min: props.min, max: props.max });
});

watch(range, ({ min, max }) => {
	filter.value =
		max > props.max
			? (value) => value >= min
			: (value) => value >= min && value <= max;
});

defineOptions({ name: 'AppModelFilterItemRange' });
</script>
