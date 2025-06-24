import * as fs from 'node:fs';
import * as path from 'node:path';

const { dirname } = import.meta;

const PATH = {
	SOURCE: path.join(dirname, '../public/data/model.json'),
	TARGET: path.join(dirname, '../public/data/model-property.json'),
};

const sourceData = await fs.promises.readFile(PATH.SOURCE, 'utf-8');
const modelList = JSON.parse(sourceData);

const record = {
	vision: {},
	language: {},
	author: {},
	size: {},
};

for (const model of modelList) {
	const { author, component, size } = model;

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
}

const targetData = JSON.stringify(record, null, '\t');

await fs.promises.writeFile(PATH.TARGET, targetData);
