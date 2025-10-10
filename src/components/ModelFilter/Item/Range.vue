<template>
	<q-item-section class="q-pt-lg">
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
import { inject, onBeforeMount, onUnmounted, ref, watch } from 'vue';
import * as Item from './symbol';

type Range = { min: number, max: number };

const manager = inject(Item.MANAGER);
if (manager === undefined) {
	throw new Error('<AppModelFilterItemRange> MUST in <AppModelFilter>.');
}

function reset() {
	range.value = {
		min: props.min,
		max: props.max,
	};
}

manager.register(reset);

onUnmounted(() => {
	manager.remove(reset);
	manager.setValue(props.id, { ...range.value });
});

onBeforeMount(() => {
	const oldValue = manager.getValue(props.id);

	if (oldValue !== undefined) {
		range.value = { ...oldValue as Range };
	}
});

const props = withDefaults(defineProps<{
	id: string;
	min: number;
	max: number;
	step?: number;
}>(), {
	step: 1,
});

const emit = defineEmits<{
	configure: [(value: number) => boolean]
}>();

const range = ref<Range>({
	min: props.min,
	max: props.max,
});

watch(range, ({ min, max }) => {
	emit('configure', value => value <= max && value >- min);
});

defineOptions({ name: 'AppModelFilterItemRange' });
</script>
