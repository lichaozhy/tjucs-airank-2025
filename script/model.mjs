import * as fs from 'node:fs';
import * as path from 'node:path';

const { dirname } = import.meta;

const PATH = {
	MODEL: path.join(dirname, '../public/data/model.json'),
	PROPERTY: path.join(dirname, '../public/data/model-property.json'),
};

const modelList = JSON.parse(await fs.promises.readFile(PATH.MODEL, 'utf-8'));

const record = {
	vision: {},
	language: {},
	author: {},
	size: {},
	year: {},
};

for (const modelData of modelList) {
	const { author, component, size, release } = modelData;

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

	for (const categoryName in modelData.score) {
		const recordOfId2ScoreListGroup = modelData.score[categoryName];

		for (const id in recordOfId2ScoreListGroup) {
			let sum = 0, count = 0;
			const coreScoreList = recordOfId2ScoreListGroup[id].core;

			for (const value of coreScoreList.slice(0, 7)) {
				if (value !== null) {
					sum += value;
					count++;
				}
			}

			coreScoreList[7] = count === 0 ? null : sum / count;
		}
	}
}

await fs.promises.writeFile(PATH.MODEL, JSON.stringify(modelList, null, '\t'));
await fs.promises.writeFile(PATH.PROPERTY, JSON.stringify(record, null, '\t'));
