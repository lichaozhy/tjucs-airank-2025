<template>
	<div class="leaderboard-page">
		<div class="title">
			<div class="main-title">AIRank</div>
			<div class="title-description">
				Comprehensive Benchmarking Multi-modal Large Language Models for Embodied Intelligence
			</div>
		</div>
		<div class="content">
			<q-tabs noCaps v-model="tab" class="text-teal">
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

<style lang="scss" scoped>
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
		background:
			linear-gradient(
				to bottom,
				rgba($primary, 0.4) 0%,
				rgba($primary, 0.45) 25%,
				rgba($primary, 0.5) 50%,
				rgba($primary, 0.55) 75%,
				rgba($primary, 0.6) 100%
			),
			url('/image/29085492_1944-no.jpg') center/cover;
		height: 200px;

		> * {
			background-color: transparent;
		}

		.main-title {
			font-size: 2.5rem;
			font-weight: bold;
			color: #165ea7;
			margin-bottom: 8px;
		}

		.title-description {
			font-size: 1.2rem;
			color: #165ea7;
			text-align: center;
		}
	}

	.content {
		min-width: 800px;
		max-width: 1680px;
	}
}
</style>
