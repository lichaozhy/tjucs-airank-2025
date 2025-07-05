<template>
	<div class="column content-center justify-center items-center q-pa-xl text-indigo-10">
		<h2 class="text-indigo-10 text-weight-bold">{{ PROFILE.TITLE }}</h2>
		<p
			class="text-center text-body1 text-grey-8"
			style="max-width: 70em"
		>
			{{ PROFILE.COMMENT }}
		</p>

		<div class="app-content-main full-width q-mt-xl">
			<div>
				<AppHomeBenchmark />
				<q-space class="q-my-xl q-py-xl" />
				<AppHomeRankProfile />
				<q-space class="q-my-xl q-py-xl" />
				<AppHomeCapabilityProfile />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppHomeBenchmark from './BenchmarkProfile.vue';
import AppHomeCapabilityProfile from './CapabilityProfile.vue';
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

defineOptions({ name: 'AppPageHomeSectionIntroduction' });
</script>
