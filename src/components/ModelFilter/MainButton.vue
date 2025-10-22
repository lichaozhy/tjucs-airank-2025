<template>
	<q-btn
		dark
		text-color="white"
		dropdown-icon="filter_alt"
		color="indigo-10"
		square
		content-class="no-border-radius"
		transition-show="none"
		icon-right="filter_alt"
		@click="showing = !showing"
		unelevated
	>
		<div class="q-mr-sm">
			<span>{{ filteredList.length }}</span>
			<span class="q-mx-sm">/</span>
			<span>{{ props.models.length }}</span>
		</div>
	</q-btn>
	<q-dialog
		v-model="showing"
		square
	>
		<q-card>
			<q-list dense>
				<q-item-label
					header
					class="text-capitalize text-black text-weight-bold"
					>Filter Options</q-item-label
				>
				<q-separator />
				<template
					v-for="item in itemList"
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
							v-model:filter="filters[item.name]"
							v-model="item.modelValue"
						></app-item-enum>
						<app-item-range
							v-if="item.type === 'range'"
							v-bind="item.props"
							v-model:reset="item.modelReset"
							v-model:filter="filters[item.name]"
							v-model="item.modelValue"
						></app-item-range>
					</q-item>
					<q-separator spaced />
				</template>
			</q-list>
			<q-toolbar>
				<q-btn
					flat
					square
					label="reset"
					@click="resetAll"
				/>
				<q-space />
				<q-btn
					color="indigo-10"
					square
					label="confirm"
					@click="showing = false"
				/>
			</q-toolbar>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type { ModelData } from '../ScoreTable.vue';
import { computed, ref, watch } from 'vue';

import * as Backend from 'src/backend';
import AppItemEnum from './Item/Enum.vue';
import AppItemRange from './Item/Range.vue';

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

type ItemName = 'vision' | 'language' | 'author' | 'size' | 'year';
type Filter = (value: number | string) => boolean;

interface BaseItem {
	name: ItemName;
	modelReset: () => unknown;
}

interface EnumItem extends BaseItem {
	type: 'enum';
	modelValue: Record<string, boolean>;
	props: {
		values: string[];
	};
}

interface RangeItem extends BaseItem {
	type: 'range';
	modelValue: { min: number; max: number };
	props: {
		unit?: string;
		overflow?: boolean;
		min: number;
		max: number;
	};
}

const DEFAULT = {
	RESET: () => {},
	FILTER: () => true,
};

const showing = ref<boolean>(false);
const modelDataRecord = ref<Record<string, Data.Model>>({});
const itemList = ref<(EnumItem | RangeItem)[]>([]);

function resetAll() {
	for (const { modelReset: reset } of itemList.value) {
		reset();
	}
}

const filters = ref<Record<ItemName, Filter>>({
	vision: DEFAULT.FILTER,
	language: DEFAULT.FILTER,
	author: DEFAULT.FILTER,
	size: DEFAULT.FILTER,
	year: DEFAULT.FILTER,
});

const filteredList = computed<ModelData[]>(() => {
	const record = modelDataRecord.value;
	const Filter = filters.value;

	return props.models.filter(({ id }) => {
		if (record[id] === undefined) {
			return false;
		}

		let matched = true;
		const { component, author, size, release } = record[id];

		if (component !== undefined) {
			const { vision, language } = component;

			if (vision !== undefined) {
				for (const value of vision) {
					if (!Filter.vision(value)) {
						matched &&= false;
					}
				}
			}

			if (language !== undefined) {
				for (const value of language) {
					if (!Filter.language(value)) {
						matched &&= false;
					}
				}
			}
		}

		if (author !== undefined) {
			for (const value of author) {
				if (!Filter.author(value)) {
					matched &&= false;
				}
			}
		}

		if (size !== undefined) {
			for (const value of size) {
				if (!Filter.size(value)) {
					matched &&= false;
				}
			}
		}

		if (release !== undefined) {
			if (!Filter.year(release.year)) {
				matched &&= false;
			}
		}

		return matched;
	});
});

const Record = (list: string[]) =>
	Object.fromEntries(list.map((v) => [v, true]));

watch(filteredList, (list) => emit('filtered', list), { immediate: true });

watch(
	() => props.models,
	async (modelList) => {
		const idList = modelList.map(({ id }) => id);
		const modelFetchingList = idList.map((id) => Backend.API.Model(id).get());
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
				modelReset: DEFAULT.RESET,
				modelValue: Record(visionList),
				props: {
					values: visionList,
				},
			},
			{
				name: 'language',
				type: 'enum',
				modelReset: DEFAULT.RESET,
				modelValue: Record(languageList),
				props: {
					values: languageList,
				},
			},
			{
				name: 'author',
				type: 'enum',
				modelReset: DEFAULT.RESET,
				modelValue: Record(authorList),
				props: {
					values: authorList,
				},
			},
			{
				name: 'size',
				type: 'range',
				modelReset: DEFAULT.RESET,
				modelValue: {
					min: Math.min(...sizeList),
					max: Math.max(...sizeList),
				},
				props: {
					unit: 'B',
					overflow: true,
					min: Math.min(...sizeList),
					max: Math.max(...sizeList),
				},
			},
			{
				name: 'year',
				type: 'range',
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
	},
	{ immediate: true },
);

defineOptions({ name: 'AppModelFilter' });
</script>
