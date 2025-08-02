<template>
	<q-page
		id="app-benchmark-index"
		class="column content-center"
		padding
	>
		<AppBannerWithLayout>
			<template #banner>
				<div class="text-h2 text-weight-light">
					{{ $t('p.benchmark.banner.title') }}
				</div>
				<div class="text-subtitle1 q-mt-md text-weight-light">
					{{ $t('p.benchmark.banner.description') }}
				</div>
			</template>

			<q-toolbar
				class="q-px-none"
				style="min-height: 0"
			>
				<q-btn-toggle
					no-caps
					square
					unelevated
					color="white"
					text-color="black"
					toggle-color="indigo-10"
					v-model="leaderboardId"
					:options="filterItemList"
					stretch
				/>

				<q-space />

				<q-input
					v-model="keyword"
					square
					label="Filter by Name"
					stack-label
					clearable
					placeholder="Input keyword to filter"
					style="min-width: 20em"
					color="indigo-10"
					outlined
					dense
				></q-input>
			</q-toolbar>

			<q-space class="q-mt-md" />

			<div class="row q-col-gutter-md items-stretch">
				<div
					class="col-lg-4 col-md-6 col-12"
					v-for="benchmark in filteredBenchmarkList"
					:key="benchmark.id"
				>
					<AppBenchmarkCard :benchmark="benchmark" />
				</div>
			</div>
		</AppBannerWithLayout>
	</q-page>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import { computed, onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';
import AppBannerWithLayout from 'layouts/BannerWith.vue';
import AppBenchmarkCard from './BenchmarkCard.vue';

interface LeaderboardAbstract {
	id: string;
	name: string;
}

const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
const leaderboardList = ref<LeaderboardAbstract[]>([]);
const leaderboardId = ref<string | null>(null);
const keyword = ref<string | null>(null);

const filterItemList = computed(() => {
	return [
		{
			value: null,
			label: 'All',
		},
		...leaderboardList.value.map(({ id, name }) => ({
			value: id,
			label: name.replace('Leaderboard', 'Benchmarks'),
		})),
	];
});

const filteredBenchmarkList = computed(() => {
	let list = [...benchmarkList.value].sort(
		(a, b) => b.released!.at.year - a.released!.at.year,
	);

	if (leaderboardId.value !== null) {
		list = list.filter(
			({ leaderboard }) => leaderboard === leaderboardId.value,
		);
	}

	const keywordValue = keyword.value;

	if (keywordValue !== '' && keywordValue !== null) {
		const reg = new RegExp(keywordValue, 'i');

		list = list.filter(({ name }) => reg.test(name));
	}

	return list;
});

onBeforeMount(async () => {
	const _leaderboardList = await Backend.API.Leaderboard.query();
	const _benchmarkList = await Backend.API.Benchmark.query();

	leaderboardList.value = _leaderboardList;
	benchmarkList.value = _benchmarkList;
});

defineOptions({ name: 'BenchmarkIndexPage' });
</script>
