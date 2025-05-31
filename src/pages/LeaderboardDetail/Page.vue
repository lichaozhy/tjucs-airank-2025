<template>
	<q-page padding>
		<div v-if="leaderboard">
			<h1 class="text-h4">{{ leaderboard.name }}</h1>
			<q-list bordered separator>
				<q-item
					v-for="benchmark in benchmarks"
					:key="benchmark.id"
					clickable
					:to="{ name: 'app.benchmark.rank', params: { id: benchmark.id } }"
				>
					<q-item-section>
						<q-item-label>{{ benchmark.name }}</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</div>
		<div v-else>Loading leaderboard details...</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import leaderboardData from '../../../public/data/leaderboard.json';
import benchmarkData from '../../../public/data/benchmark.json';

interface Leaderboard {
	id: string;
	name: string;
}

interface Benchmark {
	id: string;
	leaderboard: string;
	name: string;
}

export default defineComponent({
	name: 'LeaderboardDetailPage',
	setup() {
		const route = useRoute();
		const leaderboardId = route.params.id as string;

		const leaderboard = ref<Leaderboard | null>(null);
		const benchmarks = ref<Benchmark[]>([]);

		onMounted(() => {
			// Find leaderboard by ID
			leaderboard.value = leaderboardData.find((lb) => lb.id === leaderboardId) || null;

			// Find benchmarks for this leaderboard
			benchmarks.value = benchmarkData.filter((bm) => bm.leaderboard === leaderboardId);
		});

		return {
			leaderboard,
			benchmarks,
		};
	},
});
</script>
