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

export const Data: {
	Leaderboard: Spec.Leaderboard.Type[];
	Benchmark: Spec.Benchmark.Type[];
	Model: Spec.Model.Type[];
	Score: Spec.Score.Type[];
	Configuration: Spec.Configuration.Type | null;
} = {
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
			const leaderboard = Data.Leaderboard.find(function idMatched(leaderboard) {
				return leaderboard.id === leaderboardId;
			})!;

			return {
				async get() {
					return leaderboard;
				},
				Benchmark: {
					async query() {
						return Data.Benchmark.filter((benchmark) => benchmark.leaderboard === leaderboardId);
					},
				},
				Summary: Object.assign(
					(summaryId: string) => {
						const summary = leaderboard.summaries.find(({ id }) => id === summaryId);

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
					return Data.Benchmark.find((benchmark) => benchmark.id === benchmarkId)!;
				},
				Document: {
					async get() {
						const response = await fetch(`/html/benchmark/${benchmarkId}.html`);

						return response.text();
					},
				},
				Score: {
					async query() {
						return Data.Score.filter((score) => score.benchmark === benchmarkId);
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
		},
	),
	Score: Object.assign({
		async query() {
			return Data.Score;
		},
	}),
};
