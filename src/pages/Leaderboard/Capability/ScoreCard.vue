<template>
	<AppScoreCard>
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section class="col-shrink">
					<div class="text-h6 text-weight-600 q-py-sm text-white">
						<span>Embodied Capability Leaderboard</span
						><span class="q-ml-lg text-weight-light text-body1">{{
							caption
						}}</span>
					</div>
				</q-item-section>
				<q-item-section side>
					<AppModelFilter
						@filter-update="(filter) => (currentFilter = filter)"
					></AppModelFilter>
				</q-item-section>
			</q-item>
		</template>
		<AppScoreTable
			:columns="columnList"
			:rows="rowList"
			:groups="groups"
		></AppScoreTable>
	</AppScoreCard>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import type { ModelData, GroupOptions } from './ScoreTable.vue';
import type { ModelFilter } from 'components/ModelFilter.vue';
import { computed, onBeforeMount, reactive, ref } from 'vue';

import AppScoreCard from 'components/ScoreCard.vue';
import AppModelFilter from 'components/ModelFilter.vue';
import AppScoreTable from './ScoreTable.vue';

import * as Backend from 'src/backend';
import { toNumberOrNull } from 'src/components/utils';

type SourceType = 'benchmark' | 'summary';

export interface SourceScoreModel {
	type: SourceType;
	id: string;
}

type LevelName = 'core' | 'sub';

const props = defineProps<{
	source: SourceScoreModel;
	level: LevelName;
}>();

interface SourceModelAbstract {
	name: string;
}

const sourceModelData = ref<SourceModelAbstract>({ name: '<fetching>' });
const modelList = ref<Spec.Model.Type[]>([]);
const groupNameRecord: Record<string, string> = {};
const itemNameRecord: Record<string, string> = {};
const currentFilter = ref<ModelFilter>(() => true);
const capabilityItemList = ref<Spec.Capability.Item[]>([]);

const CAPABILITY_LEVEL_RECORD = {
	0: 'Core Capabilities',
	1: 'Fine-grained Capabilities',
};

const NameRecord = {
	0: groupNameRecord,
	1: itemNameRecord,
};

const Level = reactive<Record<LevelName, Spec.Capability.ScoreMap[]>>({
	0: [],
	1: [],
});

const caption = computed(() => {
	const spanList = [
		sourceModelData.value.name,
		' - ',
		`${CAPABILITY_LEVEL_RECORD[props.level]}`,
	];

	return spanList.join('');
});

const groups = computed<null | GroupOptions[]>(() => {
	if (props.level === 'core') {
		return null;
	}

	const list: GroupOptions[] = [];

	for (const coreData of Level.core) {
		list.push({
			label: NameRecord.core[coreData.id]!,
			colspan: capabilityItemList.value.filter(
				(item) => item.group === coreData.id,
			).length,
		});
	}

	return list.filter((item) => item.colspan > 0);
});

const isReady = computed(() => {
	if (sourceModelData.value === null) {
		return false;
	}

	if (modelList.value.length === 0) {
		return false;
	}

	if (Level.core.length === 0 || Level.sub.length === 0) {
		return false;
	}

	return true;
});

const columnList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	const nameRecord = NameRecord[props.level];

	return [...Level[props.level]].map((data) => nameRecord[data.id]!);
});

const rowList = computed(() => {
	const list: ModelData[] = [];

	if (!isReady.value) {
		return list;
	}

	const { type, id } = props.source;
	const itemList = Level[props.level];

	for (const model of modelList.value) {
		const data: ModelData = {
			id: model.id,
			name: model.name,
			scores: [],
		};

		const scoreItemList = model.score[type][id]![props.level];

		for (const [index, item] of itemList.entries()) {
			const value = scoreItemList[item.index];

			if (value === undefined) {
				throw new Error('Bad value type.');
			}

			data.scores[index] = toNumberOrNull(value);
		}

		list.push(data);
	}

	return list;
});

const SourceModelFetcher: Record<
	SourceType,
	() => Promise<SourceModelAbstract>
> = {
	benchmark: async () => {
		const benchmark = await Backend.API.Benchmark(props.source.id).get();

		return { name: benchmark.name };
	},
	summary: async () => {
		const { id: summaryId } = props.source;
		const summary = await Backend.API.Summary(summaryId).get();

		return { name: summary.name };
	},
};

const ModelFetcher: Record<
	SourceType,
	(sourceId: string) => Promise<Spec.Model.Type[]>
> = {
	benchmark: async (sourceId) => {
		return await Backend.API.Model.queryHasBenchmark(sourceId);
	},
	summary: async (sourceId) => {
		return await Backend.API.Model.queryHasSummary(sourceId);
	},
};

onBeforeMount(async () => {
	sourceModelData.value = await SourceModelFetcher[props.source.type]();

	const groupDataList = await Backend.API.Capability.Group.query();

	for (const groupData of groupDataList) {
		groupNameRecord[groupData.id] = groupData.name;
	}

	for (const itemData of await Backend.API.Capability.Item.query()) {
		itemNameRecord[itemData.id] = itemData.name;
	}
	capabilityItemList.value = await Backend.API.Capability.Item.query();

	const coreLevelItemList = await Backend.API.Capability.Level.Core.query();
	const subLevelItemList = await Backend.API.Capability.Level.Sub.query();

	coreLevelItemList.sort((a, b) => a.order - b.order);

	const coreOrderRecord: Record<string, number> = {};
	const subCoreOrderRecord: Record<string, number> = {};

	for (const [index, coreLevelItem] of coreLevelItemList.entries()) {
		coreOrderRecord[coreLevelItem.id] = index;
	}

	for (const item of capabilityItemList.value) {
		subCoreOrderRecord[item.id] = coreOrderRecord[item.group]!;
	}

	subLevelItemList.sort((a, b) => {
		return (
			subCoreOrderRecord[a.id]! - subCoreOrderRecord[b.id]! || a.order - b.order
		);
	});

	Level.core = coreLevelItemList;
	Level.sub = subLevelItemList;

	const modelDataList = await ModelFetcher[props.source.type](props.source.id);

	modelList.value = modelDataList;
});

defineOptions({ name: 'AppPageLeaderboardCapabilityScoreCard' });
</script>
