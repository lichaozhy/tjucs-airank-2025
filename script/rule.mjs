import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import { JSDOM } from 'jsdom';

const { dirname } = import.meta;

function Hash(buffer) {
	const hash = crypto.createHash('MD5');

	hash.update(buffer);

	return hash.digest('hex');
}

const PATH = {
	SOURCE: path.join(dirname, '../document/rule/README.md'),
	TARGET: {
		ASSETS: path.join(dirname, '../public/html/assets'),
		HTML: path.join(dirname, '../public/html/rule.html'),
	},
};

const MDParser = MarkdownIt({ html: true, linkify: true });

MDParser.use(MarkdownItAnchor);

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
