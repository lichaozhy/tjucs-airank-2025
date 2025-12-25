<template>
	<q-page
		id="app-leaderboard-layout"
		class="column content-center"
		padding
	>
		<app-banner-with-layout>
			<template #banner>
				<div class="text-center">
					<div class="text-h3 text-weight-light">Benchmark Statistics</div>
					<q-space class="q-my-lg"></q-space>
					<app-markdown-html
						style="min-height: 6em; max-width: 72em"
						class="text-body text-weight-light text-justify"
						src="page/statistics/banner"
					></app-markdown-html>
				</div>
			</template>

			<q-tabs
				no-caps
				dense
				v-model="currentLeaderboard"
			>
				<q-tab
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
					</div>
				</q-tab>
			</q-tabs>

			<q-space class="q-my-lg" />

			<div class="col-12">
				<q-toolbar
					class="col-12 q-px-none justify-evenly"
					style="min-height: 0"
				>
					<q-btn-toggle
						no-caps
						square
						unelevated
						color="white"
						text-color="black"
						toggle-color="indigo-10"
						v-model="level"
						:options="capabilityLevelList"
						stretch
					/>
				</q-toolbar>
			</div>

			<q-space class="q-my-md" />

			<q-tab-panels
				v-model="currentLeaderboard"
				class="transparent"
			>
				<q-tab-panel
					v-for="{ id } in leaderboardList"
					:key="id"
					:name="id"
				>
					<div class="row q-col-gutter-xs justify-center">
						<div
							v-for="benchmark in benchmarkRecordByLeaderboard[id]"
							:key="benchmark.id"
							class="col-lg-2 col-md-3 col-sm-4"
						>
							<q-card
								bordered
								square
								flat
							>
								<q-card-section class="q-py-none q-px-xs">
									<span
										><q-checkbox v-model="selected[benchmark.id]"></q-checkbox
									></span>
									<span>{{ benchmark.name }}</span>
								</q-card-section>
							</q-card>
						</div>
					</div>
				</q-tab-panel>
			</q-tab-panels>

			<q-space class="q-my-lg" />

			<div
				style="height: 480px"
				class="flex items-center justify-center"
			>
				<app-statistics-chart-empty
					v-if="selectedList.length === 0"
				></app-statistics-chart-empty>

				<template v-else>
					<app-statistics-chart-multiple-level0
						v-if="level === 0"
						:benchmark-list="selectedList"
					></app-statistics-chart-multiple-level0>

					<app-statistics-chart-multiple-level1
						v-if="level === 1"
						:benchmark-list="selectedList"
					></app-statistics-chart-multiple-level1>
				</template>
			</div>
		</app-banner-with-layout>
	</q-page>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import { onBeforeMount, ref, watch, computed } from 'vue';

import * as Backend from 'src/backend';
import AppBannerWithLayout from 'layouts/BannerWith.vue';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import AppStatisticsChartEmpty from './Chart/Empty.vue';
import AppStatisticsChartMultipleLevel0 from './Chart/MultipleLevel0.vue';
import AppStatisticsChartMultipleLevel1 from './Chart/MultipleLevel1.vue';

interface BenchmarkAbstract {
	id: string;
	name: string;
}

interface LeaderboardAbstract {
	id: string;
	name: string;
	code: string;
}

type BenchmarkRecordByLeaderboard = Record<string, BenchmarkAbstract[]>;

const currentLeaderboard = ref<string | null>(null);
const leaderboardList = ref<LeaderboardAbstract[]>([]);
const benchmarkRecordByLeaderboard = ref<BenchmarkRecordByLeaderboard>({});
const selected = ref<Record<string, boolean>>({});
const level = ref<Data.CapabilityLevel>(0);
const levelRecord = ref<Record<Data.CapabilityLevel, string>>({ 0: '', 1: '' });

const capabilityLevelList = computed(() => {
	return Object.entries(levelRecord.value).map(([key, name]) => ({
		label: `${name} Capabilities`,
		value: Number(key),
	}));
});

const selectedList = computed(() => {
	return Object.entries(selected.value)
		.filter(([, value]) => value === true)
		.map(([benchmarkId]) => benchmarkId);
});

watch(
	currentLeaderboard,
	(id) => {
		if (id === null) {
			return;
		}

		const _selected: Record<string, boolean> = {};

		for (const benchmark of benchmarkRecordByLeaderboard.value[id]) {
			_selected[benchmark.id] = false;
		}

		selected.value = _selected;
	},
	{ immediate: true },
);

onBeforeMount(async () => {
	const _configuration = await Backend.API.Capability.Configuration.get();
	const _leaderboardList = await Backend.API.Leaderboard.query();
	const _benchmarkRecordByLeaderboard: BenchmarkRecordByLeaderboard = {};

	for (const { id } of _leaderboardList) {
		const _benchmarkList = await Backend.API.Leaderboard(id).Benchmark.query();

		_benchmarkRecordByLeaderboard[id] = _benchmarkList.map(({ id, name }) => ({
			id,
			name,
		}));
	}

	leaderboardList.value = _leaderboardList;
	currentLeaderboard.value = _leaderboardList[0]!.id;
	benchmarkRecordByLeaderboard.value = _benchmarkRecordByLeaderboard;
	levelRecord.value = { ..._configuration.level };
});

defineOptions({ name: 'AppPageBenchmarkStatistics' });
</script>
