<template>
	<q-card square>
		<q-item class="card-header justify-between">
			<q-item-section class="col-shrink">
				<q-btn
					:to="{
						name: 'app.rank.leaderboard',
						params: { leaderboardId, benchmarkId: benchmark.id },
					}"
					dense
					no-caps
					square
					flat
					class="col-shrink text-white"
					size="lg"
				>
					<div class="text-weight-light">{{ benchmark.name }} Benchmark</div>
				</q-btn>
			</q-item-section>
			<q-item-section style="flex: 0 0 auto">
				<q-btn-dropdown
					no-caps
					square
					color="primary"
					:label="currentPropName"
					no-caret
					dense
					class="q-pl-md"
				>
					<q-list dense>
						<q-item
							clickable
							v-close-popup
							:key="key"
							v-for="(value, key) in propsOptions"
							@click="changeProps(key)"
						>
							<q-item-section>
								<q-item-label>{{ value.prop.value.label }}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown>
			</q-item-section>
		</q-item>

		<q-list
			bordered
			separator
		>
			<q-item
				v-for="(score, index) in scoreViewDataList.slice(0, 10)"
				:key="index"
				clickable
				v-ripple
				:to="{ name: 'app.model.detail', params: { id: score.model.id } }"
			>
				<q-item-section avatar>
					<q-avatar
						square
						text-color="white"
					>
						<q-icon
							:name="rankingIconMap[index + 1] ?? rankingIconMap.default"
							size="md"
							:style="{ color: rankingColorRgbaMap[index + 1] ?? rankingColorRgbaMap.default }"
						>
						</q-icon>
						<div
							class="rank-number"
							:class="index + 1 > 3 ? 'rank-number-rest' : 'rank-number-best'"
						>
							{{ index + 1 }}
						</div>
					</q-avatar>
				</q-item-section>
				<q-item-section>
					<q-item-label class="text-weight-bold">
						{{ score.model.name }}
					</q-item-label>
					<q-item-label caption>{{ score.caption }}</q-item-label>
				</q-item-section>
				<q-item-section side>
					<!-- <q-btn flat icon="edit" /> -->
					<q-item-label class="text-bold">
						{{ score.items[propsOptions[propsIndex]?.prop.value!.index!]?.toFixed(2) }}
						{{ propsOptions[propsIndex]?.prop.value.unit ?? '' }}
					</q-item-label>
					<q-item-label caption>{{ propsOptions[propsIndex]?.prop.value.label }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';

const { leaderboardId, benchmark } = defineProps<{
	leaderboardId: string
	benchmark: Spec.Benchmark.Type
}>();

const BenchmarkAPI = Backend.API.Benchmark(benchmark.id);
const scoreList = ref<Spec.Score.Type[]>([]);
const modelList = ref<Spec.Model.Type[]>([]);

async function fetchModelFromScore(score: Spec.Score.Type) {
	return Backend.API.Model(score.model).get();
}

onBeforeMount(async () => {
	scoreList.value = await BenchmarkAPI.Score.query();
	modelList.value = await Promise.all(scoreList.value.map(fetchModelFromScore));
});

interface ScoreViewData {
	benchmark: Spec.Benchmark.Type
	model: Spec.Model.Type
	// [key: `prop_${number}`]: number;
	items: Spec.Score.Type['items']
	caption: string
}

const rankingColorRgbaMap: Record<number | string, string> = {
	1: 'rgba(255, 215, 0, 1)', //golden
	2: 'rgba(192, 192, 192, 1)', //silver
	3: 'rgba(205, 127, 50, 1)', //bronze
	default: 'rgba(128, 128, 128, 0.2)', //grey
};

const rankingIconMap: Record<number | string, string> = {
	1: 'fas fa-crown',
	2: 'fas fa-crown',
	3: 'fas fa-crown',
	// 2: 'fas fa-trophy',
	// 3: 'fas fa-medal',
	default: 'fas fa-star',
};

const propsIndex = ref<number>(Object.keys(benchmark.properties).length - 1);

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
	return propsOptions.value[propsIndex.value]?.prop.value.label;
});

const changeProps = (index: number) => {
	propsIndex.value = index;
};

function asNumber(value: null | undefined | number) {
	if (value === null || value === undefined) {
		return 0;
	}

	return value;
}

function toCaption(model: Spec.Model.Type) {
	const captionSectionList: string[] = [];
	const { vision, language } = model.component;

	if (vision !== null) {
		captionSectionList.push(`Vision: ${vision}`);
	}

	if (language !== null) {
		captionSectionList.push(`Language: ${language}`);
	}

	if (captionSectionList.length === 0) {
		captionSectionList.push(`Model ID: ${model.id}`);
	}

	return captionSectionList.join(' / ');
}

const scoreViewDataList = computed<ScoreViewData[]>(() => {
	const itemIndex = propsIndex.value;

	if (scoreList.value.length === 0 || modelList.value.length === 0) {
		return [];
	}

	return scoreList.value
		.map((score) => {
			const modelDetails = modelList.value.find((m) => m.id === score.model);

			if (modelDetails === undefined) {
				throw new Error('Bad dataset.');
			}

			return {
				model: modelDetails,
				benchmark: benchmark,
				items: score.items,
				caption: toCaption(modelDetails),
			};
		})
		.sort((a, b) => asNumber(b.items[itemIndex]) - asNumber(a.items[itemIndex]));
});

defineOptions({ name: 'AppBenchmark' });
</script>

<style lang="scss">

.rank-number {
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	height: 100%;
	width: 100%;

	color: white;
	font-size: 0.7em;
	font-weight: bold;
}

.rank-number-best {
	top: 12%;
}

.rank-number-rest {
	top: 4%;
}
</style>
