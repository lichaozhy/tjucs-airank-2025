import type { DataType, SummaryItem } from './data';

let root: DataType;

export async function init() {
	root = await import('./data.json');
}

export type ModelPropertyRecordGroup = Record<
	'vision' | 'language' | 'author' | 'size' | 'year',
	Record<string, number>
>;

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
							const indexRecord: Record<string, number> = {};

							for (const [index, { id }] of Object.entries(
								root.page.leaderboard.$data.leaderboards.find(
									({ id }) => id === leaderboardId,
								)!.summaries,
							)) {
								indexRecord[id] = Number(index);
							}

							return Object.entries(leaderboardData.summaries)
								.sort(([aId], [bId]) => indexRecord[aId]! - indexRecord[bId]!)
								.map(([id, { $data }]) => ({ id, ...$data }));
						},
					},
				),
			};
		},
		{
			async query() {
				const indexRecord: Record<string, number> = {};

				for (const [index, { id }] of Object.entries(
					root.page.leaderboard.$data.leaderboards,
				)) {
					indexRecord[id] = Number(index);
				}

				return Object.entries(root.leaderboard)
					.sort(([aId], [bId]) => indexRecord[aId]! - indexRecord[bId]!)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
		},
	),
	Summary: Object.assign((summaryId: string) => {
		return {
			async get() {
				for (const { summaries } of Object.values(root.leaderboard)) {
					for (const [id, { $data }] of Object.entries(summaries)) {
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
				return Object.entries(root.benchmark).map(([id, { $data }]) => ({
					id,
					...$data,
				}));
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
				return Object.entries(root.model).map(([id, { $data }]) => ({
					id,
					...$data,
				}));
			},
			async queryHasBenchmark(benchmarkId: string) {
				return Object.entries(root.model)
					.filter(([, { $data }]) => benchmarkId in $data.score.benchmark)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
			async queryHasSummary(summaryId: string) {
				let summary: SummaryItem;

				lb: for (const leaderboard of Object.values(root.leaderboard)) {
					for (const [id, { $data }] of Object.entries(leaderboard.summaries)) {
						if (id === summaryId) {
							summary = $data;
							break lb;
						}
					}
				}

				return Object.entries(root.model)
					.filter(([, { $data }]) => summaryId in $data.score.summary)
					.filter(([id]) => id in summary.models)
					.map(([id, { $data }]) => ({ id, ...$data }));
			},
			PropertyRecord: {
				async query(...modelIdList: string[]) {
					const record: ModelPropertyRecordGroup = {
						vision: {},
						language: {},
						author: {},
						size: {},
						year: {},
					};

					for (const { author, component, size, release } of modelIdList.map(
						(id) => root.model[id]!.$data,
					)) {
						if (Array.isArray(author)) {
							for (const value of author) {
								if (!record.author[value]) {
									record.author[value] = 0;
								}

								record.author[value] += 1;
							}
						}

						if (component !== undefined) {
							const { vision, language } = component;

							if (Array.isArray(vision)) {
								for (const value of vision) {
									if (!record.vision[value]) {
										record.vision[value] = 0;
									}

									record.vision[value] += 1;
								}
							}

							if (Array.isArray(language)) {
								for (const value of language) {
									if (!record.language[value]) {
										record.language[value] = 0;
									}

									record.language[value] += 1;
								}
							}
						}

						if (Array.isArray(size)) {
							for (const value of size) {
								if (!record.size[value]) {
									record.size[value] = 0;
								}

								record.size[value] += 1;
							}
						}

						if (release !== undefined) {
							const { year } = release;

							if (typeof year === 'number') {
								if (!record.year[year]) {
									record.year[year] = 0;
								}

								record.year[year] += 1;
							}
						}
					}

					return record;
				},
			},
		},
	),
	Capability: Object.assign(
		(capabilityId: string) => {
			const parentCapabilityData = root.capability.children[capabilityId]!;

			return Object.assign(
				(capabilityId: string) => {
					return {
						async get() {
							return parentCapabilityData.children![capabilityId]!;
						},
					};
				},
				{
					async get() {
						return {
							id: capabilityId,
							...root.capability.children[capabilityId]!.$data,
						};
					},
					async query() {
						if (!Object.hasOwn(parentCapabilityData, 'children')) {
							return [];
						}

						return Object.entries(parentCapabilityData.children!).map(
							([id, { $data }]) => ({ id, ...$data }),
						);
					},
					Configuration: {
						async get() {
							const capability = root.capability.children[capabilityId]!;

							if (!Object.hasOwn(capability, 'configuration')) {
								return null;
							}

							return {
								...root.capability.children[capabilityId]!.configuration!.$data,
							};
						},
					},
				},
			);
		},
		{
			async query() {
				return Object.entries(root.capability.children).map(
					([id, { $data }]) => ({ id, ...$data }),
				);
			},
			Configuration: {
				async get() {
					return { ...root.capability.configuration.$data };
				},
			},
		},
	),
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
								return {
									...root.page.home.profile.model.category.general.$data,
								};
							},
						},
						Embodied: {
							async get() {
								return {
									...root.page.home.profile.model.category.embodied.$data,
								};
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
			Capability: {
				async get() {
					return { ...root.page.leaderboard.capability.$data };
				},
			},
			Configuration: {
				async get() {
					return { ...root.page.leaderboard.$data };
				},
			},
		},
	},
};
