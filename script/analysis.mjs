import * as fs from 'node:fs';
import * as path from 'node:path';
import * as YAML from 'js-yaml';

import { PATH, writeFile } from './utils.mjs';

const { dirname: __dirname } = import.meta;

function readJSON(pathname) {
	const fileData = fs.readFileSync(pathname, 'utf-8');

	return JSON.parse(fileData);
}

function writeDocumentYAML(dirname, object) {
	writeFile(path.join(dirname, 'README.md'), `---\n${YAML.dump(object)}---\n`);
}

/**
 * @type {typeof import('../src/data.json')}
 */
const dataRoot = readJSON(PATH.TARGET.DATA);

const summaries = {};
const benchmarks = {};
const models = {};
const benchmarksInSummarires = {};

const capability = {
	0: { items: {}, indexToItems: [] },
	1: { items: {}, indexToItems: [] },
};

const radar = {
	0: { summary: {}, benchmark: {} },
	1: { summary: {}, benchmark: {} },
};

for (const [leaderboardId, leaderboard] of Object.entries(dataRoot.leaderboard)) {
	for (const [summaryId, { $data: summaryData }] of Object.entries(leaderboard.summaries)) {
		summaries[summaryId] = { id: summaryId, ...summaryData, leaderboardId };

		radar[0].summary[summaryId] = new Array(8).fill('_');
		radar[1].summary[summaryId] = new Array(25).fill('_');

		for (const property of summaryData.properties) {
			if (property.type === 'reference') {
				benchmarksInSummarires[property.ref.benchmark] = summaryId;
			}
		}
	}
}

for (const [benchmarkId, { $data: benchmarkData }] of Object.entries(dataRoot.benchmark)) {
	benchmarks[benchmarkId] = { id: benchmarkId, ...benchmarkData };

	radar[0].benchmark[benchmarkId] = new Array(8).fill('_');
	radar[1].benchmark[benchmarkId] = new Array(25).fill('_');
}

for (const [itemId, { $data: itemData, children }] of Object.entries(dataRoot.capability.children)) {
	const item = { id: itemId, ...itemData };

	capability[0].items[itemId] = { id: itemId, ...itemData };
	capability[0].indexToItems[itemData.index] = item;

	if (children === undefined) {
		continue;
	}

	for (const [itemId, { $data: itemData }] of Object.entries(children)) {
		const item = { id: itemId, ...itemData };

		capability[1].items[itemId] = { id: itemId, ...itemData };
		capability[1].indexToItems[itemData.index] = item;
	}
}

for (const [modelId, { $data: modelData }] of Object.entries(dataRoot.model)) {
	models[modelId] = { id: modelId, ...modelData };

	for (const [benchmarkId, group] of Object.entries(modelData.score.benchmark)) {
		if (group[0]) {
			for (const [index, value] of Object.entries(group[0])) {
				if (typeof value === 'number') {
					radar[0].benchmark[benchmarkId][index] = '#';
				}
			}
		}

		if (group[1]) {
			for (const [index, value] of Object.entries(group[1])) {
				if (typeof value === 'number') {
					radar[1].benchmark[benchmarkId][index] = '#';
				}
			}
		}
	}

	for (const [summaryId, group] of Object.entries(modelData.score.summary)) {
		if (group[0]) {
			for (const [index, value] of Object.entries(group[0])) {
				if (typeof value === 'number') {
					radar[0].summary[summaryId][index] = '#';
				}
			}
		}

		if (group[1]) {
			for (const [index, value] of Object.entries(group[1])) {
				if (typeof value === 'number') {
					radar[1].summary[summaryId][index] = '#';
				}
			}
		}
	}
}

const text = [];

text.push('\nCapability Level 0 Benchmark');
text.push(['name'.padEnd(16), ...new Array(8).fill(1).map((_, i) => i)].join('|'));

for (const [id, list] of Object.entries(radar[0].benchmark)) {
	text.push([benchmarks[id].name.padEnd(16), ...list].join('|'));
}

text.push('\nCapability Level 1 Benchmark');
text.push(['name'.padEnd(16), ...new Array(25).fill(1).map((_, i) => i % 10)].join('|'));

for (const [id, list] of Object.entries(radar[1].benchmark)) {
	text.push([benchmarks[id].name.padEnd(16), ...list].join('|'));
}

text.push('\nCapability Level 0 Summary');
text.push(['name'.padEnd(56), ...new Array(8).fill(1).map((_, i) => i)].join('|'));

for (const [id, list] of Object.entries(radar[0].summary)) {
	text.push([summaries[id].name.padEnd(56), ...list].join('|'));
}

text.push('\nCapability Level 1 Summary');
text.push(['name'.padEnd(56), ...new Array(25).fill(1).map((_, i) => i % 10)].join('|'));

for (const [id, list] of Object.entries(radar[1].summary)) {
	text.push([summaries[id].name.padEnd(56), ...list].join('|'));
}

console.log(text.join('\n'));

for (const benchmarkId in benchmarks) {
	const configuration = { 0: {}, 1: {} };

	for (const [index, value] of Object.entries(radar[0].benchmark[benchmarkId]).slice(0, 7)) {
		if (value === '#') {
			configuration[0][capability[0].indexToItems[index].id] = true;
		}
	}

	for (const [index, value] of Object.entries(radar[1].benchmark[benchmarkId])) {
		if (value === '#') {
			configuration[1][capability[1].indexToItems[index].id] = true;
		}
	}

	const dirname = path.join(__dirname, '../document/benchmark', benchmarkId, 'capability');

	writeDocumentYAML(dirname, configuration);
}

console.log(text.join('\n'));

for (const summaryId in summaries) {
	const configuration = { 0: {}, 1: {} };

	for (const [index, value] of Object.entries(radar[0].summary[summaryId]).slice(0, 7)) {
		if (value === '#') {
			configuration[0][capability[0].indexToItems[index].id] = true;
		}
	}

	for (const [index, value] of Object.entries(radar[1].summary[summaryId])) {
		if (value === '#') {
			configuration[1][capability[1].indexToItems[index].id] = true;
		}
	}

	const dirname = path.join(
		__dirname, '../document/leaderboard',
		summaries[summaryId].leaderboardId,
		'summaries', summaryId, 'capability',
	);

	writeDocumentYAML(dirname, configuration);
}
