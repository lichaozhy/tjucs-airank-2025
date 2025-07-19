import * as Spec from 'src/spec';

function readJSON(response: Response) {
	return response.json();
}

function readText(response: Response) {
	return response.text();
}

const fetchAllLeaderboard = async () => {
	const leaderboardList = await fetch('/data/leaderboard.json').then(readJSON);

	return Spec.Leaderboard.Schema.array().parse(leaderboardList);
};

const fetchAllBenchmark = async () => {
	const benchmarkList = await fetch('/data/benchmark.json').then(readJSON);

	return Spec.Benchmark.Schema.array().parse(benchmarkList);
};

const fetchAllModel = async () => {
	const modelList = await fetch('/data/model.json').then(readJSON);

	return Spec.Model.Schema.array().parse(modelList);
};

const fetchAllScore = async () => {
	const scoreList = await fetch('/data/score.json').then(readJSON);

	return Spec.Score.Schema.array().parse(scoreList);
};

export type ModelPropertyRecordGroup = {
	vision: Record<string, number>;
	language: Record<string, number>;
	author: Record<string, number>;
	size: Record<string, number>;
	year: Record<string, number>;
};

export type ModelPropertyValueGroup = {
	vision: string[];
	language: string[];
	author: string[];
	size: number[];
	year: number[];
};

export const Data: {
	ModelProperty: ModelPropertyRecordGroup;
	Leaderboard: Spec.Leaderboard.Type[];
	Benchmark: Spec.Benchmark.Type[];
	Model: Spec.Model.Type[];
	Score: Spec.Score.Type[];
	Configuration: Spec.Configuration.Type;
} = {
	ModelProperty: { vision: {}, language: {}, author: {}, size: {}, year: {} },
	Leaderboard: [],
	Benchmark: [],
	Model: [],
	Score: [],
	Configuration: { DEFAULT_LEADERBOARD: '' },
};

export const Capability: {
	Item: Spec.Capability.Item[];
	Group: Spec.Capability.Group[];
	Level: {
		core: Spec.Capability.ScoreMap[];
		sub: Spec.Capability.ScoreMap[];
	};
} = {
	Item: [],
	Group: [],
	Level: {
		core: [],
		sub: [],
	},
};

export async function init() {
	Object.assign(Data, {
		Leaderboard: await fetchAllLeaderboard(),
		Benchmark: await fetchAllBenchmark(),
		Model: await fetchAllModel(),
		Score: await fetchAllScore(),
		Configuration: await (async () => {
			const configuration = await fetch('/data/configuration.json').then(
				readJSON,
			);

			return Spec.Configuration.Schema.parse(configuration);
		})(),
		ModelProperty: await (async (): Promise<ModelPropertyRecordGroup> => {
			return fetch('/data/model-property.json').then(readJSON);
		})(),
	});

	Capability.Group = await fetch('/data/capability/group.json').then(readJSON);
	Capability.Item = await fetch('/data/capability/item.json').then(readJSON);

	const Level = await fetch('/data/capability/level.json').then(readJSON);

	Capability.Level.core = Level.core;
	Capability.Level.sub = Level.sub;
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
	Summary: Object.assign((summaryId: string) => {
		return {
			async get() {
				for (const leaderboardData of Data.Leaderboard) {
					for (const summaryData of leaderboardData.summaries) {
						if (summaryData.id === summaryId) {
							return summaryData;
						}
					}
				}
			},
		};
	}, {}),
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
						return fetch(`/html/benchmark/${benchmarkId}.html`).then(readText);
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
				return [...Data.Model];
			},
			async queryHasBenchmark(benchmarkId: string) {
				return Data.Model.filter((model) =>
					Object.hasOwn(model.score.benchmark, benchmarkId),
				);
			},
			async queryHasSummary(summaryId: string) {
				return Data.Model.filter((model) =>
					Object.hasOwn(model.score.summary, summaryId),
				);
			},
			Property: {
				ValueGroup: {
					async query(): Promise<ModelPropertyValueGroup> {
						return {
							vision: Object.keys(Data.ModelProperty.vision),
							language: Object.keys(Data.ModelProperty.language),
							author: Object.keys(Data.ModelProperty.author),
							size: Object.keys(Data.ModelProperty.size).map((v) => Number(v)),
							year: Object.keys(Data.ModelProperty.year).map((v) => Number(v)),
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
	Capability: {
		Group: {
			async query() {
				return Capability.Group.map((data) => ({ ...data }));
			},
		},
		Item: {
			async query() {
				return Capability.Item.map((data) => ({ ...data }));
			},
		},
		Level: {
			Core: {
				async query() {
					return Capability.Level.core.map((data) => ({ ...data }));
				},
			},
			Sub: {
				async query() {
					return Capability.Level.sub.map((data) => ({ ...data }));
				},
			},
		},
	},
	Document: {
		Rule: {
			async get() {
				return fetch('/html/rule.html').then(readText);
			},
		},
		Guide: {
			async get() {
				return fetch('/html/guide.html').then(readText);
			},
		},
		Capability: {
			Item(id: string) {
				return {
					async get() {
						return fetch(`/html/capability/item/${id}.html`).then(readText);
					},
				};
			},
			Group(id: string) {
				return {
					async get() {
						return fetch(`/html/capability/group/${id}.html`).then(readText);
					},
				};
			},
		},
	},
};
