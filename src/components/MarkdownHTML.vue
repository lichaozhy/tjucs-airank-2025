<template>
	<div
		class="app-markdown-html"
		:class="{ 'app-markdown-html__tracking': tracking }"
		:style="{ 'font-size': prop.fontsize }"
		ref="document"
	>
		<div v-html="prop.content"></div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTracker } from './Markdown';

const tracking = useTracker();
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

<style lang="scss">
.app-markdown-html {
	position: relative;

	#app-markdown-source-url {
		display: none;
		position: absolute;
		top: 0;
		right: 0;
		background-color: black;
		color: white;
		font-size: 12px;
		padding: 4px 1em;
		z-index: 99999999;
	}

	&.app-markdown-html__tracking {
		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			box-shadow: 0 0 0 4px #f4aab9 inset;
			z-index: 99999;
		}

		#app-markdown-source-url {
			display: block;
		}
	}
}
</style>
