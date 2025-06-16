<template>
	<div
		id="app-home-banner"
		class="window-height bg-indigo-10 column content-center justify-center relative-position"
	>
		<div
			id="particles-js"
			class="absolute-full"
			style="z-index: 0"
		></div>
		<div
			class="text-white text-center q-pa-xl relative-position"
			style="z-index: 1"
		>
			<h1 class="text-weight-bolder">{{ PROJECT.NAME }}</h1>
			<h2 class="">{{ PROJECT.SUBTITLE }}</h2>
			<h5 class="text-weight-light">{{ PROJECT.AUTHOR }}</h5>
			<h5 class="text-weight-light">{{ PROJECT.ABSTRACT }}</h5>

			<div class="row justify-center q-my-xl">
				<q-btn
					class="q-ma-md q-px-xl"
					size="xl"
					label="Online Evaluation"
					outline
				></q-btn>
				<q-btn
					class="q-ma-md q-px-xl"
					size="xl"
					label="View Leaderboards →"
					outline
					:to="{
						name: 'app.leaderboard.detail',
						params: { leaderboardId: defaultLeaderboardId },
					}"
				></q-btn>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import PJS from 'particles.js-es';
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';

import options from './particlesjs-config.json';
import * as Backend from 'src/backend';

const PROJECT = {
	NAME: 'Embodied Arena',
	SUBTITLE: 'Embodied AI Model Evaluation Leaderboard',
	AUTHOR: 'Deep Reinforcement Learning Laboratory at Tianjin University',
	ABSTRACT: [
		'An open-source, efficient, comprehensive, ',
		'and user-friendly evaluation system and platform for embodied AI models',
	].join(''),
};

const defaultLeaderboardId = ref<string | null>(null);

onBeforeMount(async () => {
	const Configuration = await Backend.API.Configuration.get();

	if (Configuration !== null) {
		defaultLeaderboardId.value = Configuration.DEFAULT_LEADERBOARD;
	}
});

onMounted(() => {
	PJS.init('particles-js', options);
});

onBeforeUnmount(() => {
	PJS.destroy('particles-js');
});

defineOptions({ name: 'AppPageHomeSectionBanner' });
</script>
