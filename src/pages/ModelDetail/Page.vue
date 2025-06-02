<template>
	<q-page
		padding
		class="flex justify-center"
	>
		<div
			class="model-detail"
			v-if="model"
		>
			<h1 class="text-h4">{{ model.name }}</h1>

			<div
				v-if="model.component"
				class="q-mt-md"
			>
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
				<q-list
					bordered
					separator
				>
					<q-item
						v-for="score in modelScores"
						:key="score.benchmark"
						clickable
						:to="{
							name: 'app.leaderboard.rank',
							params: { id: score.leaderboard, benchmarkId: score.benchmark },
						}"
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

<script setup lang="ts">
defineOptions({ name: 'ModelDetailPage' });
import type * as Spec from 'src/spec';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { API } from 'src/backend';

interface Model {
	id: string
	name: string
	component: {
		vision: string | null
		language: string | null
	}
}

interface Score {
	leaderboard: string
	benchmark: string
	model: string
	total: number
	items: Array<number | null>
}

const model = ref<Model | null>(null);
const modelScores = ref<Score[]>([]);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);

const getBenchmarkName = (id: string) => {
	const benchmark = benchmarkList.value.find((bm) => bm.id === id);
	return benchmark ? benchmark.name : `Benchmark ${id}`;
};

onMounted(async () => {
	const route = useRoute();
	const modelId = route.params.id as string;

	const modelResponse = await API.Model(modelId).get();
	const scoresResponse = await API.Model(modelId).Score.query();
	benchmarkList.value = await API.Benchmark.query();

	model.value = modelResponse as Model;
	modelScores.value = scoresResponse.map((score) => ({
		...score,
		leaderboard: benchmarkList.value.find((bm) => bm.id === score.benchmark)?.leaderboard || '',
		total: score.items.at(-1) || 0,
	}));
});
</script>

<style scoped>
.model-detail {
	padding: 16px;
	min-width: 600px;
	max-width: 1680px;
	width: 100%;
}
</style>
