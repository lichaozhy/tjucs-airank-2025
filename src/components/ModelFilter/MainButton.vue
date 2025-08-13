<template>
	<q-btn-dropdown
		dark
		text-color="white"
		dropdown-icon="filter_alt"
		outline
		square
		content-class="no-border-radius overflow-hidden"
	>
		<template #label>
			<span>{{ props.models.length }}</span>
		</template>

		<q-list
			style="width: 30em"
			dense
		>
			<q-item-label
				header
				class="text-capitalize text-black text-weight-bold"
				>Filter Options</q-item-label
			>
			<q-separator />
			<template
				v-for="{ name, ItemComponent, props } in itemList"
				:key="name"
			>
				<q-item-label
					header
					caption
					class="text-capitalize q-py-sm"
					>{{ name }}</q-item-label
				>
				<q-item>
					<component
						:is="ItemComponent"
						v-bind="props"
					></component>
				</q-item>
				<q-separator />
			</template>
		</q-list>
		<q-toolbar>
			<q-space />
			<q-btn
				flat
				square
				label="reset"
				@click="manager.resetAll()"
			/>
		</q-toolbar>
	</q-btn-dropdown>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type { ModelData } from '../ScoreTable.vue';
import { computed, provide, ref, watch } from 'vue';

import * as Backend from 'src/backend';
import * as Item from './ItemManager';
import * as ItemSymbol from './Item/symbol';
import AppItemEnum from './Item/Enum.vue';
import AppItemRange from './Item/Range.vue';

const manager = new Item.FilterItemManager();

provide(ItemSymbol.MANAGER, manager);

const itemList = computed(() => {
	return [
		{
			name: 'vision',
			ItemComponent: AppItemEnum,
			props: {
				id: 'vision',
			},
		},
		{
			name: 'language',
			ItemComponent: AppItemEnum,
			props: {
				id: 'language',
			},
		},
		{
			name: 'author',
			ItemComponent: AppItemEnum,
			props: {
				id: 'author',
			},
		},
		{
			name: 'size',
			ItemComponent: AppItemRange,
			props: {
				id: 'size',
				min: 1,
				max: 700,
			},
		},
		{
			name: 'year',
			ItemComponent: AppItemRange,
			props: {
				id: 'year',
				min: 2017,
				max: 2025,
			},
		},
	];
});

export type ValueGroup = {
	vision: string[];
	language: string[];
	author: string[];
	size: number[];
	year: number[];
};

type ValueCheckGroup = {
	vision: Record<string, boolean>;
	language: Record<string, boolean>;
	author: Record<string, boolean>;
	size: Record<number, boolean>;
	year: Record<number, boolean>;
};

const props = withDefaults(
	defineProps<{
		models?: ModelData[];
	}>(),
	{
		models: () => [],
	},
);

const emit = defineEmits<{
	filtered: [result: ModelData[]];
}>();

const group = ref<ValueGroup>({
	vision: [],
	language: [],
	author: [],
	size: [],
	year: [],
});

watch(() => props.models, async (modelList) => {
	const idList = modelList.map(({ id }) => id);
	const _group = await Backend.API.Model.PropertyRecord.query(...idList);

	emit('filtered', [...modelList]);
}, { immediate: true });

defineOptions({ name: 'AppModelFilter' });
</script>
