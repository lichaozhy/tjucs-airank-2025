<template>
	<div
		class="row q-col-gutter-lg"
		v-if="benchmarkList.length !== 0"
	>
		<div
			class="col-6 col-grow"
			v-for="benchmark in benchmarkList"
			:key="benchmark.id"
		>
			<AppBenchmark
				:leaderboardId="leaderboardId"
				:benchmark="benchmark"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';
import AppBenchmark from './Benchmark.vue';

const { params } = useRoute();
const leaderboardId = String(params.leaderboardId);
const LeaderboardAPI = Backend.API.Leaderboard(leaderboardId);

const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);

onBeforeMount(async () => {
	benchmarkList.value = await LeaderboardAPI.Benchmark.query();
});

defineOptions({ name: 'AppLeaderboardPage' });
</script>
