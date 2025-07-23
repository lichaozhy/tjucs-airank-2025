<template>
	<div
		class="app-markdown-html"
		:class="{ 'app-markdown-html__tracking': tracking }"
		:style="{ 'font-size': props.fontsize }"
		ref="document"
	>
		<div v-html="content"></div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import * as Backend from 'src/backend';
import { useTracker } from './Markdown';

const tracking = useTracker();
const document = ref<HTMLDivElement | null>(null);

const props = withDefaults(
	defineProps<{
		fontsize?: string;
		content?: string;
		src?: string | null;
	}>(),
	{
		fontsize: '16px',
		content: '',
		src: null,
	},
);

const emit = defineEmits<{
	(e: 'rendered'): void;
}>();

const fetchedContent = ref<string | null>(null);

const content = computed<string>(() => {
	if (fetchedContent.value === null) {
		return props.content;
	}

	return fetchedContent.value;
});

watch(content, async () => await nextTick(() => emit('rendered')));

watch(
	props,
	async () => {
		if (props.src === null) {
			return (fetchedContent.value = null);
		}

		fetchedContent.value = await Backend.API.Document.read(props.src);
	},
	{ immediate: true },
);

defineOptions({ name: 'AppMarkdownHTML' });
</script>

<style lang="scss">
$outline-width: 4px;

.app-markdown-html {
	position: relative;

	#app-markdown-source-url {
		display: none;
		position: absolute;
		top: $outline-width;
		right: $outline-width;
		background-color: black;
		color: white;
		font-size: 12px;
		padding: 4px 1em;
		z-index: 3;
	}

	&.app-markdown-html__tracking {
		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			box-shadow: 0 0 0 $outline-width #f4aab999 inset;
			z-index: 2;
		}

		#app-markdown-source-url {
			display: block;
		}
	}
}
</style>
