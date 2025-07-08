<template>
	<div
		id="app-home-evaluation"
		class="column content-center justify-center q-pa-xl relative-position bg-white text-center items-center"
	>
		<h2 class="text-indigo-10 text-weight-bold">{{ SECTION.TITLE }}</h2>
		<p
			class="text-center text-body1 text-grey-8"
			style="max-width: 70em"
		>
			{{ SECTION.COMMENT }}
		</p>
		<q-btn
			class="q-my-xl"
			label="Go to Evaluation Rules to learn more →"
			flat
			dense
			color="indigo-10"
			:to="{ name: 'app.rule' }"
			no-caps
		></q-btn>
		<q-img
			class="q-my-xl"
			style="max-width: 70em"
			src="/image/463129486-5c64fbca-ee9d-450e-8009-93f68d823c83.png"
		></q-img>
	</div>
</template>

<script setup lang="ts">
const SECTION = {
	TITLE: 'Embodied Arena Evaluation System',
	COMMENT: `Embodied Arena extensively supports comprehensive evaluation of
	models from different sources (i.e., open-source, close-source) by different
	means (e.g., model parameters, API), offering flexibility and convenience
	for users to join. Embodied Arena leverages a diverse range of well-curated
	Embodied AI benchmarks, which ensures a high alignment
	with canonical evaluation methods and meanwhile the best completeness
	compared to prior works. More importantly, Embodied Arena is greatly powered
	by a unique LLM-driven automatic generation approach for Embodied evaluation
	data, hence has prominent superiorities in providing the diversity of scenrio
	and task, breaking the scaling bottleneck of mannually constructed data,
	keeping evaluation data in blackbox thus ensuring a high-level safety.
	Embodied Arena conducts comprehensive Emboidied evaluation for each model
	across all benchmarks and generative evaluation data, presenting the rank
	on three types of leaderboard and the radar plot in terms of seven Embodied
	capabilities for concise and intuitive comparison. Additionally, Embodied
	Arena includes professional experiment management and real-time leaderboard
	systems for detailed performance tracking and transparent result presentation.`,
};

defineOptions({ name: 'AppPageHomeSectionEvaluation' });
</script>
