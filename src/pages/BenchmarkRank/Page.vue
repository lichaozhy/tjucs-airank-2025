<template>
	<q-page padding>
		<div v-if="benchmark">
			<h1 class="text-h4">{{ benchmark.name }} Rankings</h1>
			<q-table
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
		<div v-else>Loading benchmark details...</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import benchmarkData from '../../../public/data/benchmark.json';
import modelData from '../../../public/data/model.json';
import scoreData from '../../../public/data/score.json';

console.log(benchmarkData);

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

export default defineComponent({
	name: 'BenchmarkRankPage',
	setup() {
		const route = useRoute();
		const benchmarkId = route.params.id as string;

		const benchmark = ref<Benchmark | null>(null);
		const scores = ref<ScoreRow[]>([]);
		const loading = ref(true);

		const columns = computed(() => {
			if (!benchmark.value) return [];

			const cols = [
				{
					name: 'model',
					label: 'Model',
					field: 'model',
					align: 'left' as 'left' | 'right' | 'center',
					sortable: true,
				},
			];

			// Add columns for each property
			if (benchmark.value.properties) {
				Object.entries(benchmark.value.properties).forEach(([name, index]) => {
					cols.push({
						name: `prop_${index}`,
						label: name,
						field: `prop_${index}`,
						align: 'right' as 'left' | 'right' | 'center',
						sortable: true,
					});
				});
			}

			return cols;
		});

		onMounted(() => {
			// Find benchmark by ID
			benchmark.value = benchmarkData.find((bm) => bm.id === benchmarkId) || null;

			// Get scores for this benchmark
			const benchmarkScores = scoreData.filter((score) => score.benchmark === benchmarkId);

			// Map scores to rows with model details
			scores.value = benchmarkScores.map((score) => {
				const model = modelData.find((m) => m.id === score.model) || {
					id: score.model,
					name: 'Unknown Model',
				};
				const row: ScoreRow = {
					model,
				};

				// Add properties to row
				if (benchmark.value?.properties) {
					Object.values(benchmark.value.properties).forEach((index) => {
						row[`prop_${index}`] = score.items[index] || 0;
					});
				}

				return row;
			});

			// Sort by total score descending
			// scores.value.sort((a, b) => b['prop_total'] - a['prop_total']);
			loading.value = false;
		});

		return {
			benchmark,
			scores,
			columns,
			loading,
		};
	},
});
</script>
