<template>
	<div
		class="row q-col-gutter-lg"
		v-if="isReady"
	>
		<div
			class="col-12"
			v-for="summary in filterdSummaryList"
			:key="summary.id"
		>
			<AppLeaderboardSummary
				:leaderboard-id="leaderboardId"
				:summary-id="summary.id"
			></AppLeaderboardSummary>
		</div>

		<div
			class="col-12"
			v-for="benchmark in filteredBenchmarkList"
			:key="benchmark.id"
		>
			<AppLeaderboardBenchmark
				:leaderboardId="leaderboardId"
				:benchmark="benchmark"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, inject } from 'vue';
import { useRoute } from 'vue-router';

import AppLeaderboardBenchmark from './Benchmark.vue';
import AppLeaderboardSummary from './Summary.vue';
import * as Spec from 'src/spec';
import * as Backend from 'src/backend';

const { params } = useRoute();
const leaderboardId = String(params.leaderboardId);
const LeaderboardAPI = Backend.API.Leaderboard(leaderboardId);

const leaderboard = ref<Spec.Leaderboard.Type | null>(null);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);

const selectedBenchmark = inject(Spec.INJECTION_KEY.LEADERBOARD_BENCHMARK_SELECTED);
const selectedSummary = inject(Spec.INJECTION_KEY.LEADERBOARD_SUMMARY_SELECTED);

if (selectedBenchmark === undefined || selectedSummary === undefined) {
	throw new Error('AppLeaderboardDetailPage MUST be in AppLeaderboardLayoutPage');
}

const isReady = computed(() => {
	return benchmarkList.value.length > 0 && leaderboard.value !== null;
});

const filterdSummaryList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	return leaderboard.value!.summaries
		.filter(summary => selectedSummary[summary.id]);
});

const filteredBenchmarkList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	return benchmarkList.value
		.filter(benchmark => selectedBenchmark[benchmark.id]);
});

onBeforeMount(async () => {
	leaderboard.value = await LeaderboardAPI.get();
	benchmarkList.value = await LeaderboardAPI.Benchmark.query();
});

defineOptions({ name: 'AppLeaderboardDetailPage' });
</script>
