import { ref } from 'vue';

interface MarkdownTracker {
	toggle: () => undefined;
}

declare global {
	interface Window {
		markdown: MarkdownTracker;
	}
}

const showing = ref<boolean>(false);

window.markdown = {
	toggle() {
		showing.value = !showing.value;
	},
};

export function useTracker() {
	return showing;
}
