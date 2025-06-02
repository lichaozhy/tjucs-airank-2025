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
			<div class="text-subtitle1 q-mt-md">{{ $t('p.leaderboard.banner.description') }}</div>
		</div>

		<div style="max-width: 1680px; margin-top: 200px">
			<q-tabs
				no-caps
				v-model="tab"
				class="q-my-lg"
			>
				<q-tab
					v-for="item in leaderboardList"
					:key="item.id"
					:name="item.id"
					:label="item.name"
				/>
			</q-tabs>
			<div
				class="row q-col-gutter-lg"
				v-if="benchmarkShowList.length !== 0"
			>
				<div
					class="col-6 col-grow"
					v-for="benchmark in benchmarkShowList"
					:key="benchmark.id"
				>
					<AppBenchmark
						:leaderboardId="tab"
						:benchmark="benchmark"
						:scoreList="scoreList"
						:modelList="modelList"
					/>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import { computed, onBeforeMount, ref } from 'vue';
import { API } from 'src/backend';
import AppBenchmark from './Benchmark.vue';

const leaderboardList = ref<Array<Spec.Leaderboard.Type>>([]);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
const scoreList = ref<Array<Spec.Score.Type>>([]);
const modelList = ref<Array<Spec.Model.Type>>([]);
const tab = ref<string>(leaderboardList.value[0]?.id ?? '');

onBeforeMount(async () => {
	leaderboardList.value = await API.Leaderboard.query();
	benchmarkList.value = await API.Benchmark.query();
	scoreList.value = await API.Score.query();
	modelList.value = await API.Model.query();

	tab.value = leaderboardList.value[0]?.id ?? '';
});

const benchmarkShowList = computed(() => {
	return benchmarkList.value.filter((benchmark) => {
		return benchmark.leaderboard === tab.value;
	});
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
