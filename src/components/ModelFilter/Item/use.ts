import { inject } from 'vue';
import * as Item from './symbol';

export function useManager() {
	const manager = inject(Item.MANAGER);

	if (manager === undefined) {
		throw new Error('<AppModelFilterItemRange> MUST in <AppModelFilter>.');
	}

	return { manager };
}
