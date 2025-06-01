<template>
	<div>
		<router-link
			:to="{
				name: 'app.leaderboard.rank',
				params: { id: leaderboardId, benchmarkId: benchmark.id },
			}"
		>
			<h2 class="text-h6">
				{{ benchmark?.name }}
			</h2>
		</router-link>
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
import { computed, ref } from 'vue';
import type * as Spec from 'src/spec';

interface ScoreRow {
	benchmark: Spec.Benchmark.Type;
	model: Spec.Model.Type;
	// [key: `prop_${number}`]: number;
	items: Spec.Score.Type['items'];
}

const { leaderboardId, benchmark, scoreList, modelList } = defineProps<{
	leaderboardId: string;
	benchmark: Spec.Benchmark.Type;
	scoreList: Array<Spec.Score.Type>;
	modelList: Array<Spec.Model.Type>;
}>();

const propsIndex = ref<number>(0);

const propsOptions = computed(() => {
	return Object.entries(benchmark.properties).map(([key, value], index) => ({
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
	return scoreList
		.filter((score) => score.benchmark === benchmark.id)
		.map((score) => {
			const modelDetails = modelList.find((m) => m.id === score.model) || {
				id: score.model,
				name: 'Unknown Model',
				component: {},
			};

			const row: ScoreRow = {
				model: modelDetails,
				benchmark: benchmark,
				items: score.items,
			};

			return row;
		});
});
</script>
