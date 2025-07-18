<template>
	<div
		id="app-leaderboard-capability"
		class="row q-col-gutter-lg"
	>
		<div class="col-12">
			<q-toolbar
				class="col-12 q-px-none"
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

		<div class="col-12"
			v-for="source in selectedSourceList"
			:key="source.id"
		>
			<AppScoreCard
				:source="source"
				:level="level"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { SourceScoreModel } from './ScoreCard.vue';
import { computed, ref, inject } from 'vue';

import AppScoreCard from './ScoreCard.vue';
import * as Spec from 'src/spec';

const { INJECTION_KEY: INJECTION } = Spec;

const level = ref<'core' | 'sub'>('core');
const selectedBenchmark = inject(INJECTION.LEADERBOARD_BENCHMARK_SELECTED);
const selectedSummary = inject(INJECTION.LEADERBOARD_SUMMARY_SELECTED);

const selectedSourceList = computed<SourceScoreModel[]>(() => {
	const list: SourceScoreModel[] = [];

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

const CAPABILITY_LEVEL_RECORD = {
	core: 'Core Capabilities',
	sub: 'Fine-grained Capabilities',
};

const capabilityLevelList = Object.entries(CAPABILITY_LEVEL_RECORD).map(
	([value, label]) => ({ value, label }),
);

defineOptions({ name: 'AppLeaderboardPageCapability' });
</script>
