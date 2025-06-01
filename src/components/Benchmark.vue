<template>
	<q-card square>
		<q-item class="card-header">
			<q-item-section>
				<router-link
					:to="{
						name: 'app.leaderboard.rank',
						params: { id: leaderboardId, benchmarkId: benchmark.id },
					}"
					custom
					v-slot="{ navigate }"
				>
					<div @click="navigate" class="text-h6" style="cursor: pointer; color: white">
						{{ benchmark?.name }} Benchmark
					</div>
				</router-link>
			</q-item-section>
			<q-item-section style="flex: 0 0 auto">
				<q-btn-dropdown no-caps color="primary" :label="currentPropName" no-caret>
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
			</q-item-section>
		</q-item>

		<q-list bordered separator>
			<q-item
				v-for="(score, index) in scores.slice(0, 10)"
				:key="score.model.id"
				clickable
				v-ripple
				:to="{ name: 'app.model.detail', params: { id: score.model.id } }"
			>
				<q-item-section avatar>
					<q-avatar square text-color="white">
						<q-icon
							:name="rankingIconMap[index + 1] ?? rankingIconMap.default"
							size="md"
							:style="{ color: rankingColorRgbaMap[index + 1] ?? rankingColorRgbaMap.default }"
						>
						</q-icon>
						<div class="rank-badge">
							{{ index + 1 > 3 ? index + 1 : '' }}
						</div>
					</q-avatar>
				</q-item-section>
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
	</q-card>
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

<style lang="scss" scoped>
.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-image: $gradient-primary;
}

.rank-badge {
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 3%;
	height: 100%;
	width: 100%;

	color: white;
	font-size: 0.7em;
	font-weight: bold;
}
</style>
