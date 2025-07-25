/* eslint-disable @typescript-eslint/no-empty-object-type */
export type ScoreValueList = (number | null)[];

interface DateInfo {
	year: number;
	month: number | null;
	date: number | null;
}

interface ReleasedInfo {
	at: DateInfo;
}

export interface BenchmarkProperty {
	order: number;
	index: number;
	label: string;
	unit: string | null;
}

interface DataItem {
	leaderboard: string;
	name: string;
	description: string;
	organization: string;
	released: ReleasedInfo;
	repository: string | null;
	huggingface: string | null;
	website: string | null;
	default: {
		property: string;
	};
	capabilities: string[];
	properties: {
		[key: string]: BenchmarkProperty;
	};
	id?: string;
}

interface BenchmarkItem {
	profile: {
		$data: {};
	};
	$data: DataItem;
}

interface Benchmark {
	[key: string]: BenchmarkItem;
}

interface CapabilityItem {
	$data: {
		name: string;
		index: number;
	};
}

interface ConfigurationItem {
	$data: {
		order: string[];
	};
}

interface CapabilityItem {
	children?: {
		[key: string]: CapabilityItem;
	};
	configuration?: ConfigurationItem;
	$data: CapabilityItem;
}

interface CapabilityChildren {
	[key: string]: CapabilityItem;
}

export type CapabilityLevel = 0 | 1;

interface Capability {
	children: CapabilityChildren;
	configuration: {
		$data: {
			order: string[];
			level: Record<CapabilityLevel, string>
		};
	};
}

export interface SummaryItem {
	name: string;
	properties: {
		type: string;
		label: string;
		ref?: {
			benchmark: string;
			key: string;
		}
	}[];
	models: {
		[modelId: string]: boolean;
	};
}

interface LeaderboardItem {
	$data: {
		name: string;
	};
	summaries: {
		[summaryId: string]: {
			$data: SummaryItem;
		};
	};
}

interface Leaderboard {
	[key: string]: LeaderboardItem;
}

export interface Model {
	name: string;
	component?: {
		vision?: string[];
		language?: string[];
	};
	size?: number[];
	author?: string[];
	qa?: string[];
	dimension?: string[];
	website?: string;
	navigation: boolean;
	taskPlanning: boolean;
	reason: boolean;
	opensource: boolean;
	release?: {
		year: number;
	};
	imageVideo?: string;
	score: {
		benchmark: {
			[benchmarkId: string]: {
				0?: ScoreValueList;
				1?: ScoreValueList;
				legacy?: ScoreValueList;
			};
		};
		summary: {
			[summaryId: string]: {
				0?: ScoreValueList;
				1?: ScoreValueList;
				legacy?: ScoreValueList;
			};
		};
	};
}

interface PageHomeModelProfileCategoryData {
	id: string;
	label: string;
	icon: string;
	itemList: {
		organizationList: string[];
		modelList: string[];
	}[];
}

export interface DataType {
	benchmark: Benchmark;
	capability: Capability;
	configuration: {
		$data: {
			DEFAULT_LEADERBOARD: string;
		};
	};
	guide: {
		$data: {};
	};
	leaderboard: Leaderboard;
	model: {
		[key: string]: { $data: Model };
	};
	page: {
		leaderboard: {
			task: {
				$data: {
					banner: {
						title: string;
						navigation: {
							label: string;
							caption: string;
						}
					}
				};
			};
			capability: {
				$data: {
					banner: {
						title: string;
						navigation: {
							label: string;
							caption: string;
						}
					}
				};
			};
			$data: {
				leaderboards: {
					id: string;
					summaries: { id: string }[];
				}[];
			}
		};
		home: {
			banner: {
				$data: {
					title: string;
					subtitle: string;
					slogan: string;
				}
			},
			citation: {
				$data: {};
			},
			contributor: {
				$data: {
					title: {
						emphasized: boolean;
						text: string;
					}[];
					personList: {
						at: number[];
						0: boolean;
						name: string;
					}[];
					organizationList: string[];
				}
			},
			evaluation: {
				$data: {
					title: string;
				}
			},
			profile: {
				benchmark: {
					$data: {
						title: string;
					};
					leaderboard: {
						$data: {
							title: string;
							list: {
								id: string;
								icon: string;
							}[];
						};
					};
				},
				model: {
					category: {
						embodied: {
							$data: PageHomeModelProfileCategoryData;
						};
						general: {
							$data: PageHomeModelProfileCategoryData
						}
					};
					detail: {
						$data: {
							title: string;
						};
					};
					$data: {
						title: string;
					};
				},
				capability: {
					detail: {
						$data: {
							title: string;
						}
					};
					mapping: {
						$data: {
							title: string;
						}
					};
					$data: {
						title: string;
						itemList: {
							id: string;
							icon: string;
						}[];
					};
				};
			};
			feature: {
				$data: {
					title: string;
					features: {
						icon: string;
						title: string;
						description: string;
					}[]
				}
			}
		};
	};
	rule: {
		$data: {};
  };
}
