<template>
	<q-page padding>
		<div class="ranking-page">
			<div class="content" v-if="currentBenchmark">
				<h5 class="q-ma-md">{{ leaderboard!.name }} Rankings</h5>
				<h6 class="q-ma-md">{{ currentBenchmark.name }} Rankings</h6>
				<div class="q-pa-md">
					<q-btn-toggle
						no-caps
						v-model="currentBenchmarkIndex"
						toggle-color="primary"
						:options="
							benchmarkList.map((b, index) => ({
								label: b.name,
								value: index,
							}))
						"
					/>
				</div>
				<q-table
					class="my-sticky-column-table fixed-layout-table width-full"
					:rows="scores"
					:columns="columns"
					row-key="model.id"
					:loading="loading"
					:pagination="{ rowsPerPage: 20 }"
				>
					<template v-slot:body-cell-model="props">
						<q-td :props="props">
							<router-link :to="{ name: 'app.model.detail', params: { id: props.row.model.id } }">
								{{ props.row.model.name }}
							</router-link>
							<!-- {{ props.row.model.name }} -->
						</q-td>
					</template>
				</q-table>
			</div>
			<div class="content" v-else>Loading benchmark details...{{ leaderboardId }}</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkRankPage' });
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import type * as Spec from 'src/spec';
import { API } from 'src/backend';

interface Benchmark {
	id: string;
	name: string;
	properties?: Record<string, number>;
}

interface Model {
	id: string;
	name: string;
}

interface ScoreRow {
	model: Model;
	[key: `prop_${number}`]: number;
}

const route = useRoute();
const leaderboardId = route.params.id as string;
const benchmarkId = route.params.benchmarkId as string | undefined;

const leaderboard = ref<Spec.Leaderboard.Type | null>(null);
const benchmarkList = ref<Array<Benchmark>>([]);
const scoreList = ref<Array<Spec.Score.Type>>([]);
const currentBenchmarkIndex = ref<number | null>(null);
const modelList = ref<Spec.Model.Type[]>([]);
const loading = ref(true);

const currentBenchmark = computed(() => {
	if (currentBenchmarkIndex.value === null) return null;
	return benchmarkList.value[currentBenchmarkIndex.value] || null;
});

const columns = computed(() => {
	if (!currentBenchmark.value) return [];

	const cols = [
		{
			name: 'model',
			label: 'Model',
			field: 'model',
			align: 'left' as 'left' | 'right' | 'center',
			headerStyle: 'width: 240px;',
			sortable: true,
		},
	];

	// Add columns for each property
	if (currentBenchmark.value.properties) {
		Object.entries(currentBenchmark.value.properties).forEach(([name, index]) => {
			cols.push({
				name: `prop_${index}`,
				label: name,
				field: `prop_${index}`,
				align: 'right' as 'left' | 'right' | 'center',
				headerStyle: 'width: 180px;',
				sortable: true,
			});
		});
	}

	cols.push({
		name: '',
		label: '',
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any);

	return cols;
});

const scores = computed(() => {
	if (currentBenchmark.value === null) return [];

	// Get scores for this benchmark
	const benchmarkScoreList = scoreList.value.filter(
		(score) => score.benchmark === currentBenchmark.value!.id,
	);

	// Map scores to rows with model details
	return benchmarkScoreList.map((score) => {
		const model = modelList.value.find((m) => m.id === score.model) || {
			id: score.model,
			name: 'Unknown Model',
		};
		const row: ScoreRow = {
			model,
		};

		// Add properties to row
		if (currentBenchmark.value?.properties) {
			Object.values(currentBenchmark.value.properties).forEach((index) => {
				row[`prop_${index}`] = score.items[index] || 0;
			});
		}

		return row;
	});
});

onBeforeMount(async () => {
	leaderboard.value = await API.Leaderboard(leaderboardId).get();
	benchmarkList.value = await API.Leaderboard(leaderboardId).Benchmark.query();
	scoreList.value = await API.Score.query();
	modelList.value = await API.Model.query();

	if (benchmarkId) {
		const benchmark = benchmarkList.value.find((b) => b.id === benchmarkId);
		if (benchmark) {
			currentBenchmarkIndex.value = benchmarkList.value.indexOf(benchmark);
		} else {
			currentBenchmarkIndex.value = 0; // Default to first if not found
		}
	} else {
		currentBenchmarkIndex.value = 0; // Default to first if no benchmarkId
	}

	// Sort by total score descending
	// scores.value.sort((a, b) => b['prop_total'] - a['prop_total']);
	loading.value = false;
});
</script>

<style scoped>
.ranking-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.content {
		padding: 16px;
		min-width: 600px;
		max-width: 1680px;
		width: 100%;

		.title {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		/* .my-sticky-column-table {
			width: 100%;

			thead tr th {
				background-color: #00b4ff;
				color: white;
			}

			thead tr:first-child th:first-child {
				background-color: #00b4ff;
			}

			tr:first-child td:first-child {
				background-color: #00b4ff;
			}

			td:first-child {
				background-color: #00b4ff;
			}

			th:first-child,
			td:first-child {
				position: sticky;
				left: 0;
				z-index: 1;
			}
		} */
	}
}
</style>

<style lang="sass">
.my-sticky-column-table
  min-width: 600px
  max-width: 1680px
  width: 100%

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #e4e4e4

  td:first-child
    background-color: #e4e4e4

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>

<style lang="scss">
.fixed-layout-table {
	table {
		table-layout: fixed;
	}
}
</style>
