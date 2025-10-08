import * as fs from 'node:fs';
import * as path from 'node:path';

import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import MarkdownIt from 'markdown-it';
import markdownItMathTemml from 'markdown-it-math/temml';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItCheckbox from '@gerhobbelt/markdown-it-checkbox';
import slugify from '@sindresorhus/slugify';

import { Hash, ensureDirectory, PATH } from './utils.mjs';

const REPO_BASE_URL = 'https://github.com/lichaozhy/tjucs-airank-2025/';
const CODE_BASE_URL = `${REPO_BASE_URL}tree/main/`;
const PUBLIC_PATH = '/html/assets/';
export const parser = MarkdownIt({ html: true, linkify: true });

parser.use(markdownItMathTemml);
parser.use(MarkdownItAnchor, { slugify: (s) => slugify(s) });
parser.use(MarkdownItCheckbox, { disabled: true });

export const missingPathname = [];

function setData(path, data, root) {
	let current = root;

	for (const dirname of path) {
		if (!Object.hasOwn(current, dirname)) {
			current[dirname] = {};
		}

		current = current[dirname];
	}

	current.$data = data;
}

export async function toHTML(dirname, dataRoot = {}) {
	const basename = path.basename(dirname);
	const pathname = path.join(dirname, 'README.md');
	const { data, content } = matter(fs.readFileSync(pathname, 'utf-8'));
	const DOM = new JSDOM(parser.render(content));
	const bodyElement = DOM.window.document.body;

	const sourceURLElement = DOM.window.document.createElement('a');
	const posixPathname = path
		.relative(PATH.WORKSPACE, pathname)
		.replaceAll('\\', '/');

	sourceURLElement.setAttribute('href', `${CODE_BASE_URL}${posixPathname}`);
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

		imageElement.src = `${PUBLIC_PATH}${filename}`;
		fs.writeFileSync(path.join(PATH.TARGET.ASSETS, filename), buffer);
	}

	const relativeDirname = path.relative(PATH.DOCUMENT, path.dirname(dirname));
	const targetDirname = path.join(PATH.TARGET.HTML, relativeDirname);
	const htmlPathname = path.join(targetDirname, `${basename}.html`);

	ensureDirectory(targetDirname);
	fs.writeFileSync(htmlPathname, bodyElement.innerHTML);
	setData(path.relative(PATH.DOCUMENT, dirname).split(path.sep), data, dataRoot);
}
