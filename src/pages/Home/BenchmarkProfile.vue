<template>
	<div class="col-shrink">
		<div class="column content-center items-center text-center">
			<h2 class="text-indigo-10 text-weight-bold">{{ data.title }}</h2>
			<app-markdown-html
				class="text-body1 text-grey-8 self-center"
				style="max-width: 70em"
				src="page/home/profile/benchmark"
			></app-markdown-html>
		</div>

		<div class="bg-indigo-10 text-h5 q-pa-md q-mt-xl text-white">
			{{ detail.title }}
		</div>

		<q-space class="q-my-lg" />

		<div
			class="row q-col-gutter-lg no-wrap"
			v-if="leaderboard !== null"
		>
			<div class="col-grow row">
				<q-tabs
					vertical
					stretch
					inline-label
					v-model="leaderboard"
				>
					<q-tab
						content-class="q-pr-lg q-py-sm"
						v-for="leaderboard in detail.list"
						:key="leaderboard.id"
						:label="leaderboardRecord[leaderboard.id]!.name"
						:icon="leaderboard.icon"
						style="justify-content: start"
						:name="leaderboard.id"
					></q-tab>
				</q-tabs>

				<q-separator
					vertical
					class="full-height"
					color="indigo-1"
				/>
			</div>

			<div class="col-shrink relative-postion text-black">
				<app-markdown-html
					style="min-height: 8em"
					:src="`leaderboard/${leaderboard}`"
				></app-markdown-html>

				<div class="text-h5 text-center text-weight-medium q-mt-lg">
					Benchmarks
				</div>

				<q-tabs
					v-model="benchmark"
					class="q-mt-md"
					v-if="leaderboard !== null"
				>
					<q-tab
						v-for="benchmark in leaderboardRecord[leaderboard]!.benchmarkList"
						:key="benchmark.id"
						:label="benchmark.name"
						:name="benchmark.id"
						no-caps
						align="justify"
						narrow-indicator
					></q-tab>
				</q-tabs>

				<q-tab-panels
					class="bg-transparent"
					v-model="benchmark"
					swipeable
					infinite
					v-if="leaderboard !== null"
				>
					<q-tab-panel
						class="q-px-none text-body1"
						v-for="benchmark in leaderboardRecord[leaderboard]!.benchmarkList"
						:key="benchmark.id"
						:name="benchmark.id"
					>
						<app-markdown-html
							style="min-height: 12.5em"
							:src="`benchmark/${benchmark.id}/profile`"
						></app-markdown-html>
					</q-tab-panel>
				</q-tab-panels>
			</div>
		</div>
		<q-toolbar class="q-mt-xs justify-around">
			<q-btn
				label="View Leaderboards →"
				flat
				dense
				:to="{ name: 'app.leaderboard' }"
				no-caps
			></q-btn>
			<q-btn
				label="Contribute Benchmark →"
				flat
				dense
				no-caps
				:to="{
					name: 'app.googleform',
					params: { id: '2ncVcX8K6quaEc7TA' },
					query: { height: 2029 },
				}"
			></q-btn>
			<q-btn
				label="Go to Embodied Benchmarks to view all benchmarks →"
				flat
				dense
				:to="{ name: 'app.benchmark' }"
				no-caps
			></q-btn>
		</q-toolbar>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import * as Backend from 'src/backend';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

interface LeaderboardAbstract {
	id: string;
	name: string;
	benchmarkList: {
		id: string;
		name: string;
	}[];
}

const data = ref<{ title: string }>({ title: '' });

const detail = ref<{
	title: string;
	list: {
		id: string;
		icon: string;
	}[];
}>({ title: '', list: [] });

const leaderboardRecord = ref<Record<string, LeaderboardAbstract>>({});
const leaderboard = ref<string | null>(null);
const benchmark = ref<string | null>(null);

watch(leaderboard, () => {
	const leaderboardId = leaderboard.value!;
	const selectedLeaderboard = leaderboardRecord.value[leaderboardId]!;

	benchmark.value = selectedLeaderboard.benchmarkList[0]!.id;
});

interface LeaderboardAbstract {
	id: string;
	name: string;
	benchmarkList: {
		id: string;
		name: string;
	}[];
}

onBeforeMount(async () => {
	const PageAPI = Backend.API.Page;
	const configuration = await Backend.API.Configuration.get();
	const _detail = await PageAPI.Home.Profile.Benchmark.Leaderboard.get();
	const _data = await PageAPI.Home.Profile.Benchmark.get();
	const idNameRecord: Record<string, LeaderboardAbstract> = {};

	for (const { id, name } of await Backend.API.Leaderboard.query()) {
		const LeaderboardAPI = Backend.API.Leaderboard(id);
		const benchmarkDataList = await LeaderboardAPI.Benchmark.query();

		idNameRecord[id] = {
			id,
			name,
			benchmarkList: benchmarkDataList.map(({ id, name }) => ({ id, name })),
		};
	}

	leaderboard.value = configuration.DEFAULT_LEADERBOARD;
	leaderboardRecord.value = idNameRecord;
	data.value = _data;
	detail.value = _detail;
});

defineOptions({ name: 'AppPageHomeBenchmarkProfile' });
</script>
