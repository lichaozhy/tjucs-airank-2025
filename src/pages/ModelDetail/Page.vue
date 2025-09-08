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

			<div class="text-h6 q-mt-lg">Benchmark Scores</div>
			<q-separator class="q-my-sm"></q-separator>

			<div class="row q-col-gutter-sm">
				<div
					class="col-lg-2 col-md-3 col-sm-4 col-xs-6"
					v-for="({ name, value, label }, index) in benchmarkScoreList"
					:key="index"
				>
					<q-card
						square
						flat
						bordered
					>
						<q-item>
							<q-item-section>
								<q-item-label class="text-weight-bold">{{ name }}</q-item-label>
								<q-item-label
									caption
									lines="1"
									>{{ label }}</q-item-label
								>
							</q-item-section>

							<q-item-section side>
								<div class="text-grey-9 text-weight-medium">
									{{ value?.toFixed(2) }}
								</div>
							</q-item-section>
						</q-item>
					</q-card>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type * as Type from 'src/data';
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { API } from 'src/backend';

interface BenchmarkScoreDescriptor {
	name: string;
	label: string;
	index: number;
}

const route = useRoute();
const model = ref<Type.Model | null>(null);
const descriptors = ref<Record<string, BenchmarkScoreDescriptor>>({});

const benchmarkScoreList = computed(() => {
	const scoreList: {
		name: string;
		label: string;
		value: number | null;
	}[] = [];

	if (model.value !== null) {
		const { score } = model.value;

		if ('benchmark' in score) {
			for (const [benchmarkId, { legacy }] of Object.entries(score.benchmark)) {
				if (legacy === undefined) {
					continue;
				}

				const { label, index, name } = descriptors.value[benchmarkId]!;

				scoreList.push({ name, label, value: legacy[index] ?? null });
			}
		}
	}

	return scoreList;
});

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
	const _descriptors: Record<string, BenchmarkScoreDescriptor> = {};

	for (const benchmark of await API.Benchmark.query()) {
		const { label, index } = benchmark.properties[benchmark.default.property]!;

		_descriptors[benchmark.id] = {
			name: benchmark.name,
			label,
			index,
		};
	}

	descriptors.value = _descriptors;
	model.value = modelData;
});

defineOptions({ name: 'ModelDetailPage' });
</script>
