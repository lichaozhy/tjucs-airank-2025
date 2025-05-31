<template>
	<div>
		<q-tabs v-model="tab" class="text-teal">
			<q-tab v-for="item in leaderboard" :key="item.id" :name="item.id" :label="item.name" />
		</q-tabs>
		<AppBenchmark :leaderboardId="tab" />
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLeaderboardPage' });
import { ref } from 'vue';
import { data } from 'src/data';
import AppBenchmark from 'src/components/Benchmark.vue';
const { configuration, leaderboard } = data;

console.log(data);

const tab = ref<string>(leaderboard[0]?.id ?? '');
</script>
