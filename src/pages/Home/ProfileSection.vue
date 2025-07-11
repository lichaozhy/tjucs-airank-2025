<template>
	<div
		class="column content-center justify-center items-center q-pa-xl text-indigo-10"
	>
		<div class="app-content-main full-width q-mt-xl">
			<AppHomeBenchmark />
			<q-space class="q-my-xl q-py-xl" />
			<AppHomeRankProfile />
			<q-space class="q-my-xl q-py-xl" />
			<AppHomeCapabilityProfile />
		</div>
	</div>
</template>

<script setup lang="ts">
import AppHomeBenchmark from './BenchmarkProfile.vue';
import AppHomeCapabilityProfile from './CapabilityProfile.vue';
import AppHomeRankProfile from './RankProfile.vue';

defineOptions({ name: 'AppPageHomeSectionIntroduction' });
</script>
