import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';

import { ensureDirectory, Hash } from './utils.mjs';

const { dirname } = import.meta;
const MDParser = MarkdownIt({ html: true, linkify: true });

const PATH = {
	SOURCE: {
		DIRECTORY: path.join(dirname, '../document/capability'),
	},
	TARGET: {
		ASSETS: path.join(dirname, '../public/html/assets'),
		METADATA: path.join(dirname, '../public/data/capability'),
		HTML: path.join(dirname, '../public/html/capability'),
	},
};

const PUBLIC_PATH = '/html/assets/';

await ensureDirectory(PATH.TARGET.ASSETS);
await ensureDirectory(PATH.TARGET.HTML);
await ensureDirectory(PATH.TARGET.METADATA);
await ensureDirectory(path.join(PATH.TARGET.HTML, 'group'));
await ensureDirectory(path.join(PATH.TARGET.HTML, 'item'));

const CAPABILITY_GROUP_DIRECTORY = path.join(PATH.SOURCE.DIRECTORY, 'group');
const CAPABILITY_GROUP_HTML = path.join(PATH.TARGET.HTML, 'group');
const groupList = [];

for (const groupId of await fs.promises.readdir(CAPABILITY_GROUP_DIRECTORY)) {
	const pathname = path.join(CAPABILITY_GROUP_DIRECTORY, groupId, 'README.md');
	const { data, content } = matter(await fs.promises.readFile(pathname, 'utf-8'));
	const DOM = new JSDOM(MDParser.render(content));
	const htmlPathname = path.join(CAPABILITY_GROUP_HTML, `${groupId}.html`);
	const bodyElement = DOM.window.document.body;

	groupList.push({ id: groupId, ...data });
	await fs.promises.writeFile(htmlPathname, bodyElement.innerHTML);
}

const CAPABILITY_ITEM_DIRECTORY = path.join(PATH.SOURCE.DIRECTORY, 'item');
const CAPABILITY_ITEM_HTML = path.join(PATH.TARGET.HTML, 'item');
const itemList = [];

for (const itemId of await fs.promises.readdir(CAPABILITY_ITEM_DIRECTORY)) {
	const pathname = path.join(CAPABILITY_ITEM_DIRECTORY, itemId, 'README.md');
	const { data, content } = matter(await fs.promises.readFile(pathname, 'utf-8'));
	const DOM = new JSDOM(MDParser.render(content));
	const htmlPathname = path.join(CAPABILITY_ITEM_HTML, `${itemId}.html`);
	const bodyElement = DOM.window.document.body;

	itemList.push({ id: itemId, ...data });
	await fs.promises.writeFile(htmlPathname, bodyElement.innerHTML);
}

const groupFileData = JSON.stringify(groupList, null, '\t');
const itemFileData = JSON.stringify(itemList, null, '\t');

await fs.promises.writeFile(path.join(PATH.TARGET.METADATA, 'group.json'), groupFileData);
await fs.promises.writeFile(path.join(PATH.TARGET.METADATA, 'item.json'), itemFileData);
