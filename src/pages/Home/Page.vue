<template>
	<q-page id="app-home">
		<app-home-banner-section />
		<app-home-benchmark-rank-section />
		<app-home-evaluation />
		<app-home-feature />
		<app-home-cooperation />
		<app-home-contribution />
	</q-page>
</template>

<script setup lang="ts">
import AppHomeBannerSection from './BannerSection.vue';
import AppHomeBenchmarkRankSection from './BenchmarkRankSection.vue';
import AppHomeEvaluation from './EvaluationSection.vue';
import AppHomeFeature from './FeatureSection.vue';
import AppHomeCooperation from './CooperationSection.vue';
import AppHomeContribution from './ContributionSection.vue';

defineOptions({ name: 'AppPageHome' });
</script>

<style lang="scss">
body:has(#app-home-banner) {
	#app-container {
		padding-top: 0 !important;
	}

	#app-header {
		background-color: rgba(0, 0, 0, 0.6) !important;
	}
}
</style>
