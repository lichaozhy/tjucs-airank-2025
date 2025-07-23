import type { DataType } from './data';
const root: DataType = await import('./data.json');

function readText(response: Response) {
	return response.text();
}

export const API = {
	Configuration: {
		async get() {
			return root.configuration.$data;
		},
	},
	Leaderboard: Object.assign(
		(leaderboardId: string) => {
			const leaderboardData = root.leaderboard[leaderboardId]!;

			return {
				async get() {
					return { id: leaderboardId, ...leaderboardData.$data };
				},
				Benchmark: {
					async query() {
						return Object.entries(root.benchmark)
							.filter(([, { $data }]) => $data.leaderboard === leaderboardId)
							.map(([id, { $data }]) => ({ id, ...$data }));
					},
				},
				Summary: Object.assign(
					(summaryId: string) => {
						return {
							async get() {
								return {
									id: summaryId,
									...leaderboardData.summaries[summaryId]!.$data,
								};
							},
						};
					},
					{
						async query() {
							return Object.entries(leaderboardData.summaries)
								.map(([id, { $data }]) => ({ id, ...$data }));
						},
					},
				),
			};
		},
		{
			async query() {
				return Object.entries(root.leaderboard)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
		},
	),
	Summary: Object.assign((summaryId: string) => {
		return {
			async get() {
				for (const { summaries } of Object.values(root.leaderboard)) {
					for (const [id, { $data } ] of Object.entries(summaries)) {
						if (id === summaryId) {
							return { id, ...$data };
						}
					}
				}

				throw new Error('Not Found');
			},
		};
	}, {}),
	Benchmark: Object.assign(
		(benchmarkId: string) => {
			return {
				async get() {
					return { id: benchmarkId, ...root.benchmark[benchmarkId]!.$data };
				},
			};
		},
		{
			async query() {
				return Object.entries(root.benchmark)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
		},
	),
	Model: Object.assign(
		(modelId: string) => {
			return {
				async get() {
					return { id: modelId, ...root.model[modelId]!.$data };
				},
				Score: {
					async query() {
						return root.model[modelId]!.$data.score;
					},
				},
			};
		},
		{
			async query() {
				return Object.entries(root.model)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
			async queryHasBenchmark(benchmarkId: string) {
				return Object.entries(root.model)
					.filter(([, { $data }]) => benchmarkId in $data.score.benchmark)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
			async queryHasSummary(summaryId: string) {
				return Object.entries(root.model)
					.filter(([, { $data }]) => summaryId in $data.score)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
		},
	),
	Capability: Object.assign((capabilityId: string) => {
		const parentCapabilityData = root.capability.children[capabilityId]!;

		return Object.assign((capabilityId: string) => {
			return parentCapabilityData.children![capabilityId];
		}, {
			async query() {
				if (!Object.hasOwn(parentCapabilityData, 'children')) {
					return [];
				}

				return Object.entries(parentCapabilityData.children!)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
		});
	}, {
		async query() {
			return Object.entries(root.capability.children)
				.map(([id, { $data }]) => ({ id, ...$data }));
		},
	}),
	Document: {
		async read(pathname: string) {
			return fetch(`/html/${pathname}.html`).then(readText);
		},
	},
	Page: {
		Home: {
			Banner: {
				async get() {
					return { ...root.page.home.banner.$data };
				},
			},
			Feature: {
				async get() {
					return { ...root.page.home.feature.$data };
				},
			},
			Evaluation: {
				async get() {
					return { ...root.page.home.evaluation.$data };
				},
			},
			Contributor: {
				async get() {
					return { ...root.page.home.contributor.$data };
				},
			},
			Profile: {
				Benchmark: {
					async get() {
						return { ...root.page.home.profile.benchmark.$data };
					},
					Leaderboard: {
						async get() {
							return { ...root.page.home.profile.benchmark.leaderboard.$data };
						},
					},
				},
				Model: {
					async get() {
						return { ...root.page.home.profile.model.$data };
					},
					Detail: {
						async get() {
							return { ...root.page.home.profile.model.detail.$data };
						},
					},
					Category: {
						General: {
							async get() {
								return { ...root.page.home.profile.model.category.general.$data };
							},
						},
						Embodied: {
							async get() {
								return { ...root.page.home.profile.model.category.embodied.$data };
							},
						},
					},
				},
				Capability: {
					Detail: {
						async get() {
							return { ...root.page.home.profile.capability.detail.$data };
						},
					},
					Mapping: {
						async get() {
							return { ...root.page.home.profile.capability.mapping.$data };
						},
					},
					async get() {
						return { ...root.page.home.profile.capability.$data };
					},
				},
			},
		},
		Leaderboard: {
			Task: {
				async get() {
					return { ...root.page.leaderboard.task.$data };
				},
			},
		},
	},
};
