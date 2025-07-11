<template>
	<q-page
		id="app-leaderboard-layout"
		class="column content-center"
		padding
	>
		<div
			id="app-leaderboard-banner"
			class="app-page-banner column justify-center items-center absolute-full text-white"
		>
			<div class="text-h2 text-weight-light">
				{{ $t('p.leaderboard.banner.title') }}
			</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.leaderboard.banner.description') }}
			</div>
		</div>

		<div class="full-width app-max-width-1680">
			<q-tabs
				no-caps
				dense
				class="q-my-lg"
			>
				<q-route-tab
					v-for="item in leaderboardList"
					:key="item.id"
					:name="item.id"
					:to="{
						name: 'app.leaderboard.detail',
						params: { leaderboardId: item.id },
					}"
					class="text-h6 text-black text-weight-medieum"
					style="opacity: 0.6"
					active-class="app-solid-tab"
				>
					<div class="row">
						<div class="">{{ item.name }}</div>
						<q-btn-dropdown
							:class="{ invisible: $route.params.leaderboardId !== item.id }"
							flat
							dense
							rounded
						>
							<q-list dense>
								<q-item-label header>Summary</q-item-label>
								<q-item
									tag="label"
									v-for="summary in summaryList"
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
								<q-item-label header>Benchmark</q-item-label>
								<q-item
									tag="label"
									v-for="benchmark in benchmarkList"
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

			<router-view></router-view>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, provide, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import * as Backend from 'src/backend';
import * as Spec from 'src/spec';

const route = useRoute();
const router = useRouter();
const leaderboard = ref<Spec.Leaderboard.Type | null>(null);
const leaderboardList = ref<Spec.Leaderboard.Type[]>([]);
const benchmarkList = ref<Spec.Benchmark.Type[]>([]);
const selectedBenchmark = reactive<{ [key: string]: boolean }>({});
const selectedSummary = reactive<{ [key: string]: boolean }>({});

provide(Spec.INJECTION_KEY.LEADERBOARD_SUMMARY_SELECTED, selectedSummary);
provide(Spec.INJECTION_KEY.LEADERBOARD_BENCHMARK_SELECTED, selectedBenchmark);

const summaryList = computed(() => {
	if (leaderboard.value === null) {
		return [];
	}

	return leaderboard.value.summaries;
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

		for (const id in newSelectedBenchmark) {
			if (newSelectedBenchmark[id] && oldSelectedBenchmark![id]) {
				selectedBenchmark[id] = false;
			}
		}

		for (const id in newSelectedSummary) {
			if (newSelectedSummary[id] && oldSelectedSummary![id]) {
				selectedSummary[id] = false;
			}
		}
	},
);

onBeforeMount(async () => {
	const leaderboardListData = await Backend.API.Leaderboard.query();

	if (!Object.hasOwn(route.params, 'leaderboardId')) {
		return await router.replace({
			name: 'app.leaderboard.detail',
			params: { leaderboardId: leaderboardListData[0]?.id },
		});
	}

	const { leaderboardId } = route.params;
	const LeaderboardAPI = Backend.API.Leaderboard(leaderboardId as string);
	const leaderboardData = await LeaderboardAPI.get();
	const benchmarkListData = await LeaderboardAPI.Benchmark.query();

	leaderboard.value = leaderboardData;
	leaderboardList.value = leaderboardListData;
	benchmarkList.value = benchmarkListData;

	for (const benchmark of benchmarkListData) {
		selectedBenchmark[benchmark.id] = false;
	}

	for (const summary of leaderboardData.summaries) {
		selectedSummary[summary.id] = true;
	}
});

defineOptions({ name: 'AppLeaderboardLayout' });
</script>

<style lang="scss">
.app-solid-tab {
	opacity: 1 !important;
}
</style>
