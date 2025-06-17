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
			label="Go to Embodied Leaderboard Rules to learn more →"
			flat
			dense
			color="indigo-10"
			:to="{ name: 'app.benchmark' }"
			no-caps
		></q-btn>
		<q-img
			class="q-my-xl"
			style="max-width: 70em;"
			src="/html/assets/2d0abf33d0abaa64a7cbf222a3cd063d.png"
		></q-img>
	</div>
</template>

<script setup lang="ts">
const SECTION = {
	TITLE: 'How do we evaluate?',
	COMMENT: [
		'Embodied Arena platform extensively supports over 50+ embodied AI models',
		' and multimodal models, incorporating a diverse range of 20+ specialized ',
		'benchmarks with thousands of carefully curated questions to evaluate ',
		'models across seven fundamental dimensions. Its comprehensive evaluation ',
		'system enables thorough assessment of embodied intelligence capabilities ',
		'including object perception, spatial reasoning, temporal understanding, ',
		'and interactive task planning. The platform accommodates various ',
		'evaluation methodologies, including visual question answering, spatial ',
		'navigation tasks, and embodied reasoning assessments, and features a ',
		'highly flexible modular design for seamless integration of new models, ',
		'benchmarks, or customized embodied AI scenarios. Additionally, Embodied ',
		'Arena includes advanced experiment management and real-time leaderboard ',
		'systems for detailed performance tracking and transparent result ',
		'presentation across different embodied intelligence tasks.',
	].join(''),
};

defineOptions({ name: 'AppPageHomeSectionEvaluation' });
</script>
