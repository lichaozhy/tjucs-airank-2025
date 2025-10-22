<template>
	<AppCapabilityScoreCard
		:columns="columnList"
		:rows="rowList"
		:radar-options="radarOptions"
	>
		<template #subtitle>
			<span class="text-capitalize"
				>{{ props.source.type }}({{ abstract.name }}) - Core Capability</span
			>
		</template>

		<app-markdown-html
			class="q-mt-md"
			:src="`capability/comment/${source.type}/${source.id}`"
		></app-markdown-html>
	</AppCapabilityScoreCard>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type * as Type from './type';
import type { ModelData, Column } from 'components/ScoreTable.vue';
import type { RadarProps } from './CapabilityScoreCard.vue';
import { computed, onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';

import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import AppCapabilityScoreCard from './CapabilityScoreCard.vue';
import { useSource } from './source';

const props = defineProps<{
	source: Type.SourceScoreModel;
}>();

const isDebugging = new URL(location.href).searchParams.has('debug');
const Source = useSource(props.source);
const { abstract } = Source;
const propertyRecord = ref<Record<string, Type.PropertyAbstract>>({});
const order = ref<string[]>([]);
const modelList = ref<(Data.Model & { id: string })[]>([]);
const validColumns = ref<Record<string, true>>({});

const columnList = computed<Column[]>(() => {
	return order.value.map((capabilityId) => ({
		name: propertyRecord.value[capabilityId]!.name,
		sorting: 'desc',
	}));
});

const rowList = computed<ModelData[]>(() => {
	const { source } = props;
	const list: ModelData[] = [];

	for (const {
		id,
		name,
		score,
		category,
		release,
		author,
		_author,
	} of modelList.value) {
		const scoreList = score[source.type][source.id]![0];

		if (scoreList === undefined) {
			if (isDebugging) {
				console.log(`No model(${id}) ${source.type}(${source.id}) score[0].`);
			}

			continue;
		}

		const modelData: ModelData = {
			id,
			name,
			category,
			caption: `${release?.year} | ${(_author ?? author ?? []).join(', ')}`,
			scores: [],
		};

		for (const [index, capabilityId] of order.value.entries()) {
			const property = propertyRecord.value[capabilityId]!;
			const value = scoreList[property.index];

			modelData.scores[index] = value === undefined ? null : value;
		}

		list.push(modelData);
	}

	return list;
});

const radarOptions = computed<RadarProps>(() => {
	const record: Record<string, true> = {};
	const _validColumns = validColumns.value;
	const _propertyRecorder = propertyRecord.value;

	for (const [index, capabilityId] of order.value.entries()) {
		if (_validColumns[capabilityId] && _propertyRecorder[capabilityId]?.radar) {
			record[index] = true;
		}
	}

	return { columns: record };
});

onBeforeMount(async () => {
	await Source.fetchAbstract();

	const configuration = await Backend.API.Capability.Configuration.get();
	const _propertyRecorder: Record<string, Type.PropertyAbstract> = {};

	for (const { id, ...rest } of await Backend.API.Capability.query()) {
		_propertyRecorder[id] = { ...rest };
	}

	const _modelList = await Source.fetchModelList();
	const _validColumns = await Source.fetchCapability(0);

	propertyRecord.value = _propertyRecorder;
	order.value = [...configuration.order].filter((id) => _validColumns[id]);
	modelList.value = _modelList;
	validColumns.value = _validColumns as Record<string, true>;
});

defineOptions({ name: 'AppPageLeaderboardCapabilityLevel0ScoreCard' });
</script>
