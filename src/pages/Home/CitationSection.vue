<template>
	<div
		id="app-home-citation"
		class="column content-center justify-center relative-position items-center bg-white"
	>
		<div class="app-max-width-1680 q-py-xl">
			<h2 class="text-indigo-10 text-weight-medium text-center">Citation</h2>
			<app-markdown-html :src="'page/home/citation'"></app-markdown-html>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

defineOptions({ name: 'AppHomeSectionCitation' });
</script>
