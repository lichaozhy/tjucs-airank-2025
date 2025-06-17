<template>
	<div
		id="app-home-contribution"
		class="text-white column content-center justify-center q-py-xl"
	>
		<div class="app-max-width-1680 full-width">
			<q-card
				flat
				square
				id="app-home-contribution-card"
				class="q-pa-xl q-my-xl"
			>
				<q-card-section class="q-pt-xl">
					<div class="text-h2 text-weight-medium">{{ SECTION.TITLE }}</div>
				</q-card-section>
				<q-card-section style="max-width: 80em">
					<div class="text-body1 text-indigo-2">{{ SECTION.COMMENT }}</div>
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
								label="Online Evaluation"
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
	TITLE: 'COLLABORATION INITIATIVE',
	COMMENT: [
		'We have established the Embodied Arena Collaboration Initiative, ',
		'enthusiastically welcoming outstanding embodied AI models to participate ',
		'in our comprehensive evaluation platform. Simultaneously, we cordially ',
		'invite researchers and practitioners to contribute high-quality and ',
		'innovative benchmarks that advance the field of embodied intelligence ',
		'evaluation.',
	].join(''),
	BAR: {
		LEFT: {
			TITLE: 'Evaluation Leaderboards',
			COMMENT: [
				'Only open source or external API service models are supported ',
				'(internal iterative models currently do not support)',
			].join(''),
		},
		RIGHT: {
			TITLE: 'Benchmark Community',
			COMMENT: [
				'Make your benchmark shine: co-create and share evaluation benchmarks ',
				'with the community, establish unique leaderboards, and together shape ',
				'the new benchmark for large model evaluation',
			].join(''),
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
