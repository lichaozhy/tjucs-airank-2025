<template>
	<q-page id="app-home">
		<component
			v-for="(SectionComponent, index) in sectionList"
			:key="index"
			:is="SectionComponent"
		></component>
	</q-page>
</template>

<script setup lang="ts">
import Banner from './Section/Banner.vue';
import Benchmark from './Section/Benchmark.vue';
import Rank from './Section/Rank.vue';
import Evaluation from './Section/Evaluation.vue';
import Feature from './Section/Feature.vue';
import Cooperation from './Section/Cooperation.vue';
import Contribution from './Section/Contribution.vue';

const sectionList = [
	Banner,
	Benchmark,
	Rank,
	Evaluation,
	Feature,
	Cooperation,
	Contribution,
];

defineOptions({ name: 'AppPageHome' });
</script>

<style lang="scss">
body:has(#app-home-banner) {
	#app-container {
		padding-top: 0 !important;
	}

	#app-header {
		background-color: rgba(0, 0, 0, 0.6);
	}
}
</style>
