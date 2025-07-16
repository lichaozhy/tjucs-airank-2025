<template>
	<div
		id="app-home-contribution"
		class="text-white column content-center justify-center q-pa-xl"
	>
		<div class="app-max-width-1680 full-width">
			<q-card
				flat
				square
				id="app-home-contribution-card"
				class="q-pa-xl"
			>
				<q-card-section class="q-pt-xl">
					<div class="text-h2 text-weight-medium">{{ SECTION.TITLE }}</div>
				</q-card-section>
				<q-card-section style="max-width: 80em">
					<div
						class="text-body1 text-indigo-2"
						v-html="SECTION.COMMENT"
					></div>
				</q-card-section>

				<q-separator
					color="indigo-3"
					inset
					class="q-my-lg"
					style="width: 90%"
				/>

				<q-card-section class="q-pb-xl">
					<div class="row q-col-gutter-xl">
						<div class="col-6">
							<div class="text-h5 text-weight-medium q-mb-lg">
								{{ SECTION.BAR.LEFT.TITLE }}
							</div>
							<div class="text-body1 text-indigo-2 q-pb-lg">
								{{ SECTION.BAR.LEFT.COMMENT }}
							</div>
							<q-btn
								square
								outline
								color="white"
								label="Contribute Model"
								:to="{
									name: 'app.googleform',
									params: { id: 'CLAcMUbvU7TsNeKD8' },
									query: { height: 2157 },
								}"
							></q-btn>
						</div>
						<div class="col-6">
							<div class="text-h5 text-weight-medium q-mb-lg">
								{{ SECTION.BAR.RIGHT.TITLE }}
							</div>
							<div class="text-body1 text-indigo-2 q-pb-lg">
								{{ SECTION.BAR.RIGHT.COMMENT }}
							</div>
							<q-btn
								square
								outline
								color="white"
								label="Contribute Benchmark"
								:to="{
									name: 'app.googleform',
									params: { id: '2ncVcX8K6quaEc7TA' },
									query: { height: 2029 },
								}"
							></q-btn>
						</div>
					</div>
				</q-card-section>
			</q-card>
		</div>
	</div>
</template>

<script setup lang="ts">
const SECTION = {
	TITLE: 'Join Us',
	COMMENT: `<span class="text-weight-bold">Join us in advancing Embodied AI
	evaluation!</span> We invite outstanding Embodied AI models to participate in
	our comprehensive evaluation platform. We also cordially welcome researchers
	and practitioners to contribute high-quality and innovative benchmarks that
	advance the field of Embodied AI evaluation.`,
	BAR: {
		LEFT: {
			TITLE: 'Evaluation Leaderboards',
			COMMENT: `Showcase your model: Join the leaderboard competition,
			demonstrate your Embodied AI capabilities across comprehensive
			benchmarks, and establish your model's position in the future of
			Embodied AI. `,
		},
		RIGHT: {
			TITLE: 'Benchmark Community',
			COMMENT: `Make your benchmark shine: Co-create and share evaluation
			benchmarks with the community, establish distinctive leaderboards, and
			collectively shape the future of large-scale Embodied AI evaluation.`,
		},
	},
};

defineOptions({ name: 'AppPageHomeSectionContribution' });
</script>

<style>
#app-home-contribution-card {
	background: #2a799b;
	background: radial-gradient(
		circle,
		rgba(26, 35, 126, 0.8) 0%,
		rgba(26, 35, 126, 1) 70%
	);
}
</style>
