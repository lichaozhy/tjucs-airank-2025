<template>
	<q-btn-dropdown
		dark
		text-color="white"
		dropdown-icon="filter_alt"
		outline
		square
		content-class="no-border-radius"
		transition-show="none"
	>
		<template #label>
			<span>{{ filteredList.length }}</span>
			<span class="q-mx-sm">/</span>
			<span>{{ props.models.length }}</span>
		</template>

		<q-list
			style="width: 50vw; max-width: 600px; min-width: 300px;"
			dense
		>
			<q-item-label
				header
				class="text-capitalize text-black text-weight-bold"
				>Filter Options</q-item-label
			>
			<q-separator />
			<template
				v-for="(item) in itemList"
				:key="item.name"
			>
				<q-item-label
					header
					caption
					class="text-capitalize text-weight-bold q-py-sm"
					>{{ item.name }}</q-item-label
				>
				<q-item>
					<app-item-enum
						v-if="item.type === 'enum'"
						v-bind="item.props"
						v-model:reset="item.modelReset"
						v-model:filter="item.modelFilter"
						v-model="item.modelValue"
					></app-item-enum>
					<app-item-range
						v-if="item.type === 'range'"
						v-bind="item.props"
						v-model:reset="item.modelReset"
						v-model:filter="item.modelFilter"
						v-model="item.modelValue"
					></app-item-range>
				</q-item>
				<q-separator spaced />
			</template>
		</q-list>
		<q-toolbar>
			<q-space />
			<q-btn
				flat
				square
				label="reset"
				@click="resetAll"
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

interface BaseItem {
	name: string;
	modelFilter: (value: number | string) => boolean;
	modelReset: () => unknown;
}

interface EnumItem extends BaseItem {
	type: 'enum';
	modelValue: Record<string, boolean>;
	props: {
		values: string[]
	}
}

interface RangeItem extends BaseItem {
	type: 'range';
	modelValue: { min: number, max: number };
	props: {
		min: number;
		max: number;
	}
}

const DEFAULT = {
	RESET: () => {},
	FILTER: () => true,
};

const modelDataRecord = ref<Record<string, Data.Model>>({});
const itemList = ref<(EnumItem | RangeItem)[]>([]);

function resetAll() {
	for (const { modelReset: reset } of itemList.value) {
		reset();
	}
}

const filteredList = computed<ModelData[]>(() => {
	const record = modelDataRecord.value;

	return props.models.filter(({ id }) => {
		const data = record[id];

		if (data === undefined) {
			return false;
		}

		return true;
	});
});

const Record = (list: string[]) => Object.fromEntries(list.map(v => [v, true]));

watch(filteredList, list => emit('filtered', list), { immediate: true });

watch(() => props.models, async (modelList) => {
	const idList = modelList.map(({ id }) => id);
	const modelFetchingList = idList.map(id => Backend.API.Model(id).get());
	const modelDataList = await Promise.all(modelFetchingList);
	const _group = await Backend.API.Model.PropertyRecord.query(...idList);
	const visionList = Object.keys(_group.vision);
	const languageList = Object.keys(_group.language);
	const authorList = Object.keys(_group.author);
	const sizeList = Object.keys(_group.size).map(Number);
	const yearList = Object.keys(_group.year).map(Number);

	itemList.value = [
		{
			name: 'vision',
			type: 'enum',
			modelFilter: DEFAULT.FILTER,
			modelReset: DEFAULT.RESET,
			modelValue: Record(visionList),
			props: {
				values: visionList,
			},
		},
		{
			name: 'language',
			type: 'enum',
			modelFilter: DEFAULT.FILTER,
			modelReset: DEFAULT.RESET,
			modelValue: Record(languageList),
			props: {
				values: languageList,
			},
		},
		{
			name: 'author',
			type: 'enum',
			modelFilter: DEFAULT.FILTER,
			modelReset: DEFAULT.RESET,
			modelValue: Record(authorList),
			props: {
				values: authorList,
			},
		},
		{
			name: 'size',
			type: 'range',
			modelFilter: DEFAULT.FILTER,
			modelReset: DEFAULT.RESET,
			modelValue: {
				min: Math.min(...sizeList),
				max: Math.max(...sizeList),
			},
			props: {
				min: Math.min(...sizeList),
				max: Math.max(...sizeList),
			},
		},
		{
			name: 'year',
			type: 'range',
			modelFilter: DEFAULT.FILTER,
			modelReset: DEFAULT.RESET,
			modelValue: {
				min: Math.min(...yearList),
				max: Math.max(...yearList),
			},
			props: {
				min: Math.min(...yearList),
				max: Math.max(...yearList),
			},
		},
	];

	const modelDataEntries = modelDataList.map(({ id, ...data }) => [id, data]);

	modelDataRecord.value = Object.fromEntries(modelDataEntries);
}, { immediate: true });

defineOptions({ name: 'AppModelFilter' });
</script>
