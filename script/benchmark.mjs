import * as fs from 'node:fs';
import * as path from 'node:path';

import * as MD from './markdown.mjs';
import { ensureDirectory } from './utils.mjs';
const { dirname } = import.meta;

const PATH = {
	SOURCE: {
		DIRECTORY: path.join(dirname, '../document/benchmark'),
	},
	TARGET: {
		HTML: path.join(dirname, '../public/html/benchmark'),
		METADATA: path.join(dirname, '../public/data/benchmark.json'),
	},
};

await ensureDirectory(PATH.TARGET.HTML);

const benchmarkDataList = [];

for (const dirent of fs.readdirSync(PATH.SOURCE.DIRECTORY, {
	withFileTypes: true,
})) {
	const dirname = path.join(PATH.SOURCE.DIRECTORY, dirent.name);

	await MD.toHTML(dirname, data => benchmarkDataList.push(data));
}

const benchmarkFileData = JSON.stringify(benchmarkDataList, null, '\t');

fs.writeFileSync(PATH.TARGET.METADATA, benchmarkFileData);
