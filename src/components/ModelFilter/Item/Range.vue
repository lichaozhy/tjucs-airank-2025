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
import { onBeforeMount, onUnmounted, ref, watch } from 'vue';
import { useManager } from './use';

type Range = { min: number, max: number };

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

function reset() {
	range.value = {
		min: props.min,
		max: props.max,
	};
}

const { manager } = useManager();
const range = ref<Range>({ min: props.min, max: props.max });

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


watch(range, ({ min, max }) => {
	emit('configure', value => value <= max && value >- min);
});

defineOptions({ name: 'AppModelFilterItemRange' });
</script>
