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
			COMMENT: `Systematic categorization spanning 7 core embodied capabilities
			decomposed into 25+ fine-grained dimensions, carefully refined from
			diverse embodied tasks and benchmarks to enable researchers to identify
			specific capability gaps and track progress across different aspects of
			Embodied AI`,
		},
		{
			ICON: 'smart_toy',
			TITLE: 'Rich Model Support',
			COMMENT: `Rich evaluation support for diverse AI models including general
			multimodal LLMs, specialized embodied models, and both open-source and
			closed-source models.`,
		},
		{
			ICON: 'electric_bolt',
			TITLE: 'Flexible Benchmark Integration',
			COMMENT: `Flexible integration of 18 + evaluation benchmarks across three
			core leaderboards with extensible design that enables easy onboarding
			while maintaining consistent evaluation protocols as the platform evolves
			with field advancement.`,
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
			TITLE: 'High-quality Evaluation Datasets',
			COMMENT: `Curated evaluation datasets across varying difficulty levels,
			continuously evolved through LLM-driven automated generation pipeline.`,
		},
		{
			ICON: 'api',
			TITLE: 'Multifaceted Evaluation Methodologies',
			COMMENT: `Multifaceted evaluation paradigms including accuracy-based QA
			assessment (exact and fuzzy matching evaluation) and interactive
			simulation-based testing (success rate metrics) for comprehensive
			embodied capability evaluation.`,
		},
	],
};

defineOptions({ name: 'AppPageHomeSectionFeature' });
</script>
