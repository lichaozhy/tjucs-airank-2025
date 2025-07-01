<template>
	<q-page
		id="app-benchmark-index"
		class="column content-center"
		padding
	>
		<div
			id="app-benchmark-banner"
			class="app-page-banner column justify-center items-center absolute-full text-white"
		>
			<div class="text-h2 text-weight-light">
				{{ $t('p.benchmark.banner.title') }}
			</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.benchmark.banner.description') }}
			</div>
		</div>

		<div class="full-width app-max-width-1680">
			<div class="filter">
				<div class="q-py-md">
					<q-btn-toggle
						no-caps
						square
						unelevated
						color="white"
						text-color="black"
						toggle-color="indigo-10"
						v-model="selectedLeaderboardId"
						:options="filterItemList"
					/>
				</div>
			</div>

			<div class="row q-col-gutter-md items-stretch">
				<div
					class="col-lg-4 col-md-6"
					v-for="benchmark in filteredBenchmarkList"
					:key="benchmark.id"
				>
					<AppBenchmarkCard :benchmark="benchmark" />
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import { computed, onBeforeMount, ref } from 'vue';

import { API } from 'src/backend';
import * as Backend from 'src/backend';
import AppBenchmarkCard from './BenchmarkCard.vue';

const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
const leaderboardList = ref<Spec.Leaderboard.Type[]>([]);
const selectedLeaderboardId = ref<string | null>(null);

const filterItemList = computed(() => {
	return [
		{
			value: null,
			label: 'All',
		},
		...leaderboardList.value.map(({ id, name }) => ({ value: id, label: name })),
	];
});

const filteredBenchmarkList = computed(() => {
	if (selectedLeaderboardId.value === null) {
		return benchmarkList.value;
	}

	return benchmarkList.value
		.filter(({ leaderboard }) => leaderboard === selectedLeaderboardId.value);
});

onBeforeMount(async () => {
	leaderboardList.value = await Backend.API.Leaderboard.query();
	benchmarkList.value = await API.Benchmark.query();
});

defineOptions({ name: 'BenchmarkIndexPage' });
</script>
