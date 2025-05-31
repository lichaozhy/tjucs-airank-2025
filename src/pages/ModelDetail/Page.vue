<template>
	<q-page padding>
		<div v-if="model">
			<h1 class="text-h4">{{ model.name }}</h1>

			<div v-if="model.component" class="q-mt-md">
				<h2 class="text-h6">Components</h2>
				<q-list bordered>
					<q-item v-if="model.component.vision">
						<q-item-section>
							<q-item-label>Vision Component</q-item-label>
							<q-item-label caption>{{ model.component.vision }}</q-item-label>
						</q-item-section>
					</q-item>
					<q-item v-if="model.component.language">
						<q-item-section>
							<q-item-label>Language Component</q-item-label>
							<q-item-label caption>{{ model.component.language }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</div>

			<div class="q-mt-lg">
				<h2 class="text-h6">Benchmark Scores</h2>
				<q-list bordered separator>
					<q-item
						v-for="score in modelScores"
						:key="score.benchmark"
						clickable
						:to="{ name: 'app.benchmark.rank', params: { id: score.benchmark } }"
					>
						<q-item-section>
							<q-item-label>{{ getBenchmarkName(score.benchmark) }}</q-item-label>
							<q-item-label caption>Total Score: {{ score.total }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
		</div>
		<div v-else>Loading model details...</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import modelData from '../../../public/data/model.json';
import benchmarkData from '../../../public/data/benchmark.json';
import scoreData from '../../../public/data/score.json';

interface Model {
	id: string;
	name: string;
	component: {
		vision: string | null;
		language: string | null;
	};
}

interface Score {
	benchmark: string;
	model: string;
	total: number;
	items: Array<number | null>;
}

export default defineComponent({
	name: 'ModelDetailPage',
	setup() {
		const route = useRoute();
		const modelId = route.params.id as string;

		const model = ref<Model | null>(null);
		const modelScores = ref<Score[]>([]);

		const getBenchmarkName = (id: string) => {
			const benchmark = benchmarkData.find((bm) => bm.id === id);
			return benchmark ? benchmark.name : `Benchmark ${id}`;
		};

		onMounted(() => {
			// Find model by ID
			model.value = modelData.find((m) => m.id === modelId) || null;

			// Get scores for this model
			modelScores.value = scoreData
				.filter((score) => score.model === modelId)
				.map((score) => {
					return {
						...score,
						total: score.items.at(-1) || 0,
					};
				});
		});

		return {
			model,
			modelScores,
			getBenchmarkName,
		};
	},
});
</script>
