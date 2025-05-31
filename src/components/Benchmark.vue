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
			<q-item v-for="(score, index) in scores" :key="score.model.id" clickable v-ripple>
				<q-item-section avatar> {{ index + 1 }} </q-item-section>
				<q-item-section>
					<q-item-label>
						<router-link :to="{ name: 'app.model.detail', params: { id: score.model.id } }">
							{{ score.model.name }}
						</router-link>
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
import { data } from 'src/data';
import * as Spec from 'src/spec';
const { configuration, leaderboard, model } = data;

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

const benchmark = computed(() =>
	data.benchmark.find((item) => item.leaderboard === leaderboardId && item.id === benchmarkId),
);

const propsIndex = ref<number>(
	benchmark.value?.properties ? Object.keys(benchmark.value?.properties).length - 1 : 0,
);

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
	return data.score
		.filter((score) => score.benchmark === benchmarkId)
		.map((score) => {
			const modelDetails = model.find((m) => m.id === score.model) || {
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
