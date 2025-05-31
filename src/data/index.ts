import configurationData from '../../public/data/configuration.json';
import leaderboardData from '../../public/data/leaderboard.json';
import benchmarkData from '../../public/data/benchmark.json';
import modelData from '../../public/data/model.json';
import scoreData from '../../public/data/score.json';

import * as Spec from '../spec';

export const data = {
	configuration: Spec.Configuration.Schema.parse(configurationData),
	leaderboard: Spec.Leaderboard.Schema.array().parse(leaderboardData),
	benchmark: Spec.Benchmark.Schema.array().parse(benchmarkData),
	model: Spec.Model.Schema.array().parse(modelData),
	score: Spec.Score.Schema.array().parse(scoreData),
};
