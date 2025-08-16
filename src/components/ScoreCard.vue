<template>
	<app-markdown-html
		style="font-size: 14px;"
		class="text-weight-thin app-score-card-hint"
		src="component/score-card/hint"
	></app-markdown-html>
	<q-card square>
		<slot name="header"></slot>
		<slot></slot>
	</q-card>
</template>

<script setup lang="ts">
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

defineOptions({ name: 'AppScoreCard' });
</script>

<style lang="scss">
.app-score-card-hint {
	p {
		margin-bottom: 4px;
	}
}
</style>
