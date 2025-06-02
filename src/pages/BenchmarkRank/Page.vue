<template>
	<q-page padding>
		<div class="ranking-page">
			<div
				class="content"
				v-if="benchmark"
			>
				<h1 class="text-h4">{{ benchmark.name }} Rankings</h1>
				<q-table
					class="my-sticky-column-table width-full"
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
			<div
				class="content"
				v-else
			>
				Loading benchmark details...
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkRankPage' });
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type * as Spec from 'src/spec';
import { API } from 'src/backend';

interface ScoreRow {
	model: Spec.Model.Type
	[key: `prop_${number}`]: number
}

const route = useRoute();
const benchmarkId = route.params.id as string;

const benchmark = ref<Spec.Benchmark.Type | null>(null);
const scores = ref<Array<ScoreRow>>([]);
const modelList = ref<Array<Spec.Model.Type>>([]);
const loading = ref(true);

const columns = computed(() => {
	if (!benchmark.value) return [];

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
	if (benchmark.value.properties) {
		Object.entries(benchmark.value.properties).forEach(([, prop]) => {
			cols.push({
				name: `prop_${prop.index}`,
				label: prop.label,
				field: `prop_${prop.index}`,
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

onMounted(async () => {
	// Find benchmark by ID
	benchmark.value = (await API.Benchmark(benchmarkId).get()) || null;
	modelList.value = await API.Model.query();

	// Get scores for this benchmark
	const benchmarkScores = (await API.Benchmark(benchmarkId).Score.query()) || [];

	// Map scores to rows with model details
	scores.value = benchmarkScores.map((score) => {
		const model = modelList.value.find((m) => m.id === score.model);

		if (model === undefined) {
			throw new Error('bad dataset');
		}

		const row: ScoreRow = {
			model,
		};

		// Add properties to row
		if (benchmark.value?.properties) {
			Object.values(benchmark.value.properties).forEach((prop) => {
				row[`prop_${prop.index}`] = score.items[prop.index] || 0;
			});
		}

		return row;
	});

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
