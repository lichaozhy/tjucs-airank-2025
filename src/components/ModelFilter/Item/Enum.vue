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
					:color="selected[value] ? 'indigo-10' : 'grey-6'"
					text-color="white"
					square
					dense
					clickable
					@click="selected[value] = !selected[value]"
				></q-chip>
			</div>
		</div>
	</q-item-section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';

type ResetHandler = () => unknown;
type Filter = (value: string) => boolean;

const props = withDefaults(
	defineProps<{
		values?: string[];
		multiple?: boolean;
	}>(),
	{
		values: () => [],
		multiple: true,
	},
);

const selected = defineModel<Record<string, boolean>>({ required: true });
const reset = defineModel<ResetHandler>('reset', { required: true });
const filter = defineModel<Filter>('filter', { required: true });

watch(
	selected,
	(selected) => {
		filter.value = (value) => selected[value] === true;
	},
	{ deep: true },
);

onMounted(() => {
	reset.value = () => {
		selected.value = Object.fromEntries(props.values.map((k) => [k, true]));
	};
});

defineOptions({ name: 'AppModelFilterItemEnum' });
</script>
