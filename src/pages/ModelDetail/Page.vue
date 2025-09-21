<template>
	<q-page
		padding
		class="column content-center"
	>
		<div
			class="full-width"
			style="max-width: 1680px"
			v-if="model"
		>
			<div class="row items-end">
				<q-toolbar-title
					shrink
					class="text-h4"
					>{{ model.name }}</q-toolbar-title
				>
				<q-btn
					v-if="model.website"
					:href="model.website"
					icon="public"
					:label="model.website"
					flat
					dense
					no-caps
					class="text-caption text-grey-8"
					target="_blank"
					size="sm"
				></q-btn>
			</div>

			<div class="q-mt-sm">
				<q-chip
					size="15px"
					color="teal-8"
					v-for="(item, index) in propertyEntityList"
					:key="index"
					dense
					class="glossy q-ml-none q-mr-sm overflow-hidden"
				>
					<q-avatar
						text-color="white"
						:icon="item.icon || item.label"
						:color="item.color || 'indigo-10'"
						style="margin-right: 0"
						class="glossy"
					></q-avatar>
					<div
						v-if="item.label && item.icon"
						class="text-white q-mx-sm text-weight-medium"
					>
						{{ item.label }}
					</div>
					<div
						v-if="item.value"
						class="bg-indigo-10 q-px-sm glossy text-white"
						style="margin-right: -0.4em"
					>
						{{ item.value }}
					</div>
				</q-chip>
			</div>

			<app-benchmark-score
				class="q-mt-md"
				v-if="model !== null"
			></app-benchmark-score>

			<app-illustration
				class="q-mt-md"
				v-if="model !== null"
			></app-illustration>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type * as Type from 'src/data';
import { ref, computed, onBeforeMount, provide } from 'vue';
import { useRoute } from 'vue-router';

import { API } from 'src/backend';
import * as Context from './Context';
import AppBenchmarkScore from './BenchmarkScore.vue';
import AppIllustration from './Illustration.vue';

const route = useRoute();
const model = ref<Type.Model | null>(null);

provide(Context.Model, model);

interface PropertyEntity {
	icon?: string;
	label: string;
	value?: string;
	color?: string;
}

const propertyEntityList = computed<PropertyEntity[]>(() => {
	const list: PropertyEntity[] = [];

	if (model.value !== null) {
		const { component, size, author, release, opensource } = model.value;

		if (component !== undefined) {
			if (component.vision !== undefined) {
				for (const vision of component.vision) {
					list.push({
						label: 'Vision Nodel',
						value: vision,
						icon: 'visibility',
					});
				}
			}

			if (component.language !== undefined) {
				for (const language of component.language) {
					list.push({
						label: 'Language Model',
						value: language,
						icon: 'translate',
					});
				}
			}
		}

		if (size !== undefined) {
			for (const sizeValue of size) {
				list.push({
					label: 'Size',
					value: `${sizeValue}B`,
					icon: 'open_in_full',
				});
			}
		}

		if (author !== undefined) {
			for (const authorName of author) {
				list.push({ label: 'Institute', value: authorName, icon: 'hub' });
			}
		}

		if (release !== undefined) {
			const { year, month, date } = release;
			const sectionList = [year];

			if (month !== undefined && month !== null) {
				sectionList.push(month);

				if (date !== undefined && date !== null) {
					sectionList.push(date);
				}
			}

			list.push({
				label: 'Release Time',
				value: sectionList.join('-'),
				icon: 'publish',
			});
		}

		if (opensource !== undefined) {
			list.push({
				label: 'Open Source',
				icon: opensource ? 'check' : 'close',
				color: opensource ? 'positive' : 'negative',
			});
		}
	}

	return list;
});

onBeforeMount(async () => {
	const modelData = await API.Model(route.params.id as string).get();

	model.value = modelData;
});

defineOptions({ name: 'ModelDetailPage' });
</script>
