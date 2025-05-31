<template>
	<div>
		<h4>
			{{ benchmark?.name }}
		</h4>
		<div>
			<q-btn-dropdown color="primary" :label="currentPropName" no-caret>
				<q-list>
					<q-item
						clickable
						v-close-popup
						:key="key"
						v-for="(value, key) in propsOptions"
						@click="changeProps(key)"
					>
						<q-item-section>
							<q-item-label>{{ value.prop.key }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-btn-dropdown>
		</div>
		<q-list bordered separator>
			<q-item
				v-for="(score, index) in scores"
				:key="score.model.id"
				clickable
				v-ripple
				:to="{ name: 'app.model.detail', params: { id: score.model.id } }"
			>
				<q-item-section avatar> {{ index + 1 }} </q-item-section>
				<q-item-section>
					<q-item-label>
						{{ score.model.name }}
					</q-item-label>
					<q-item-label caption>Model ID: {{ score.model.id }}</q-item-label>
				</q-item-section>
				<q-item-section side>
					<!-- <q-btn flat icon="edit" /> -->
					<q-item-label>
						<div>
							{{ score.items[propsOptions[propsIndex]?.prop.value!] }}
						</div>
					</q-item-label>
					<q-item-label caption>{{ currentPropName }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppBenchmark' });
import { defineProps, computed, onMounted, ref } from 'vue';
import * as Spec from 'src/spec';
import { API } from 'src/backend';

interface ScoreRow {
	benchmark: Spec.Benchmark.Type;
	model: Spec.Model.Type;
	// [key: `prop_${number}`]: number;
	items: Spec.Score.Type['items'];
}

const { leaderboardId, benchmarkId } = defineProps<{
	leaderboardId: string;
	benchmarkId: string;
}>();

const benchmark = ref<Spec.Benchmark.Type | null>(null);
const scoreList = ref<Array<Spec.Score.Type>>([]);
const modelList = ref<Array<Spec.Model.Type>>([]);

onMounted(async () => {
	benchmark.value =
		(await API.Leaderboard(leaderboardId).Benchmark.query()).find((b) => b.id === benchmarkId) ??
		null;
	scoreList.value = await API.Benchmark(benchmarkId).Score.query();
	modelList.value = await API.Model.query();
	propsIndex.value = benchmark.value?.properties
		? Object.keys(benchmark.value.properties).length - 1
		: 0;
});

const propsIndex = ref<number>(0);

const propsOptions = computed(() => {
	return Object.entries(benchmark.value?.properties ?? {}).map(([key, value], index) => ({
		index,
		prop: {
			key,
			value,
		},
	}));
});

const currentPropName = computed(() => {
	return propsOptions.value[propsIndex.value]?.prop.key ?? 'Select Property';
});

const changeProps = (index: number) => {
	console.log('Item clicked:', index);
	propsIndex.value = index;
};

const scores = computed(() => {
	return scoreList.value
		.filter((score) => score.benchmark === benchmarkId)
		.map((score) => {
			const modelDetails = modelList.value.find((m) => m.id === score.model) || {
				id: score.model,
				name: 'Unknown Model',
				component: {},
			};

			const row: ScoreRow = {
				model: modelDetails,
				benchmark: benchmark.value!,
				items: score.items,
			};

			return row;
		});
});
</script>
