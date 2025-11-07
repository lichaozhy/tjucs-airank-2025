<template>
	<div
		id="app-leaderboard-capability"
		class="row q-col-gutter-lg"
	>
		<div class="col-12">
			<app-markdown-html
				style="min-height: 4em"
				class="text-grey-9"
				:src="`page/leaderboard/capability/${operand!.id}`"
			></app-markdown-html>
		</div>
		<div class="col-12">
			<q-toolbar
				class="col-12 q-px-none justify-evenly"
				style="min-height: 0"
			>
				<q-btn-toggle
					no-caps
					square
					unelevated
					color="white"
					text-color="black"
					toggle-color="indigo-10"
					v-model="level"
					:options="capabilityLevelList"
					stretch
				/>
			</q-toolbar>
		</div>

		<div
			class="col-12"
			v-for="source in selectedSourceList"
			:key="source.id"
		>
			<component
				:source="source"
				:is="AppCapabilityScoreCardComponent[level]"
			></component>
		</div>
	</div>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type * as Type from './type';
import { computed, ref, inject, onBeforeMount } from 'vue';

import * as Backend from 'src/backend';
import * as Spec from 'src/spec';
import * as LeaderboardLayout from 'layouts/Leaderboard';

import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import AppCapabilityLevel0ScoreCard from './Level0ScoreCard.vue';
import AppCapabilityLevel1ScoreCard from './Level1ScoreCard.vue';

const { INJECTION_KEY: INJECTION } = Spec;

const AppCapabilityScoreCardComponent = {
	0: AppCapabilityLevel0ScoreCard,
	1: AppCapabilityLevel1ScoreCard,
};

const operand = inject(LeaderboardLayout.Operand.symbol);
const levelRecord = ref<Record<Data.CapabilityLevel, string>>({ 0: '', 1: '' });
const level = ref<Data.CapabilityLevel>(0);
const selectedBenchmark = inject(INJECTION.LEADERBOARD_BENCHMARK_SELECTED);
const selectedSummary = inject(INJECTION.LEADERBOARD_SUMMARY_SELECTED);

const selectedSourceList = computed<Type.SourceScoreModel[]>(() => {
	const list: Type.SourceScoreModel[] = [];

	for (const id in selectedSummary) {
		if (selectedSummary[id]) {
			list.push({ type: 'summary', id });
		}
	}

	for (const id in selectedBenchmark) {
		if (selectedBenchmark[id]) {
			list.push({ type: 'benchmark', id });
		}
	}

	return list;
});

const capabilityLevelList = computed(() => {
	return Object.entries(levelRecord.value).map(([key, name]) => ({
		label: `${name} Capabilities`,
		value: Number(key),
	}));
});

onBeforeMount(async () => {
	const configuration = await Backend.API.Capability.Configuration.get();

	levelRecord.value = { ...configuration.level };
});

defineOptions({ name: 'AppLeaderboardPageCapability' });
</script>
