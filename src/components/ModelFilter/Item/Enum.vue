<template>
	<q-item-section>
		<div class="row">
			<div
				class="col-shrink"
				v-for="value of props.values.toSorted()"
				:key="value"
			>
				<q-chip
					:label="value"
					no-caps
					:color="selectedValues[value] ? 'indigo-10' : 'grey-6'"
					text-color="white"
					square
					dense
					clickable
					@click="selectedValues[value] = !selectedValues[value]"
				></q-chip>
			</div>
		</div>
	</q-item-section>
</template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref, watch } from 'vue';
import { useManager } from './use';

const props = withDefaults(
	defineProps<{
		id: string;
		values?: string[];
		multiple?: boolean;
	}>(),
	{
		values: () => [],
		multiple: true,
	},
);

const Record = () => Object.fromEntries(props.values.map(v => [v, true]));
const { manager } = useManager();
const selectedValues = ref<Record<string, boolean>>(Record());

function reset() {
	selectedValues.value = Record();
}

manager.register(reset);
watch(props.values, reset, { immediate: true });

const emit = defineEmits<{
	configure: [(value: string) => boolean];
}>();

onBeforeMount(() => {
	const oldValue = manager.getValue(props.id);

	if (oldValue !== undefined) {
		selectedValues.value = { ...oldValue };
	}
});

onUnmounted(() => {
	manager.remove(reset);
	manager.setValue(props.id, { ...selectedValues.value });
});

defineOptions({ name: 'AppModelFilterItemEnum' });
</script>
