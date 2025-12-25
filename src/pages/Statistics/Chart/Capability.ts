import { API } from 'src/backend';

export type Level = 0 | 1;

export interface CapabilityAbstract {
	id: string;
	name: string;
	parent: string | null;
	level: Level;
}

export async function fetchLevel0() {
	const record: Record<string, CapabilityAbstract> = {};
	const configuration = await API.Capability.Configuration.get();

	for (const { id, name, radar } of await API.Capability.query()) {
		if (!radar) {
			continue;
		}

		record[id] = { id, name, level: 0, parent: null };
	}

	return configuration.order
		.filter((id) => id in record)
		.map((id) => record[id]!);
}

export async function fetchLevel1() {
	const { order: level0Order } = await API.Capability.Configuration.get();
	const list: CapabilityAbstract[] = [];

	for (const level0CapabilityId of level0Order) {
		const record: Record<string, CapabilityAbstract> = {};
		const Level1API = API.Capability(level0CapabilityId);
		const configuration = await Level1API.Configuration.get();

		if (configuration === null) {
			continue;
		}

		for (const { id, name, radar } of await Level1API.query()) {
			if (!radar) {
				continue;
			}

			record[id] = { id, name, level: 1, parent: level0CapabilityId };
		}

		list.push(
			...configuration.order
				.filter((id) => id in record)
				.map((id) => record[id]!),
		);
	}

	return list;
}

export const Fetch = Object.freeze({
	0: fetchLevel0,
	1: fetchLevel1,
});
