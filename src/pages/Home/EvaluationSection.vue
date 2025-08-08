<template>
	<div
		id="app-home-evaluation"
		class="column content-center justify-center q-pa-xl relative-position bg-white text-center items-center"
	>
		<h2 class="text-indigo-10 text-weight-bold">{{ data.title }}</h2>
		<app-markdown-html
			class="text-grey-8"
			style="max-width: 70em"
			src="page/home/evaluation"
		></app-markdown-html>
		<q-btn
			class="q-my-xl"
			label="Go to Evaluation Rules to learn more →"
			flat
			dense
			color="indigo-10"
			:to="{ name: 'app.rule' }"
			no-caps
		></q-btn>
		<app-markdown-html
			class="text-grey-8"
			style="max-width: 70em"
			src="page/home/evaluation/detail"
		></app-markdown-html>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import * as Backend from 'src/backend';

const data = ref<{
	title: string;
}>({
	title: '',
});

onBeforeMount(async () => {
	data.value = await Backend.API.Page.Home.Evaluation.get();
});

defineOptions({ name: 'AppPageHomeSectionEvaluation' });
</script>
