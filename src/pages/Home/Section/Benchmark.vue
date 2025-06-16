<template>
	<div class="column content-center q-pa-xl text-indigo-10">
		<div class="app-content-main full-width">
			<div class="row q-col-gutter-lg">
				<div
					class="q-pr-xl"
					style="width: 30em"
				>
					<div class="text-h4">{{ PROFILE.TITLE }}</div>
					<div class="text-body1 q-mt-xl">{{ PROFILE.COMMENT }}</div>
					<q-btn
						class="q-mt-xl"
						label="Go to view all benchmarks →"
						flat
						dense
						:to="{ name: 'app.benchmark' }"
					></q-btn>
				</div>
				<div class="col-grow">
					<div class="bg-indigo-10 text-h5 q-pa-md text-white">
						{{ INTRODUCTION.TITLE }}
					</div>
					<q-space class="q-my-lg" />
					<div class="row q-col-gutter-lg">
						<div class="col-shrink">
							<q-tabs
								vertical
								stretch
								inline-label
							>
								<q-tab
									content-class="q-pr-lg q-py-md"
									v-for="leaderboard in INTRODUCTION.LEADERBOARD"
									:key="leaderboard.NAME"
									:label="leaderboard.NAME"
									:icon="leaderboard.ICOM"
									style="justify-content: start"
								></q-tab>
							</q-tabs>
						</div>

						<div class="col-grow">jajaj</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
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

const INTRODUCTION = {
	TITLE: '3 Key Leaderboard · 20+ Core Tasks · 50+ Evaluation Datasets',
	LEADERBOARD: [
		{
			NAME: 'Question Answering',
			ICOM: 'question_answer',
		},
		{
			NAME: 'Navigation',
			ICOM: 'near_me',
		},
		{
			NAME: 'Task Planning',
			ICOM: 'view_timeline',
		},
	],
};

defineOptions({ name: 'AppPageHomeSectionBenchmark' });
</script>
