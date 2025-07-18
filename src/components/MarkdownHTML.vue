<template>
	<div
		class="app-markdown-html"
		:style="{ 'font-size': prop.fontsize }"
		ref="document"
	>
		<div v-html="prop.content"></div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const document = ref<HTMLDivElement | null>(null);

const prop = withDefaults(
	defineProps<{
		fontsize?: string;
		content?: string;
	}>(),
	{
		fontsize: '16px',
		content: '',
	},
);

defineOptions({ name: 'AppMarkdownHTML' });
</script>
