import * as fs from 'node:fs';
import { PATH, writeFile } from './utils.mjs';

function readJSON(pathname) {
	const fileData = fs.readFileSync(pathname, 'utf-8');

	return JSON.parse(fileData);
}

/**
 * @type {typeof import('../src/data.json')}
 */
const dataRoot = readJSON(PATH.TARGET.DATA);

function avg(a) {
	let length = 0, sum = 0;

	for (const n of a) {
		if (typeof n !== 'number') {
			continue;
		}

		length++;
		sum += n;
	}

	return length === 0 ? null : Number((sum / length).toFixed(2));
}

function random100() {
	return Number((Math.random() * 100).toFixed(2));
}

const sumds = {};
const bm_sumo = {};

function computeSummary() {
	for (const { summaries } of Object.values(dataRoot.leaderboard)) {
		for (const [sum_id, { $data: sum }] of Object.entries(summaries)) {
			sumds[sum_id] = sum;

			for (const { type, ref } of sum.properties) {
				if (type === 'reference') {
					if (ref.benchmark in bm_sumo) {
						debugger;
					}

					bm_sumo[ref.benchmark] = {
						p: ref.key,
						id: sum_id,
						i: dataRoot.benchmark[ref.benchmark].$data.properties[ref.key].index,
					};
				}
			}
		}
	}

	for (const [m_id, { $data: m }] of Object.entries(dataRoot.model)) {
		const sum_ids = {};

		for (const bm_id in m.score.benchmark) {
			if (bm_sumo[bm_id] === undefined) {
				console.log(`Benchmark(${bm_id}) is NOT in any summary.`);
				continue;
			}

			sum_ids[bm_sumo[bm_id].id] = true;
		}

		if (Object.keys(sum_ids).length === 0) {
			continue;
		}

		const sums = {};

		for (const sum_id in sum_ids) {
			const r = sums[sum_id] = Object.assign({}, m.score.summary[sum_id]);
			const s_list = r.legacy = [];

			for (const [index, p] of Object.entries(sumds[sum_id].properties)) {
				if (p.type === 'reference') {
					const { benchmark: bm_id } = p.ref;
					const bm_r = m.score.benchmark[bm_id];

					try {
						if (bm_r === undefined || bm_r.legacy === undefined) {
							s_list[index] = null;
						} else {
							s_list[index] = bm_r.legacy[bm_sumo[bm_id].i];
						}
					} catch (e) {
						console.log(e);
						debugger;
					}
				}
			}

			for (const [index, p] of Object.entries(sumds[sum_id].properties)) {
				if (p.type === 'computed') {
					s_list[index] = avg(s_list);
				}
			}
		}

		m.score.summary = sums;
	}
}

function computeCapabilityLevel0Total() {
	for (const { $data } of Object.values(dataRoot.model)) {
		for (const namespace of Object.values($data.score)) {
			if (namespace === undefined || namespace === null) {
				debugger;
			}

			for (const scoreGroup of Object.values(namespace)) {
				if (Object.hasOwn(scoreGroup, '0')) {
					scoreGroup[0][7] = avg(scoreGroup[0].slice(0, 7));
				}
			}
		}
	}
}

function toFixedAllScoreTable(factionDigital = 2) {
	for (const { $data } of Object.values(dataRoot.model)) {
		for (const namespace of Object.values($data.score)) {
			for (const scoreGroup of Object.values(namespace)) {
				for (const scoreList of Object.values(scoreGroup)) {
					scoreList.forEach((v, i) => {
						scoreList[i] = v === null || v === undefined
							? null : Number(v.toFixed(factionDigital));
					});
				}
			}
		}
	}
}

computeSummary();
computeCapabilityLevel0Total();
toFixedAllScoreTable(2);

writeFile(PATH.TARGET.DATA, JSON.stringify(dataRoot));
