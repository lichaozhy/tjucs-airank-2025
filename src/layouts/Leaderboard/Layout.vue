<template>
	<q-page
		id="app-leaderboard-layout"
		class="column content-center"
		padding
		v-if="isLoaded"
	>
		<AppBannerWithLayout :height="480">
			<template #banner>
				<router-view name="banner"></router-view>
			</template>

			<q-tabs
				no-caps
				dense
			>
				<q-route-tab
					v-for="leaderboard in leaderboardList"
					:key="leaderboard.id"
					:name="leaderboard.id"
					:to="{ params: { leaderboardOperand: leaderboard.code } }"
					class="text-h6 text-black text-weight-medieum"
					style="opacity: 0.6"
					active-class="app-solid-tab"
				>
					<div class="row no-wrap">
						<div class="col">Embodied {{ leaderboard.name }} Leaderboard</div>
						<q-btn-dropdown
							flat
							dense
							rounded
							v-model="sourceMenuShowingRecord[leaderboard.id]!"
							transition-show="none"
						>
							<q-list dense>
								<q-item-label header>{{
									$t('l.leaderboard.summary')
								}}</q-item-label>
								<q-item
									tag="label"
									v-for="summary in filteredSummaryList"
									:key="summary.id"
									clickable
								>
									<q-item-section
										side
										top
									>
										<q-checkbox v-model="selectedSummary[summary.id]" />
									</q-item-section>
									<q-item-section>
										<q-item-label>{{ summary.name }}</q-item-label>
									</q-item-section>
								</q-item>
								<q-separator />
								<q-item-label header>{{
									$t('l.leaderboard.benchmark')
								}}</q-item-label>
								<q-item
									tag="label"
									v-for="benchmark in filteredBenchmarkList"
									:key="benchmark.id"
									clickable
								>
									<q-item-section
										side
										top
									>
										<q-checkbox v-model="selectedBenchmark[benchmark.id]" />
									</q-item-section>
									<q-item-section>
										<q-item-label>{{ benchmark.name }}</q-item-label>
									</q-item-section>
								</q-item>
							</q-list>
						</q-btn-dropdown>
					</div>
				</q-route-tab>
			</q-tabs>

			<q-space class="q-mt-lg" />

			<router-view></router-view>
		</AppBannerWithLayout>
	</q-page>
</template>

<script setup lang="ts">
import {
	onBeforeMount,
	reactive,
	ref,
	provide,
	watch,
	computed,
	onBeforeUnmount,
} from 'vue';
import { useRoute } from 'vue-router';

import AppBannerWithLayout from 'layouts/BannerWith.vue';
import * as Spec from 'src/spec';
import * as Backend from 'src/backend';
import { useState } from './state';

import * as Operand from './Operand';

const { fromURL } = useState();
const sourceMenuShowingRecord = ref<Record<string, boolean>>({});

interface BenchmarkAbstract {
	id: string;
	name: string;
}

interface SummaryAbstract {
	id: string;
	name: string;
}

interface LeaderboardAbstract {
	id: string;
	name: string;
	code: string;
}

const route = useRoute();
const leaderboard = ref<LeaderboardAbstract | null>(null);
const leaderboardList = ref<LeaderboardAbstract[]>([]);
const benchmarkList = ref<BenchmarkAbstract[]>([]);
const summaryList = ref<SummaryAbstract[]>([]);
const selectedBenchmark = reactive<{ [key: string]: boolean }>({});
const selectedSummary = reactive<{ [key: string]: boolean }>({});
const exclude = ref<Record<string, boolean>>({});
const operand = ref<Operand.LeaderboardOperand>({ id: null, code: null });

provide(Spec.INJECTION_KEY.LEADERBOARD_SUMMARY_SELECTED, selectedSummary);
provide(Spec.INJECTION_KEY.LEADERBOARD_BENCHMARK_SELECTED, selectedBenchmark);
provide(Spec.INJECTION_KEY.SET_EXCLUDE, setExclude);
provide(Operand.symbol, operand);

function setExclude(record: Record<string, boolean>) {
	exclude.value = record;
}

const filteredBenchmarkList = computed(() => {
	return benchmarkList.value.filter((data) => !exclude.value[data.id]);
});

const filteredSummaryList = computed(() => {
	return summaryList.value.filter((data) => !exclude.value[data.id]);
});

watch(
	() => [{ ...selectedBenchmark }, { ...selectedSummary }],
	async (
		[newSelectedBenchmark, newSelectedSummary],
		[oldSelectedBenchmark, oldSelectedSummary],
	) => {
		if (
			!Object.values({
				...newSelectedBenchmark,
				...newSelectedSummary,
			}).includes(true)
		) {
			Object.assign(selectedBenchmark, oldSelectedBenchmark);
			Object.assign(selectedSummary, oldSelectedSummary);
		}

		const query: Record<'benchmark' | 'summary', string[]> = {
			benchmark: [],
			summary: [],
		};

		for (const id in newSelectedBenchmark) {
			if (newSelectedBenchmark[id]) {
				query.benchmark.push(id);

				if (oldSelectedBenchmark![id]) {
					selectedBenchmark[id] = false;
				}
			}
		}

		for (const id in newSelectedSummary) {
			if (newSelectedSummary[id]) {
				query.summary.push(id);

				if (oldSelectedSummary![id]) {
					selectedSummary[id] = false;
				}
			}
		}

		// await router.push({ query });
	},
);

const isLoaded = ref<boolean>(false);

async function fetchLeaderboardByOperand() {
	const operand = route.params.leaderboardOperand as string;

	try {
		const id = operand;

		return await Backend.API.Leaderboard(id).get();
	} catch {
		const code = operand;
		const [leaderboard] = await Backend.API.Leaderboard.query({ code });

		if (leaderboard === undefined) {
			throw new Error(`Leaderboard with code ${code} not found`);
		}

		return leaderboard;
	}
}

onBeforeMount(async () => {
	const leaderboardListData = await Backend.API.Leaderboard.query();
	const leaderboardData = await fetchLeaderboardByOperand();
	const LeaderboardAPI = Backend.API.Leaderboard(leaderboardData.id);
	const benchmarkDataList = await LeaderboardAPI.Benchmark.query();
	const summaryDataList = await LeaderboardAPI.Summary.query();

	leaderboard.value = leaderboardData;
	leaderboardList.value = leaderboardListData;
	benchmarkList.value = benchmarkDataList.map(({ id, name }) => ({ id, name }));
	summaryList.value = summaryDataList.map(({ id, name }) => ({ id, name }));

	for (const { id } of leaderboardListData) {
		sourceMenuShowingRecord.value[id] = id === leaderboardData.id && !fromURL.value;
	}

	for (const benchmark of benchmarkDataList) {
		selectedBenchmark[benchmark.id] = false;
	}

	for (const summary of summaryDataList) {
		selectedSummary[summary.id] = false;
	}

	for (const summary of summaryDataList) {
		selectedSummary[summary.id] = true;
		break;
	}

	isLoaded.value = true;
	operand.value.id = leaderboardData.id;
	operand.value.code = leaderboardData.code;
});

onBeforeUnmount(() => (fromURL.value = false));

defineOptions({ name: 'AppLeaderboardLayout' });
</script>

<style lang="scss">
.app-solid-tab {
	opacity: 1 !important;
}
</style>
