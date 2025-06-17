<template>
	<div
		id="app-home-feature"
		class="column content-center justify-center q-pa-xl relative-position items-center"
	>
		<h2 class="text-indigo-10 text-weight-medium text-center">
			{{ SECTION.TITLE }}
		</h2>
		<div class="app-max-width-1680 q-py-xl q-my-xl">
			<div class="row q-col-gutter-xl items-stretch">
				<div
					v-for="(item, index) in SECTION.ITEMS"
					:key="index"
					class="col-4"
				>
					<q-card
						class="full-height"
						flat
						square
					>
						<q-item class="text-indigo-10">
							<q-item-section avatar>
								<q-avatar
									:icon="item.ICON"
									size="72px"
								></q-avatar>
							</q-item-section>
							<q-item-section>
								<div class="text-h6">{{ item.TITLE }}</div>
							</q-item-section>
						</q-item>
						<q-card-section class="text-grey-8 text-body1">
							{{ item.COMMENT }}
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const SECTION = {
	TITLE: '6 KEY FEATURES FOR PROFESSIONAL EMBODIED AI EVALUATION',
	ITEMS: [
		{
			ICON: 'lock_open',
			TITLE: 'Open Source and Reproducible',
			COMMENT: [
				'A fully open source and reproducible embodied AI model evaluation ',
				'framework that ensures transparency and enables community-driven ',
				'development',
			].join(''),
		},
		{
			ICON: 'smart_toy',
			TITLE: 'Embodied Model Support',
			COMMENT: [
				'Comprehensive evaluation support for diverse embodied AI models ',
				'including multimodal LLMs, spatial reasoning models, navigation ',
				'agents, and robotic foundation models',
			].join(''),
		},
		{
			ICON: 'electric_bolt',
			TITLE: 'High-Performance Evaluation System',
			COMMENT: [
				'Delivers high-performance distributed evaluation across multiple ',
				'embodied benchmarks, enabling rapid assessment of large-scale embodied ',
				'AI models',
			].join(''),
		},
		{
			ICON: 'hive',
			TITLE: 'Embodied Capability Framework',
			COMMENT: [
				'Systematic categorization of embodied AI capabilities including ',
				'object perception, spatial reasoning, temporal understanding, embodied ',
				'knowledge, navigation, and task planning',
			].join(''),
		},
		{
			ICON: 'construction',
			TITLE: 'Modular Benchmark Integration',
			COMMENT: [
				'Flexible architecture supporting easy integration of new embodied AI ',
				'benchmarks, datasets, and evaluation scenarios for continuous platform ',
				'evolution',
			].join(''),
		},
		{
			ICON: 'api',
			TITLE: 'Multi-Modal Evaluation Methods',
			COMMENT: [
				'Supports diverse evaluation methodologies including visual question ',
				'answering, spatial navigation tasks, embodied reasoning, interactive ',
				'planning, and real-world scenario simulation',
			].join(''),
		},
	],
};

defineOptions({ name: 'AppPageHomeSectionFeature' });
</script>
