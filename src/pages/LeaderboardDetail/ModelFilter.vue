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
	label: 'Unselected',
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
	qa: (data, target) => {
		if (data.qa === undefined) {
			return false;
		}

		return data.qa.includes(target as '2D' | '3D');
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
	navigation: (data, target) => {
		if (data.navigation === undefined) {
			return false;
		}

		return data.navigation === target as boolean;
	},
	taskPlanning: (data, target) => {
		if (data.taskPlanning === undefined) {
			return false;
		}

		return data.taskPlanning === target as boolean;
	},
	reason: (data, target) => {
		if (data.reason === undefined) {
			return false;
		}

		return data.reason === target as boolean;
	},
	imageVideo: (data, target) => {
		if (data.imageVideo === undefined) {
			return false;
		}

		return data.imageVideo.includes(target as string);
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
			label: 'Language Component',
			value: 'language',
		},
		{
			label: 'Vision Component',
			value: 'vision',
		},
		{
			label: 'QA',
			value: 'qa',
		},
		{
			label: 'Author',
			value: 'author',
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
			label: 'Navigation',
			value: 'navigation',
		},
		{
			label: 'Task Planning',
			value: 'taskPlanning',
		},
		{
			label: 'Reason',
			value: 'reason',
		},
		{
			label: 'Image or Video',
			value: 'imageVideo',
		},
	];
});

const toOption = (v: string) => ({ label: v, value: v });
const toSizeOption = (v: number) => ({ label: `${v}B`, value: v });
const toBooleanOption = (v: boolean) => ({ label: v ? 'Yes' : 'No', value: v });

const PropertyValueOptionsGenerator = {
	language: () => PROPERTY_GROUP.value!.language.map(toOption),
	vision: () => PROPERTY_GROUP.value!.vision.map(toOption),
	author: () => PROPERTY_GROUP.value!.author.map(toOption),
	size: () => PROPERTY_GROUP.value!.size.map(toSizeOption),
	qa: () => Spec.Model.PROPERTY.QA.map(toOption),
	dimension: () => Spec.Model.PROPERTY.QA.map(toOption),
	opensource: () => Spec.Model.PROPERTY.OPENSOURCE.map(toBooleanOption),
	navigation: () => Spec.Model.PROPERTY.NAVIGATION.map(toBooleanOption),
	taskPlanning: () => Spec.Model.PROPERTY.TASK_PLANNING.map(toBooleanOption),
	reason: () => Spec.Model.PROPERTY.REASON.map(toBooleanOption),
	imageVideo: () => Spec.Model.PROPERTY.IMAGE_VIDEO.map(toOption),
};

type PropertyNameValue = keyof typeof PropertyValueOptionsGenerator;

const propertyValueOptionList = computed<OptionObject[]>(() => {
	const list: OptionObject[] = [COMMON_UNSELIECTED];
	const name = propertyNameOption.value;

	if (name !== null) {
		console.log(name);
		list.push(...PropertyValueOptionsGenerator[name as PropertyNameValue]());
	}

	return list;
});

watch(propertyNameOption, (newNameOption, oldNameOption) => {
	console.log(newNameOption, oldNameOption);
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
