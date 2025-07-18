<template>
	<div
		id="app-home-citation"
		class="column content-center justify-center relative-position items-center bg-white"
	>
		<div class="app-max-width-1680 q-py-xl">
			<h2 class="text-indigo-10 text-weight-medium text-center">Citation</h2>
			<div>
				If you find this work useful in your research, please consider citing:
			</div>
			<app-markdown-html>
				<pre><code>{{ CITATION }}</code></pre>
			</app-markdown-html>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

const CITATION = `@article{EmbodiedArena2025,
	title={EmbodiedArena: A Comprehensive Evaluation Platform and Leaderboards for Embodied AI},
	author={Embodied Arena Team},
	year={2025}
}`;

defineOptions({ name: 'AppHomeSectionCitation' });
</script>
