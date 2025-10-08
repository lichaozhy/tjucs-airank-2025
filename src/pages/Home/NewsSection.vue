<template>
	<div
		id="app-home-news"
		class="column content-center justify-center relative-position items-center bg-white q-py-xl"
	>
		<div class="app-max-width-1680 row justify-center">
			<div class="col-lg-9 col-md-12">
				<div class="text-indigo-10 text-h2 text-weight-bold text-center q-py-lg">News</div>
				<app-markdown-html :src="'page/home/news'"></app-markdown-html>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

defineOptions({ name: 'AppHomeSectionNews' });
</script>
