import { ref } from 'vue';

const fromURL = ref<boolean>(true);

export function useState() {
	return { fromURL };
}
