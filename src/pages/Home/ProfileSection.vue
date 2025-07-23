<template>
	<div
		class="column content-center justify-center items-center q-pa-xl text-indigo-10"
	>
		<div class="app-content-main full-width q-mt-xl">
			<AppHomeBenchmarkProfile />
			<q-space class="q-my-xl q-py-xl" />
			<AppHomeModelProfile />
			<q-space class="q-my-xl q-py-xl" />
			<AppHomeCapabilityProfile />
		</div>
	</div>
</template>

<script setup lang="ts">
import AppHomeBenchmarkProfile from './BenchmarkProfile.vue';
import AppHomeCapabilityProfile from './CapabilityProfile.vue';
import AppHomeModelProfile from './ModelProfile.vue';

defineOptions({ name: 'AppPageHomeSectionIntroduction' });
</script>
