<template>
	<div
		id="app-leaderboard-task"
		class="row q-col-gutter-lg"
	>
		<div class="col-12">
			<app-markdown-html
				style="min-height: 4em"
				class="text-grey-9"
				:src="`page/leaderboard/task/${operand.id}`"
			></app-markdown-html>
		</div>
		<div
			class="col-12"
			v-for="summary in filteredSummaryList"
			:key="summary.id"
		>
			<AppSummaryScoreCard
				:leaderboard-id="operand.id!"
				:summary-id="summary.id"
			></AppSummaryScoreCard>
		</div>

		<div
			class="col-12"
			v-for="benchmark in filteredBenchmarkList"
			:key="benchmark.id"
		>
			<AppBenchmarkScoreCard :benchmark-id="benchmark.id" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { BenchmarkAbstract, SummaryAbstract } from './type';
import { computed, onBeforeMount, ref, inject } from 'vue';

import * as Spec from 'src/spec';
import * as Backend from 'src/backend';
import * as LeaderboardLayout from 'layouts/Leaderboard';

import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import AppSummaryScoreCard from './SummaryScoreCard.vue';
import AppBenchmarkScoreCard from './BenchmarkScoreCard.vue';

const operand = inject(LeaderboardLayout.Operand.symbol)!;
const LeaderboardAPI = Backend.API.Leaderboard(operand.value.id!);

const benchmarkList = ref<BenchmarkAbstract[]>([]);
const summaryList = ref<SummaryAbstract[]>([]);

const { INJECTION_KEY: INJECTION } = Spec;
const selectedBenchmark = inject(INJECTION.LEADERBOARD_BENCHMARK_SELECTED);
const selectedSummary = inject(INJECTION.LEADERBOARD_SUMMARY_SELECTED);

const filteredSummaryList = computed(() => {
	return summaryList.value.filter(({ id }) => selectedSummary![id]);
});

const filteredBenchmarkList = computed(() => {
	return benchmarkList.value.filter(({ id }) => selectedBenchmark![id]);
});

onBeforeMount(async () => {
	const benchmarkDataList = await LeaderboardAPI.Benchmark.query();
	const summaryDataList = await LeaderboardAPI.Summary.query();

	benchmarkList.value = benchmarkDataList.map(({ id, name }) => ({ id, name }));
	summaryList.value = summaryDataList.map(({ id, name }) => ({ id, name }));
});

defineOptions({ name: 'AppPageLeaderboardTask' });
</script>
