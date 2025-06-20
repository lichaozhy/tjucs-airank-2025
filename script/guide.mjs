import * as fs from 'node:fs';
import * as path from 'node:path';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import slugify from '@sindresorhus/slugify';
import { JSDOM } from 'jsdom';

import { Hash } from './utils.mjs';

const { dirname } = import.meta;

const PATH = {
	SOURCE: path.join(dirname, '../document/guide/README.md'),
	TARGET: {
		ASSETS: path.join(dirname, '../public/html/assets'),
		HTML: path.join(dirname, '../public/html/guide.html'),
	},
};

const MDParser = MarkdownIt({ html: true, linkify: true });

MDParser.use(MarkdownItAnchor, { slugify: s => slugify(s) });

const PUBLIC_PATH = '/html/assets/';
const documentData = await fs.promises.readFile(PATH.SOURCE, 'utf-8');
const htmlString = MDParser.render(documentData);
const DOM = new JSDOM(htmlString);
const bodyElement = DOM.window.document.body;
const missingPathname = [];

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

if (missingPathname.length > 0) {
	console.error(JSON.stringify(missingPathname, null, '  '));
	throw new Error('Files missing.');
}

await fs.promises.writeFile(PATH.TARGET.HTML, bodyElement.innerHTML);
