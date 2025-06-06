import * as Benchmark from './Benchmark';
import * as Model from './Model';
import * as Score from './Score';
import * as Leaderboard from './Leaderboard';
import * as Configuration from './Configuration';

export { Benchmark, Model, Score, Leaderboard, Configuration };

import type { InjectionKey } from 'vue';

export interface SelectedRecord {
	[key: string]: boolean;
}

export const INJECTION_KEY = {
	LEADERBOARD_SUMMARY_SELECTED: Symbol() as InjectionKey<SelectedRecord>,
	LEADERBOARD_BENCHMARK_SELECTED: Symbol() as InjectionKey<SelectedRecord>,
};
