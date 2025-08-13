type ItemResetHandler = () => unknown;

export class FilterItemManager {
	resets = new Set<ItemResetHandler>();
	record: Record<string, object> = {};

	setValue(id: string, value: object) {
		this.record[id] = value;
	}

	getValue(id: string) {
		return this.record[id];
	}

	register(handler: ItemResetHandler) {
		this.resets.add(handler);
	}

	remove(handler: ItemResetHandler) {
		this.resets.delete(handler);
	}

	resetAll() {
		for (const handler of this.resets) {
			handler();
		}
	}
}
