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

export function useSource(source: Type.SourceScoreModel) {
	const abstract = ref<Type.SourceAbstract>({ name: '' });

	async function fetchAbstract() {
		const data = await Fetcher[source.type](source.id);

		abstract.value = { name: data.name };
	}

	async function fetchModelList() {
		return ModelFetcher[source.type](source.id);
	}

	return { abstract, fetchAbstract, fetchModelList };
}
