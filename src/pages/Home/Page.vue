<template>
	<div class="leaderboard-page">
		<div class="content">
			<div class="title">
				<h4>AIRank</h4>
				<h6>
					Comprehensive Benchmarking Multi-modal Large Language Models for Embodied Intelligence
				</h6>
			</div>
			<q-tabs v-model="tab" class="text-teal">
				<q-tab v-for="item in leaderboard" :key="item.id" :name="item.id" :label="item.name" />
			</q-tabs>
			<div class="row">
				<div class="col-6 q-pa-lg" v-for="benchmark in benchmarkList" :key="benchmark.id">
					<AppBenchmark :leaderboardId="tab" :benchmarkId="benchmark.id" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLeaderboardPage' });
import type * as Spec from 'src/spec';
import { onMounted, ref, watch } from 'vue';
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

watch(tab, async (newTab: string) => {
	if (newTab) {
		benchmarkList.value = await API.Leaderboard(newTab).Benchmark.query();
	}
});
</script>

<style scoped>
.leaderboard-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.content {
		padding: 16px;
		width: 1680px;
		max-width: 1680px;

		.title {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
