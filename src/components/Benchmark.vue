<template>
	<div>
		<h2>2</h2>
		<div v-for="item in benchmark" :key="item.id">{{ item.name }}</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppBenchmark' });
import { defineProps, computed } from 'vue';
import { data } from 'src/data';
const { configuration, leaderboard, model } = data;

const { leaderboardId } = defineProps<{
	leaderboardId: string;
}>();

const benchmark = computed(() =>
	data.benchmark.filter((item) => item.leaderboard === leaderboardId),
);
</script>
