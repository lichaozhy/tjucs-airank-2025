<template>
	<q-page id="app-home">
		<app-home-banner-section />
		<AppHomeProfileSection />
		<app-home-evaluation />
		<app-home-feature />
		<app-contributor-section />
		<app-home-contribution />
		<app-home-citation-section />
	</q-page>
</template>

<script setup lang="ts">
import AppHomeBannerSection from './BannerSection.vue';
import AppHomeProfileSection from './ProfileSection.vue';
import AppHomeEvaluation from './EvaluationSection.vue';
import AppHomeFeature from './FeatureSection.vue';
import AppContributorSection from './ContributorSection.vue';
import AppHomeContribution from './ContributionSection.vue';
import AppHomeCitationSection from './CitationSection.vue';

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
