<template>
	<div>
		<h2>Comprehensive Benchmarking Multi-modal Large Language Models for Embodied Intelligence</h2>
		<q-tabs v-model="tab" class="text-teal">
			<q-tab v-for="item in leaderboard" :key="item.id" :name="item.id" :label="item.name" />
		</q-tabs>
		<div class="row">
			<div class="col-6" v-for="benchmark in benchmarkList" :key="benchmark.id">
				<AppBenchmark :leaderboardId="tab" :benchmarkId="benchmark.id" />
			</div>
		</div>
		<h2>Tianjin University Deep Reinforcement Learning Laboratory</h2>
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLeaderboardPage' });
import type * as Spec from 'src/spec';
import { onMounted, ref } from 'vue';
import { API } from 'src/backend';
import AppBenchmark from 'src/components/Benchmark.vue';

const leaderboard = ref<Array<Spec.Leaderboard.Type>>([]);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
const tab = ref<string>(leaderboard.value[0]?.id ?? '');

onMounted(async () => {
	leaderboard.value = await API.Leaderboard.query();
	tab.value = leaderboard.value[0]?.id ?? '';
	benchmarkList.value = await API.Leaderboard(tab.value).Benchmark.query();
});
</script>
