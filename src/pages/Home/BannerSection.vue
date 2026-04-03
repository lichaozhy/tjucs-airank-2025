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
			class="text-white text-center q-pa-xl column items-center"
			style="z-index: 1"
		>
			<h1 class="text-weight-bolder q-my-xl">{{ data.title }}</h1>
			<h2 class="q-my-lg">{{ data.subtitle }}</h2>
			<h5 class="text-weight-light q-my-md">{{ data.slogan }}</h5>

			<div style="max-width: 900px;" class="q-my-lg">
				<div class="row justify-center q-col-gutter-lg">
					<div class="col-6">
						<q-btn
							class="full-width"
							size="xl"
							label="Join Evaluation"
							outline
							square
							:to="{
								name: 'app.googleform',
								params: { id: 'CLAcMUbvU7TsNeKD8' },
								query: { height: 2157 },
							}"
						></q-btn>
					</div>
					<div class="col-6">
						<q-btn
							class="full-width"
							size="xl"
							label="View Leaderboards →"
							outline
							square
							:to="{ name: 'app.leaderboard.capability' }"
						></q-btn>
					</div>
					<div class="col-6">
						<q-btn
							class="full-width"
							size="xl"
							label="opensource framework"
							square
							outline
							style="background-color: rgba(255,255,255,.3) !important;"
							href="https://github.com/lichaozhy/tjucs-airank-2025"
						></q-btn>
					</div>
					<div class="col-6">
						<q-btn
							class="full-width"
							size="xl"
							label="red note reports"
							square
							outline
							style="background-color: rgba(255,255,255,.3) !important;"
							href="https://www.xiaohongshu.com/explore/698419b1000000001a022244?xsec_token=ABTJTjQVWVEgYb6JzlxyML85W0Y-0p9_sIgAPFdq8cl10=&xsec_source=pc_user"
						></q-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import PJS from 'particles.js-es';
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';

import options from './particlesjs-config.json';
import * as Backend from 'src/backend';

const data = ref<{
	title: string;
	subtitle: string;
	slogan: string;
}>({
	title: '',
	subtitle: '',
	slogan: '',
});

onBeforeMount(async () => {
	data.value = await Backend.API.Page.Home.Banner.get();
});

onMounted(() => {
	PJS.init('particles-js', options);
});

onBeforeUnmount(() => {
	PJS.destroy('particles-js');
});

defineOptions({ name: 'AppPageHomeSectionBanner' });
</script>
