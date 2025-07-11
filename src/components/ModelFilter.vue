<template>
	<div class="row q-col-gutter-md">
		<div class="col-grow">
			<q-select
				dark
				square
				outlined
				label="Property"
				style="width: 14em"
				dense
				color="white"
				v-model="propertyNameOption"
				:options="propertyNameOptionList"
				map-options
				emit-value
				label-color="white"
			></q-select>
		</div>
		<div class="col-grow">
			<q-select
				dark
				square
				outlined
				label="Value"
				v-model="propertyValueOption"
				style="width: 16em"
				dense
				color="white"
				label-color="white"
				emit-value
				map-options
				:options="propertyValueOptionList"
				:disable="propertyNameOption === null"
			></q-select>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ModelPropertyValueGroup } from 'src/backend';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';

import * as Backend from 'src/backend';
import * as Spec from 'src/spec';
import type { ModelData } from './ScoreTable.vue';

export type ModelFilter = (data: Spec.Model.Type) => boolean;

const DEFAULT_FILTER = () => true;

const COMMON_UNSELIECTED = Object.freeze({
	label: 'All',
	value: null,
});

type OptionObject = {
	label: string;
	value: null | number | string | boolean;
};

const PROPERTY_GROUP = ref<ModelPropertyValueGroup | null>(null);
const propertyNameOption = ref<string | null>(null);
const propertyValueOption = ref<string | number | null>(null);

type PropertyTester = (data: Spec.Model.Type, target: string | number | boolean) => boolean;

const PropertyTester: Record<string, PropertyTester> = {
	size: (data, target) => {
		if (data.size === undefined) {
			return false;
		}

		return data.size.includes(target as number);
	},
	language: (data, target) => {
		if (data.component === undefined) {
			return false;
		}

		if (data.component.language === undefined) {
			return false;
		}

		return data.component.language.includes(target as string);
	},
	vision: (data, target) => {
		if (data.component === undefined) {
			return false;
		}

		if (data.component.vision === undefined) {
			return false;
		}

		return data.component.vision.includes(target as string);
	},
	author: (data, target) => {
		if (data.author === undefined) {
			return false;
		}

		return data.author.includes(target as string);
	},
	dimension: (data, target) => {
		if (data.dimension === undefined) {
			return false;
		}

		return data.dimension.includes(target as '2D' | '3D');
	},
	opensource: (data, target) => {
		if (data.opensource === undefined) {
			return false;
		}

		return data.opensource === target as boolean;
	},
	imageVideo: (data, target) => {
		if (data.imageVideo === undefined) {
			return false;
		}

		return data.imageVideo.includes(target as string);
	},
	year: (data, target) => {
		if (data.release === undefined) {
			return false;
		}

		return data.release.year === target;
	},
};

const propertyNameOptionList = computed<OptionObject[]>(() => {
	return [
		COMMON_UNSELIECTED,
		{
			label: 'Size',
			value: 'size',
		},
		{
			label: 'Language Model',
			value: 'language',
		},
		{
			label: 'Vision Model',
			value: 'vision',
		},
		{
			label: 'Institute',
			value: 'author',
		},
		{
			label: 'Release Time(Year)',
			value: 'year',
		},
		{
			label: 'Dimension',
			value: 'dimension',
		},
		{
			label: 'Open Source',
			value: 'opensource',
		},
		{
			label: 'Modality',
			value: 'imageVideo',
		},
	];
});

const toOption = (v: string) => ({ label: v, value: v });
const toSizeOption = (v: number) => ({ label: `${v}B`, value: v });
const toBooleanOption = (v: boolean) => ({ label: v ? 'Yes' : 'No', value: v });
const toYearOption = (v: number) => ({ label: `${v}`, value: v });

const PropertyValueOptionsGenerator = {
	language: () => PROPERTY_GROUP.value!.language.map(toOption),
	vision: () => PROPERTY_GROUP.value!.vision.map(toOption),
	author: () => PROPERTY_GROUP.value!.author.map(toOption),
	size: () => PROPERTY_GROUP.value!.size.map(toSizeOption),
	year: () => PROPERTY_GROUP.value!.year.map(toYearOption),
	dimension: () => Spec.Model.PROPERTY.QA.map(toOption),
	opensource: () => Spec.Model.PROPERTY.OPENSOURCE.map(toBooleanOption),
	imageVideo: () => Spec.Model.PROPERTY.IMAGE_VIDEO.map(toOption),
};

type PropertyNameValue = keyof typeof PropertyValueOptionsGenerator;

const propertyValueOptionList = computed<OptionObject[]>(() => {
	const list: OptionObject[] = [COMMON_UNSELIECTED];
	const name = propertyNameOption.value;

	if (name !== null) {
		list.push(...PropertyValueOptionsGenerator[name as PropertyNameValue]());
	}

	return list;
});

watch(propertyNameOption, (newNameOption, oldNameOption) => {
	if (newNameOption !== oldNameOption) {
		propertyValueOption.value = null;
	}
});

watch(propertyValueOption, (valueOption) => {
	if (valueOption === null) {
		return emit('filter-update', DEFAULT_FILTER);
	}

	const Property = {
		name: propertyNameOption.value as keyof ModelData,
		value: valueOption,
	};

	emit('filter-update', (data) => {
		return PropertyTester[Property.name]!(data, Property.value);
	});
},
);

const emit = defineEmits<{
	'filter-update': [ModelFilter];
}>();

onBeforeMount(async () => {
	PROPERTY_GROUP.value = await Backend.API.Model.Property.ValueGroup.query();
});

onMounted(() => {});

defineOptions({ name: 'AppLeaderboardModelFilterPanel' });
</script>
