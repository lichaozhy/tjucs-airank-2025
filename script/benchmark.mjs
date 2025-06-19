import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';

import { ensureDirectory, Hash } from './utils.mjs';

const { dirname } = import.meta;


const PATH = {
	SOURCE: {
		DIRECTORY: path.join(dirname, '../document/benchmark'),
	},
	TARGET: {
		ASSETS: path.join(dirname, '../public/html/assets'),
		METADATA: path.join(dirname, '../public/data/benchmark.json'),
		HTML: path.join(dirname, '../public/html/benchmark'),
	},
};

const PUBLIC_PATH = '/html/assets/';

await ensureDirectory(PATH.TARGET.ASSETS);
await ensureDirectory(PATH.TARGET.HTML);

const MDParser = MarkdownIt({ html: true, linkify: true });

const benchmarkDataList = [];
const missingPathname = [];

for (const dirent of await fs.promises.readdir(PATH.SOURCE.DIRECTORY, {
	withFileTypes: true,
})) {
	const dirname = path.join(PATH.SOURCE.DIRECTORY, dirent.name);
	const pathname = path.join(dirname, 'README.md');
	const { data, content } = matter(await fs.promises.readFile(pathname, 'utf-8'));
	const DOM = new JSDOM(MDParser.render(content));
	const htmlPathname = path.join(PATH.TARGET.HTML, `${dirent.name}.html`);
	const bodyElement = DOM.window.document.body;

	for (const imageElement of bodyElement.querySelectorAll('img')) {
		const { src } = imageElement;
		const sourcePathname = path.join(dirname, src);

		if (!fs.existsSync(sourcePathname)) {
			missingPathname.push(sourcePathname);
			continue;
		}

		const buffer = await fs.promises.readFile(sourcePathname);
		const hash = Hash(buffer);
		const extname = path.extname(src);
		const filename = `${hash}${extname}`;
		const destinationPathname = path.join(PATH.TARGET.ASSETS, filename);

		imageElement.src = `${PUBLIC_PATH}${filename}`;
		await fs.promises.writeFile(destinationPathname, buffer);
	}

	benchmarkDataList.push({ id: dirent.name, ...data });
	await fs.promises.writeFile(htmlPathname, bodyElement.innerHTML);
}

const benchmarkFileData = JSON.stringify(benchmarkDataList, null, '\t');

await fs.promises.writeFile(PATH.TARGET.METADATA, benchmarkFileData);

if (missingPathname.length > 0) {
	console.error(JSON.stringify(missingPathname, null, '  '));
	throw new Error('Files missing.');
}
