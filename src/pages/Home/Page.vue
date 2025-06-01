<template>
	<div class="leaderboard-page">
		<div class="title">
			<h4>AIRank</h4>
			<h6>
				Comprehensive Benchmarking Multi-modal Large Language Models for Embodied Intelligence
			</h6>
		</div>
		<div class="content">
			<q-tabs v-model="tab" class="text-teal">
				<q-tab v-for="item in leaderboardList" :key="item.id" :name="item.id" :label="item.name" />
			</q-tabs>
			<div class="row" v-if="benchmarkShowList.length !== 0">
				<div
					class="col-6 col-grow q-pa-lg"
					v-for="benchmark in benchmarkShowList"
					:key="benchmark.id"
				>
					<AppBenchmark
						:leaderboardId="tab"
						:benchmark="benchmark"
						:scoreList="scoreList"
						:modelList="modelList"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLeaderboardPage' });
import type * as Spec from 'src/spec';
import { computed, onBeforeMount, ref } from 'vue';
import { API } from 'src/backend';
import AppBenchmark from 'src/components/Benchmark.vue';

const leaderboardList = ref<Array<Spec.Leaderboard.Type>>([]);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
const scoreList = ref<Array<Spec.Score.Type>>([]);
const modelList = ref<Array<Spec.Model.Type>>([]);
const tab = ref<string>(leaderboardList.value[0]?.id ?? '');

onBeforeMount(async () => {
	leaderboardList.value = await API.Leaderboard.query();
	benchmarkList.value = await API.Benchmark.query();
	scoreList.value = await API.Score.query();
	modelList.value = await API.Model.query();

	tab.value = leaderboardList.value[0]?.id ?? '';
});

const benchmarkShowList = computed(() => {
	return benchmarkList.value.filter((benchmark) => {
		return benchmark.leaderboard === tab.value;
	});
});
</script>

<style scoped>
.leaderboard-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.title {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.content {
		min-width: 800px;
		max-width: 1680px;
	}
}
</style>
