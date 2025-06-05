<template>
	<div
		class="row q-col-gutter-lg"
		v-if="isReady"
	>
		<div
			class="col-12"
			v-for="summary in leaderboard!.summaries"
			:key="summary.id"
		>
			<AppLeaderboardSummary
				:leaderboard-id="leaderboardId"
				:summary-id="summary.id"
			></AppLeaderboardSummary>
		</div>

		<div
			class="col-6 col-grow"
			v-for="benchmark in benchmarkList"
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
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppLeaderboardBenchmark from './Benchmark.vue';
import AppLeaderboardSummary from './Summary.vue';
import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';

const { params } = useRoute();
const leaderboardId = String(params.leaderboardId);
const LeaderboardAPI = Backend.API.Leaderboard(leaderboardId);

const leaderboard = ref<Spec.Leaderboard.Type | null>(null);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);

const isReady = computed(() => {
	return benchmarkList.value.length > 0 && leaderboard.value !== null;
});

onBeforeMount(async () => {
	leaderboard.value = await LeaderboardAPI.get();
	benchmarkList.value = await LeaderboardAPI.Benchmark.query();
});

defineOptions({ name: 'AppLeaderboardPage' });
</script>
