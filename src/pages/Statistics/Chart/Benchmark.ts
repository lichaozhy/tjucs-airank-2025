import * as Backend from 'src/backend';

export interface Property {
	key: string;
	label: string;
}

export interface Abstract {
	id: string;
	name: string;
	propertyList: Property[];
	statistics: {
		properties: Record<string, number>;
		capabilities: Record<string, number>;
	};
}

export async function fetch(benchmarkId: string): Promise<Abstract> {
	const BenchmarkAPI = Backend.API.Benchmark(benchmarkId);
	const { id, name, properties } = await BenchmarkAPI.get();
	const statistics = await BenchmarkAPI.Statistics.get();

	return {
		id,
		name,
		statistics,
		propertyList: Object.entries(properties)
			.filter(([key]) => key in statistics.properties)
			.sort(([, a], [, b]) => a.index - b.index)
			.map(([key, { label }]) => ({ key, label })),
	};
}
