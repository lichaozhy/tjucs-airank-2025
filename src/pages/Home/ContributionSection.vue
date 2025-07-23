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

				<q-card-section>
					<app-markdown-html
						style="max-width: 80em;"
						src="page/home/contribute"
					></app-markdown-html>
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
							<app-markdown-html
								src="page/home/contribute/model"
							></app-markdown-html>
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
							<app-markdown-html
								src="page/home/contribute/benchmark"
							></app-markdown-html>
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
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

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
