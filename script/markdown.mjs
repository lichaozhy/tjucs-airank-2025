import * as fs from 'node:fs';
import * as path from 'node:path';

import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import MarkdownIt from 'markdown-it';
import markdownItMathTemml from 'markdown-it-math/temml';
import MarkdownItAnchor from 'markdown-it-anchor';
import slugify from '@sindresorhus/slugify';

import { Hash } from './utils.mjs';

const { dirname } = import.meta;
const PUBLIC_PATH = '/html/assets/';
const REPO_BASE_URL = 'https://github.com/lichaozhy/tjucs-airank-2025/tree/main/';
export const parser = MarkdownIt({ html: true, linkify: true });

parser.use(markdownItMathTemml);
parser.use(MarkdownItAnchor, { slugify: s => slugify(s) });

const PATH = {
	WORKSPACE: path.join(dirname, '../'),
	TARGET: {
		HTML: path.join(dirname, '../public/html/benchmark'),
		ASSETS: path.join(dirname, '../public/html/assets'),
	},
};

export const missingPathname = [];

export async function toHTML(dirname, emitData = () => {}) {
	const id = path.basename(dirname);
	const pathname = path.join(dirname, 'README.md');
	const { data, content } = matter(fs.readFileSync(pathname, 'utf-8'));
	const DOM = new JSDOM(parser.render(content));
	const htmlPathname = path.join(PATH.TARGET.HTML, `${id}.html`);
	const bodyElement = DOM.window.document.body;

	const sourceURLElement = DOM.window.document.createElement('a');
	const posixPathname = path.relative(PATH.WORKSPACE, pathname).replaceAll('\\', '/');

	sourceURLElement.setAttribute('href', path.posix.join(REPO_BASE_URL, posixPathname));
	sourceURLElement.setAttribute('target', '_blank');
	sourceURLElement.id = 'app-markdown-source-url';
	sourceURLElement.innerHTML = posixPathname;
	bodyElement.appendChild(sourceURLElement);

	for (const imageElement of bodyElement.querySelectorAll('img')) {
		const { src } = imageElement;
		const sourcePathname = path.join(dirname, src);

		if (!fs.existsSync(sourcePathname)) {
			missingPathname.push(sourcePathname);
			continue;
		}

		const buffer = fs.readFileSync(sourcePathname);
		const hash = Hash(buffer);
		const extname = path.extname(src);
		const filename = `${hash}${extname}`;
		const destinationPathname = path.join(PATH.TARGET.ASSETS, filename);

		imageElement.src = `${PUBLIC_PATH}${filename}`;
		fs.writeFileSync(destinationPathname, buffer);
	}

	await emitData({ id: id, ...data });
	fs.writeFileSync(htmlPathname, bodyElement.innerHTML);

	if (missingPathname.length > 0) {
		console.error(JSON.stringify(missingPathname, null, '  '));
		throw new Error('Files missing.');
	}
}
