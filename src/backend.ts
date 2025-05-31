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

const fetchConfiguration = async () => {
	const request = await fetch('/data/configuration.json');
	const configuration = await request.json();
	return Spec.Configuration.Schema.parse(configuration);
};

export const API = {
	Configuration: {
		async get() {
			return fetchConfiguration();
		},
	},
	Leaderboard: Object.assign(
		(id: string) => {
			console.log(id);

			return {
				async get() {
					const leaderboardList = await fetchAllLeaderboard();
					return leaderboardList.find((leaderboard) => leaderboard.id === id);
				},
				Benchmark: {
					async query() {
						const benchmarkList = await fetchAllBenchmark();
						return benchmarkList.filter((benchmark) => benchmark.leaderboard === id);
					},
				},
			};
		},
		{
			async query() {
				const leaderboardList = await fetchAllLeaderboard();
				return leaderboardList;
			},
		},
	),
	Benchmark: Object.assign(
		(benchmarkId: string) => {
			return {
				async get() {
					const benchmarkList = await fetchAllBenchmark();
					return benchmarkList.find((benchmark) => benchmark.id === benchmarkId)!;
				},
				Score: {
					async query() {
						const scoreList = await fetchAllScore();
						return scoreList.filter((score) => score.benchmark === benchmarkId);
					},
				},
			};
		},
		{
			async query() {
				const benchmarkList = await fetchAllBenchmark();
				return benchmarkList;
			},
		},
	),
	Model: Object.assign(
		(modelId: string) => {
			return {
				async get() {
					const modelList = await fetchAllModel();
					return modelList.find((model) => model.id === modelId)!;
				},
			};
		},
		{
			async query() {
				const modelList = await fetchAllModel();
				return modelList;
			},
		},
	),
	Score: Object.assign({
		async query() {
			const scoreList = await fetchAllScore();
			return scoreList;
		},
	}),
};
