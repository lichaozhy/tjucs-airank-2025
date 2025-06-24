import * as Spec from 'src/spec';

const fetchAllLeaderboard = async () => {
	const request = await fetch('/data/leaderboard.json');
	const leaderboardList = await request.json();

	return Spec.Leaderboard.Schema.array().parse(leaderboardList);
};

const fetchAllBenchmark = async () => {
	const request = await fetch('/data/benchmark.json');
	const benchmarkList = await request.json();

	return Spec.Benchmark.Schema.array().parse(benchmarkList);
};

const fetchAllModel = async () => {
	const request = await fetch('/data/model.json');
	const modelList = await request.json();

	return Spec.Model.Schema.array().parse(modelList);
};

const fetchAllScore = async () => {
	const request = await fetch('/data/score.json');
	const scoreList = await request.json();

	return Spec.Score.Schema.array().parse(scoreList);
};

export type ModelPropertyRecordGroup = {
	vision: Record<string, number>;
	language: Record<string, number>;
	author: Record<string, number>;
	size: Record<string, number>;
}

export type ModelPropertyValueGroup = {
	vision: string[];
	language: string[];
	author: string[];
	size: number[];
}

export const Data: {
	ModelProperty: ModelPropertyRecordGroup;
	Leaderboard: Spec.Leaderboard.Type[];
	Benchmark: Spec.Benchmark.Type[];
	Model: Spec.Model.Type[];
	Score: Spec.Score.Type[];
	Configuration: Spec.Configuration.Type | null;
} = {
	ModelProperty: { vision: {}, language: {}, author: {}, size: {} },
	Leaderboard: [],
	Benchmark: [],
	Model: [],
	Score: [],
	Configuration: null,
};

export async function init() {
	Object.assign(Data, {
		Leaderboard: await fetchAllLeaderboard(),
		Benchmark: await fetchAllBenchmark(),
		Model: await fetchAllModel(),
		Score: await fetchAllScore(),
		Configuration: await (async () => {
			const request = await fetch('/data/configuration.json');
			const configuration = await request.json();

			return Spec.Configuration.Schema.parse(configuration);
		})(),
		ModelProperty: await (async (): Promise<ModelPropertyRecordGroup> => {
			return fetch('/data/model-property.json').then(res => res.json());
		})(),
	});
}

export const API = {
	Configuration: {
		async get() {
			return Data.Configuration;
		},
	},
	Leaderboard: Object.assign(
		(leaderboardId: string) => {
			const leaderboard = Data.Leaderboard.find(
				function idMatched(leaderboard) {
					return leaderboard.id === leaderboardId;
				},
			)!;

			return {
				async get() {
					return leaderboard;
				},
				Benchmark: {
					async query() {
						return Data.Benchmark.filter(
							(benchmark) => benchmark.leaderboard === leaderboardId,
						);
					},
				},
				Summary: Object.assign(
					(summaryId: string) => {
						const summary = leaderboard.summaries.find(
							({ id }) => id === summaryId,
						);

						return {
							async get() {
								return summary;
							},
						};
					},
					{
						async query() {
							return leaderboard.summaries;
						},
					},
				),
			};
		},
		{
			async query() {
				return Promise.resolve(Data.Leaderboard);
			},
		},
	),
	Benchmark: Object.assign(
		(benchmarkId: string) => {
			return {
				async get() {
					return Data.Benchmark.find(
						(benchmark) => benchmark.id === benchmarkId,
					)!;
				},
				Document: {
					async get() {
						const response = await fetch(`/html/benchmark/${benchmarkId}.html`);

						return response.text();
					},
				},
				Score: {
					async query() {
						return Data.Score.filter(
							(score) => score.benchmark === benchmarkId,
						);
					},
				},
			};
		},
		{
			async query() {
				return Data.Benchmark;
			},
		},
	),
	Model: Object.assign(
		(modelId: string) => {
			return {
				async get() {
					return Data.Model.find((model) => model.id === modelId)!;
				},
				Score: {
					async query() {
						return Data.Score.filter((score) => score.model === modelId);
					},
				},
			};
		},
		{
			async query() {
				return Data.Model;
			},
			Property: {
				ValueGroup: {
					async query(): Promise<ModelPropertyValueGroup> {
						return {
							vision: Object.keys(Data.ModelProperty.vision),
							language: Object.keys(Data.ModelProperty.language),
							author: Object.keys(Data.ModelProperty.author),
							size: Object.keys(Data.ModelProperty.size).map(v => Number(v)),
						};
					},
				},
			},
		},
	),
	Score: Object.assign({
		async query() {
			return Data.Score;
		},
	}),
	Document: {
		Rule: {
			async get() {
				return fetch('/html/rule.html').then(res => res.text());
			},
		},
		Guide: {
			async get() {
				return fetch('/html/guide.html').then(res => res.text());
			},
		},
	},
};
