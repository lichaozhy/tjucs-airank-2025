<template>
	<div>
		<h2>Comprehensive Benchmarking Multi-modal Large Language Models for Embodied Intelligence</h2>
		<q-tabs v-model="tab" class="text-teal">
			<q-tab v-for="item in leaderboard" :key="item.id" :name="item.id" :label="item.name" />
		</q-tabs>
		<AppBenchmark
			v-for="benchmark in benchmarkList"
			:key="benchmark.id"
			:leaderboardId="tab"
			:benchmarkId="benchmark.id"
		/>
		<h2>Tianjin University Deep Reinforcement Learning Laboratory</h2>
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLeaderboardPage' });
import { computed, ref } from 'vue';
import { data } from 'src/data';
import AppBenchmark from 'src/components/Benchmark.vue';
const { configuration, leaderboard } = data;

console.log(data);

const tab = ref<string>(leaderboard[0]?.id ?? '');
const benchmarkList = computed(() =>
	data.benchmark.filter((item) => item.leaderboard === tab.value),
);
</script>
