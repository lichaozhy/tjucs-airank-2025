<template>
	<div class="column content-center q-pa-xl text-indigo-10">
		<div class="app-content-main full-width">
			<div class="row q-col-gutter-lg no-wrap">
				<div
					class="q-pr-xl col-grow"
					style="max-width: 30em;"
				>
					<div style="position: sticky;top: 80px">
						<div class="text-h4">{{ PROFILE.TITLE }}</div>
						<div class="text-body1 q-mt-xl">{{ PROFILE.COMMENT }}</div>
					</div>
				</div>
				<div class="col-shrink">
					<AppHomeBenchmarkProfile />
					<q-space class="q-my-xl q-py-xl" />
					<AppHomeRankProfile />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppHomeBenchmarkProfile from './BenchmarkProfile.vue';
import AppHomeRankProfile from './RankProfile.vue';

const PROFILE = {
	TITLE: 'Embodied AI Model Evaluation',
	COMMENT: [
		'Embodied Arena performs an in-depth and holistic assessment of embodied ',
		'AI models, leveraging an extensive array of rigorously curated benchmarks',
		' across seven fundamental dimensions: object perception, spatial ',
		'perception, temporal perception, embodied knowledge, embodied reasoning,',
		' embodied navigation, and embodied task planning.',
	].join(''),
};

defineOptions({ name: 'AppPageHomeSectionBenchmarkRank' });
</script>
