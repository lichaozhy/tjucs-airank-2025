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
			TITLE: 'Comprehensive Embodied Capability Taxonomy',
			COMMENT: `Systematic categorization spanning object perception, spatial
			reasoning, temporal understanding, embodied knowledge, navigation, and
			task planning across multiple dimensions.`,
		},
		{
			ICON: 'smart_toy',
			TITLE: 'Rich Model Support',
			COMMENT: `Comprehensive evaluation support for diverse AI architectures
			including general multimodal LLMs, specialized embodied models, and both
			open-source and close-source models.`,
		},
		{
			ICON: 'electric_bolt',
			TITLE: 'Modular Benchmark Integration',
			COMMENT: `Comprehensive integration of diverse evaluation benchmarks
			including visual QA, navigation tasks, task planning, and both 2D/3D
			scenarios, with flexible extensibility for new benchmarks.`,
		},
		{
			ICON: 'hive',
			TITLE: 'Unified Evaluation Infrastructure',
			COMMENT: `Clean, standardized evaluation framework with uniform
			input/output formats enabling seamless and rapid distributed assessment
			across diverse embodied AI benchmarks.`,
		},
		{
			ICON: 'construction',
			TITLE: 'High-Quality Evaluation Datasets',
			COMMENT: `Curated evaluation datasets across varying difficulty levels,
			continuously evolved through LLM-driven automated generation pipeline.`,
		},
		{
			ICON: 'api',
			TITLE: 'Multifaceted Evaluation Methodologies',
			COMMENT: `Complementary evaluation paradigms including accuracy-based QA
			assessment (exact and fuzzy matching evaluation) and interactive
			simulation-based testing (success rate metrics) for comprehensive
			embodied capability evaluation.`,
		},
	],
};

defineOptions({ name: 'AppPageHomeSectionFeature' });
</script>
