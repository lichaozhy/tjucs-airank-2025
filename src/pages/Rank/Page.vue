<template>
	<q-page
		padding
		class="ranking-page"
	>
		<div
			class="content full-width"
			v-if="currentBenchmark"
		>
			<div class="q-my-md q-pa-md title-leaderboard-name">
				{{ leaderboard!.name }} Rankings
			</div>
			<div class="q-my-md q-pa-md title-benchmark-name">
				{{ currentBenchmark.name }} Benchmark
			</div>
			<div class="q-py-md">
				<q-btn-toggle
					no-caps
					square
					v-model="currentBenchmarkIndex"
					toggle-color="secondary"
					:options="
						benchmarkList.map((b, index) => ({
							label: b.name,
							value: index,
						}))
					"
				/>
			</div>
			<div class="q-py-md">
				<q-select
					v-model="selectedModelList"
					:options="filteredModelOptionList"
					use-input
					@filter="filterFn"
					multiple
					dense
					filled
					class="width-100"
					placeholder="Filter Model"
				>
					<template v-slot:append>
						<q-icon
							v-if="selectedModelList.length > 0"
							class="cursor-pointer"
							name="clear"
							@click.stop.prevent="selectedModelList = []"
						/>
					</template>
				</q-select>
			</div>
			<div class="q-py-md"></div>
			<q-table
				square
				flat
				borderd
				class="app-rank-table fixed-layout-table width-full"
				:rows="scores"
				:columns="columns"
				row-key="model.id"
				:loading="loading"
				:pagination="{ rowsPerPage: 0 }"
				:hide-pagination="true"
			>
				<template v-slot:body-cell-model="props">
					<q-td :props="props">
						<q-btn
							:to="{
								name: 'app.model.detail',
								params: { id: props.row.model.id },
							}"
							dense
							no-caps
							square
							flat
							class="col-shrink text-primary"
							size="md"
						>
							<div class="q-px-xs text-weight-light">
								{{ props.row.model.name }}
							</div>
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</div>
		<div
			class="content"
			v-else
		>
			Loading benchmark details...{{ leaderboardId }}
		</div>
	</q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkRankPage' });
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import type * as Spec from 'src/spec';
import { API } from 'src/backend';

interface ScoreRow {
	model: Spec.Model.Type;
	[key: `prop_${number}`]: number;
}

const route = useRoute();
const { params } = route;
const { leaderboardId, benchmarkId } = params;

const leaderboard = ref<Spec.Leaderboard.Type | null>(null);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
const scoreList = ref<Array<Spec.Score.Type>>([]);
const currentBenchmarkIndex = ref<number | null>(null);
const modelList = ref<Spec.Model.Type[]>([]);
const selectedModelList = ref<Array<{ label: string; value: string }>>([]);
const loading = ref(true);

const filteredModelOptionList = ref<Array<{ label: string; value: string }>>(
	[],
);

const currentBenchmark = computed(() => {
	if (currentBenchmarkIndex.value === null) return null;
	return benchmarkList.value[currentBenchmarkIndex.value] || null;
});

const currentScoreList = computed(() => {
	if (currentBenchmark.value === null) return [];

	// Get scores for this benchmark
	return scoreList.value.filter(
		(score) => score.benchmark === currentBenchmark.value!.id,
	);
});

const currentModelList = computed(() => {
	// Filter models based on selected models
	return currentScoreList.value.map((s) => {
		const model = modelList.value.find((m) => m.id === s.model);

		if (model === undefined) {
			throw new Error('Bad dataset.');
		}

		return model;
	});
});

const currentModelOptionList = computed(() => {
	return currentModelList.value.map((model) => ({
		label: model.name,
		value: model.id,
	}));
});

const columnFormatter =
	(unit: string | null) => (val: number | null | undefined, row: unknown) => {
		console.log('columnFormatter', val, row);
		if (val === null || val === undefined) {
			return '-';
		}
		return val.toFixed(2) + (unit ? ` ${unit}` : '');
	};

const columns = computed(() => {
	if (!currentBenchmark.value) return [];

	const cols = [
		{
			name: 'model',
			label: 'Model',
			field: 'model',
			align: 'left' as 'left' | 'right' | 'center',
			format: columnFormatter(null),
			headerStyle: 'width: 260px;',
			sortable: true,
		},
	];

	// Add columns for each property
	if (currentBenchmark.value.properties) {
		Object.entries(currentBenchmark.value.properties).forEach(
			([name, prop]) => {
				console.log(prop.label, name);
				cols.push({
					name: `prop_${prop.index}`,
					label: prop.label,
					// label: name,
					field: `prop_${prop.index}`,
					align: 'right' as 'left' | 'right' | 'center',
					format: columnFormatter(prop.unit),
					headerStyle: 'width: 180px;',
					sortable: true,
				});
			},
		);
	}

	cols.push({
		name: '',
		label: '',
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any);

	return cols;
});

const scores = computed(() => {
	// Map scores to rows with model details
	return currentScoreList.value
		.filter(
			(s) =>
				selectedModelList.value.length === 0 ||
				selectedModelList.value.some((sm) => sm.value === s.model),
		)
		.map((score) => {
			const model = modelList.value.find((m) => m.id === score.model);

			if (model === undefined) {
				throw new Error('Bad dataset.');
			}

			const row: ScoreRow = {
				model,
			};

			// Add properties to row
			if (currentBenchmark.value?.properties) {
				Object.values(currentBenchmark.value.properties).forEach((prop) => {
					row[`prop_${prop.index}`] = score.items[prop.index] || 0;
				});
			}

			return row;
		});
});

const filterFn = (val: string, update: (fn: () => void) => void) => {
	update(() => {
		const needle = val.toLowerCase();
		filteredModelOptionList.value = currentModelOptionList.value.filter(
			(v) => v.label.toLowerCase().indexOf(needle) > -1,
		);
	});
};

watch(currentBenchmarkIndex, () => {
	selectedModelList.value = [];
});

onBeforeMount(async () => {
	leaderboard.value = await API.Leaderboard(leaderboardId as string).get();
	benchmarkList.value = await API.Leaderboard(
		leaderboardId as string,
	).Benchmark.query();
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

<style lang="scss" scoped>
.ranking-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;

	.content {
		padding: 16px;
		min-width: 600px;
		max-width: 1680px;

		.title-leaderboard-name {
			font-size: 1.2rem;
			background-image: linear-gradient(
				90deg,
				rgba($primary, 0.6) 0%,
				rgba($primary, 0.55) 25%,
				rgba($primary, 0.4) 50%,
				rgba($primary, 0.3) 70%,
				rgba($primary, 0.25) 80%,
				rgba(#f0f4f8, 0.6) 100%
			);
		}

		.title-benchmark-name {
			font-size: 2rem;
			/* background-image: linear-gradient(90deg, $secondary, #ffffff); */
		}
	}
}
</style>
