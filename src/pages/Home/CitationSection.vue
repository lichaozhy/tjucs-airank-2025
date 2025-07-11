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
			<div class="app-markdown-html">
				<pre><code>{{ CITATION }}</code></pre>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const CITATION = `@article{UniEQA2025,
  title={UniEQA & UniEval: A Unified Benchmark and Evaluation Platform for  Multimodal Foundation Models in Embodied Question Answering},
  year={2025}
}`;

defineOptions({ name: 'AppHomeSectionCitation' });
</script>
