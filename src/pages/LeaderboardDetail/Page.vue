<template>
	<q-page
		class="column content-center"
		padding
	>
		<div
			id="app-leaderboard-banner"
			class="title column justify-center items-center absolute-full"
			style="height: 230px"
		>
			<div class="text-h2 text-weight-light">{{ $t('p.leaderboard.banner.title') }}</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.leaderboard.banner.description') }}
			</div>
		</div>

		<div
			style="max-width: 1680px; margin-top: 240px"
			class="full-width"
		>
			<div
				class="row q-col-gutter-lg"
				v-if="benchmarkList.length !== 0"
			>
				<div
					class="col-6 col-grow"
					v-for="benchmark in benchmarkList"
					:key="benchmark.id"
				>
					<AppBenchmark
						:leaderboardId="leaderboardId"
						:benchmark="benchmark"
					/>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';
import AppBenchmark from './Benchmark.vue';

const { params } = useRoute();
const leaderboardId = String(params.leaderboardId);
const LeaderboardAPI = Backend.API.Leaderboard(leaderboardId);

const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
const scoreList = ref<Array<Spec.Score.Type>>([]);
const modelList = ref<Array<Spec.Model.Type>>([]);

onBeforeMount(async () => {
	benchmarkList.value = await LeaderboardAPI.Benchmark.query();
	scoreList.value = await Backend.API.Score.query();
	modelList.value = await Backend.API.Model.query();
});

defineOptions({ name: 'AppLeaderboardPage' });
</script>

<style lang="scss">
#app-leaderboard-banner {
	background:
		linear-gradient(
			to bottom,
			rgba($primary, 0.4) 0%,
			rgba($primary, 0.45) 25%,
			rgba($primary, 0.5) 50%,
			rgba($primary, 0.55) 75%,
			rgba($primary, 0.6) 100%
		),
		url('/image/29085492_1944-no.jpg') center/cover;
}
</style>
