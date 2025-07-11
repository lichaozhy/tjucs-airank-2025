<template>
	<q-page
		id="app-leaderboard-capability"
		class="column content-center"
		padding
	>
		<div class="full-width app-max-width-1680">
			<q-toolbar
				class="q-px-none justify-between"
				style="min-height: 0"
			>
				<q-select
					square
					outlined
					bg-color="white"
					dense
					style="width: 16em"
					stack-label
					label="Benchmark"
					map-options
					emit-value
					:options="benchmarkOptionList"
					v-model="selectedBenchmarkId"
					options-dense
				></q-select>

				<q-btn-toggle
					no-caps
					square
					unelevated
					color="white"
					text-color="black"
					toggle-color="indigo-10"
					v-model="capabilityLevel"
					:options="capabilityLevelList"
					stretch
				/>
			</q-toolbar>

			<AppScoreCard class="q-mt-md">
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
				></AppScoreTable>
			</AppScoreCard>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import type { ModelData } from './ScoreTable.vue';
import type { ModelFilter } from 'components/ModelFilter.vue';
import { computed, onBeforeMount, reactive, ref } from 'vue';

import AppScoreCard from 'components/ScoreCard.vue';
import AppModelFilter from 'components/ModelFilter.vue';
import AppScoreTable from './ScoreTable.vue';

import * as Backend from 'src/backend';
import { toNumberOrNull } from 'src/components/utils';

const selectedBenchmarkId = ref<string | null>(null);
const benchmarkList = ref<Spec.Benchmark.Type[]>([]);
const capabilityLevel = ref<'core' | 'sub'>('core');
const currentFilter = ref<ModelFilter>(() => true);
const modelList = ref<Spec.Model.Type[]>([]);
const groupNameRecord: Record<string, string> = {};
const itemNameRecord: Record<string, string> = {};

const NameRecord = {
	core: groupNameRecord,
	sub: itemNameRecord,
};

const CAPABILITY_LEVEL_RECORD = {
	core: 'Core Capabilities',
	sub: 'Sub Capabilities',
};

const caption = computed(() => {
	const spanList = [
		`${selectedBenchmarkName.value}`,
		' - ',
		`${CAPABILITY_LEVEL_RECORD[capabilityLevel.value]}`,
	];

	return spanList.join('');
});

const capabilityLevelList = Object.entries(CAPABILITY_LEVEL_RECORD).map(
	([value, label]) => ({ value, label }),
);

const selectedBenchmarkName = computed(() => {
	if (selectedBenchmarkId.value === null) {
		return 'All benchmarks';
	}

	return benchmarkList.value.find(
		(data) => data.id === selectedBenchmarkId.value,
	)!.name;
});

const benchmarkOptionList = computed(() => {
	return [
		{
			label: 'All',
			value: null,
		},
		...benchmarkList.value.map((data) => ({
			label: data.name,
			value: data.id,
		})),
	];
});

const Level = reactive<Record<'core' | 'sub', Spec.Capability.ScoreMap[]>>({
	core: [],
	sub: [],
});

const isReady = computed(() => {
	if (benchmarkList.value.length === 0) {
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

	const level = capabilityLevel.value;
	const nameRecord = NameRecord[level];

	return [...Level[capabilityLevel.value]].map((data) => nameRecord[data.id]!);
});

const rowList = computed(() => {
	const list: ModelData[] = [];

	if (!isReady.value) {
		return list;
	}

	const benchmark = selectedBenchmarkId.value;
	const level = capabilityLevel.value;
	const itemList = Level[level];

	let filteredModelList = [...modelList.value];

	if (benchmark !== null) {
		filteredModelList = filteredModelList
			.filter(model => Object.hasOwn(model.score, benchmark));
	}

	for (const model of filteredModelList) {
		const data: ModelData = {
			id: model.id,
			name: model.name,
			scores: [],
		};

		const scoreItemList = model.score[benchmark === null ? '*' : benchmark]![level];

		for (const [index, item] of itemList.entries()) {
			data.scores[index] = toNumberOrNull(scoreItemList[item.index]!);
		}

		list.push(data);
	}

	return list;
});

onBeforeMount(async () => {
	for (const groupData of await Backend.API.Capability.Group.query()) {
		groupNameRecord[groupData.id] = groupData.name;
	}

	for (const itemData of await Backend.API.Capability.Item.query()) {
		itemNameRecord[itemData.id] = itemData.name;
	}

	benchmarkList.value = await Backend.API.Benchmark.query();
	modelList.value = await Backend.API.Model.queryHasScore();

	const coreLevelItemList = await Backend.API.Capability.Level.Core.query();
	const subLevelItemList = await Backend.API.Capability.Level.Sub.query();

	coreLevelItemList.sort((a, b) => a.order - b.order);
	subLevelItemList.sort((a, b) => a.order - b.order);

	Level.core = coreLevelItemList;
	Level.sub = subLevelItemList;
});

defineOptions({ name: 'AppLeaderboardCapabilityPage' });
</script>
