import * as fs from 'node:fs';
import * as path from 'node:path';

import { ensureDirectory, PATH, writeFile } from './utils.mjs';
import * as MD from './markdown.mjs';

if (fs.existsSync(PATH.TARGET.HTML)) {
	fs.rmSync(PATH.TARGET.HTML, { recursive: true });
}

ensureDirectory(PATH.TARGET.ASSETS);
ensureDirectory(PATH.TARGET.HTML);

const documentDirnameList = [];

(function visitDirname(dirname) {
	for (const dirent of fs.readdirSync(dirname, { withFileTypes: true })) {
		if (dirent.isFile() && dirent.name === 'README.md') {
			documentDirnameList.push(dirent.parentPath);
		}

		if (dirent.isDirectory()) {
			visitDirname(path.join(dirent.parentPath, dirent.name));
		}
	}
})(PATH.DOCUMENT);

const dataRoot = {};

for (const dirname of documentDirnameList) {
	try {
		await MD.toHTML(dirname, dataRoot);
	} catch (error) {
		console.log(dirname);
		throw error;
	}
}

if (MD.missingPathname.length > 0) {
	console.error(JSON.stringify(MD.missingPathname, null, '  '));
	throw new Error('Files missing.');
}

writeFile(PATH.TARGET.DATA, JSON.stringify(dataRoot));
