import type * as Type from './type';
import { ref } from 'vue';
import * as Backend from 'src/backend';

const Fetcher = {
	benchmark: (id: string) => Backend.API.Benchmark(id).get(),
	summary: (id: string) => Backend.API.Summary(id).get(),
};

const ModelFetcher = {
	benchmark: (id: string) => Backend.API.Model.queryHasBenchmark(id),
	summary: (id: string) => Backend.API.Model.queryHasSummary(id),
};

const CapabilityFetcher = {
	benchmark: (id: string) => Backend.API.Benchmark(id).Capability.get(),
	summary: (id: string) => Backend.API.Summary(id).Capatiliby.get(),
};

export function useSource(source: Type.SourceScoreModel) {
	const abstract = ref<Type.SourceAbstract>({ name: '' });

	async function fetchAbstract() {
		const data = await Fetcher[source.type](source.id);

		abstract.value = { name: data.name };
	}

	async function fetchModelList() {
		return ModelFetcher[source.type](source.id);
	}

	async function fetchCapability(level: 0 | 1) {
		const record = await CapabilityFetcher[source.type](source.id);

		return record[level];
	}

	return {
		abstract,
		fetchAbstract,
		fetchModelList,
		fetchCapability,
	};
}
