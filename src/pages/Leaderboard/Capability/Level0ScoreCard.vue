<template>
	<AppCapabilityScoreCard
		:columns="columnList"
		:rows="rowList"
	>
		<template #subtitle>
			<span class="text-capitalize"
				>{{ props.source.type }}({{ abstract.name }}) - Core Capability</span
			>
		</template>
	</AppCapabilityScoreCard>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type * as Type from './type';
import type { ModelData } from './ScoreTable.vue';
import { computed, onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';

import AppCapabilityScoreCard from './CapabilityScoreCard.vue';
import { useSource } from './source';

const props = defineProps<{
	source: Type.SourceScoreModel;
}>();

const Source = useSource(props.source);
const { abstract } = Source;
const propertyRecord = ref<Record<string, Type.PropertyAbstract>>({});
const order = ref<string[]>([]);
const modelList = ref<(Data.Model & { id: string })[]>([]);

const columnList = computed<string[]>(() => {
	return order.value
		.map(capabilityId => propertyRecord.value[capabilityId]!.name);
});

const rowList = computed<ModelData[]>(() => {
	const { source } = props;
	const list: ModelData[] = [];

	for (const { id, name, score } of modelList.value) {
		const scoreList = score[source.type][source.id]![0];

		if (scoreList === undefined) {
			console.log(`No model(${id}) ${source.type}(${source.id}) score[0].`);
			continue;
		}

		const modelData: ModelData = { id, name, scores: [] };

		for (const [index, capabilityId] of order.value.entries()) {
			const property = propertyRecord.value[capabilityId]!;
			const value = scoreList[property.index];

			modelData.scores[index] = value === undefined ? null : value;
		}

		list.push(modelData);
	}

	return list;
});

onBeforeMount(async () => {
	await Source.fetchAbstract();
	const configuration = await Backend.API.Capability.Configuration.get();
	const _propertyRecorder: Record<string, Type.PropertyAbstract> = {};

	for (const { id, name, index } of await Backend.API.Capability.query()) {
		_propertyRecorder[id] = { name, index };
	}

	propertyRecord.value = _propertyRecorder;
	order.value = [...configuration.order];
	modelList.value = await Source.fetchModelList();
});

defineOptions({ name: 'AppPageLeaderboardCapabilityLevel0ScoreCard' });
</script>
