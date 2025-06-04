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

const Data = {
	Leaderboard: await fetchAllLeaderboard(),
	Benchmark: await fetchAllBenchmark(),
	Model: await fetchAllModel(),
	Score: await fetchAllScore(),
};

export const API = {
	Configuration: {
		async get() {
			const request = await fetch('/data/configuration.json');
			const configuration = await request.json();

			return Spec.Configuration.Schema.parse(configuration);
		},
	},
	Leaderboard: Object.assign(
		(leaderboardId: string) => {
			return {
				async get() {
					return Data.Leaderboard.find(leaderboard => leaderboard.id === leaderboardId)!;
				},
				Benchmark: {
					async query() {
						return Data.Benchmark.filter(benchmark => benchmark.leaderboard === leaderboardId);
					},
				},
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
						return Data.Score.filter(score => score.model === modelId);
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
