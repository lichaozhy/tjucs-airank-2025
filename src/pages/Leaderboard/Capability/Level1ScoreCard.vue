<template>
	<AppCapabilityScoreCard
		:columns="columnList"
		:rows="rowList"
		:groups="groupList"
	>
		<template #subtitle>
			<span class="text-capitalize"
				>{{ props.source.type }}({{ abstract.name }}) - Fine-grained
				Capability</span
			>
		</template>
	</AppCapabilityScoreCard>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type * as Type from './type';
import type { GroupOptions, ModelData } from './ScoreTable.vue';
import AppCapabilityScoreCard from './CapabilityScoreCard.vue';
import { onBeforeMount, ref, computed } from 'vue';

import * as Backend from 'src/backend';
import { useSource } from './source';

const props = defineProps<{
	source: Type.SourceScoreModel;
}>();

const propertyRecord = ref<Record<string, Type.PropertyAbstract>>({});
const groupList = ref<GroupOptions[]>([]);
const order = ref<string[]>([]);
const modelList = ref<(Data.Model & { id: string })[]>([]);

const Source = useSource(props.source);
const { abstract } = Source;

const columnList = computed<string[]>(() => {
	return order.value
		.map(capabilityId => propertyRecord.value[capabilityId]!.name);
});

const rowList = computed<ModelData[]>(() => {
	const { source } = props;
	const list: ModelData[] = [];

	for (const { id, name, score } of modelList.value) {
		const scoreList = score[source.type][source.id]![1];

		if (scoreList === undefined) {
			console.log(`No model(${id}) ${source.type}(${source.id}) score[1].`);
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
	const _order: string[] = [];

	for (const capabilityId of configuration.order) {
		const CapabilityAPI = Backend.API.Capability(capabilityId);
		const configuration = await CapabilityAPI.Configuration.get();

		if (configuration === null) {
			continue;
		}

		_order.push(...configuration.order);

		const { name } = await CapabilityAPI.get();
		const groupItem = { label: name, colspan: 0 };

		for (const { id, index, name } of await CapabilityAPI.query()) {
			groupItem.colspan++;
			_propertyRecorder[id] = { name, index };
		}

		groupList.value.push(groupItem);
	}

	propertyRecord.value = _propertyRecorder;
	order.value = _order;
	modelList.value = await Source.fetchModelList();
});

defineOptions({ name: 'AppPageLeaderboardCapabilityLevel1ScoreCard' });
</script>
