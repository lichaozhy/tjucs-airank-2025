import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';

import { ensureDirectory, Hash } from './utils.mjs';
import * as MD from './markdown.mjs';

const { dirname } = import.meta;

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
const missingPathname = [];

await ensureDirectory(PATH.TARGET.ASSETS);
await ensureDirectory(PATH.TARGET.HTML);
await ensureDirectory(PATH.TARGET.METADATA);
await ensureDirectory(path.join(PATH.TARGET.HTML, 'group'));
await ensureDirectory(path.join(PATH.TARGET.HTML, 'item'));

const CAPABILITY_GROUP_DIRECTORY = path.join(PATH.SOURCE.DIRECTORY, 'group');
const CAPABILITY_GROUP_HTML = path.join(PATH.TARGET.HTML, 'group');
const groupList = [];

async function extractImage(dom, dirname) {
	for (const imageElement of dom.querySelectorAll('img')) {
		const { src: relativePathname } = imageElement;
		const sourcePathname = path.join(dirname, relativePathname);

		if (!fs.existsSync(sourcePathname)) {
			missingPathname.push(sourcePathname);
			continue;
		}

		const buffer = await fs.promises.readFile(sourcePathname);
		const hash = Hash(buffer);
		const extname = path.extname(relativePathname);
		const filename = `${hash}${extname}`;
		const destinationPathname = path.join(PATH.TARGET.ASSETS, filename);

		imageElement.src = `${PUBLIC_PATH}${filename}`;
		await fs.promises.writeFile(destinationPathname, buffer);
	}
}

for (const groupId of await fs.promises.readdir(CAPABILITY_GROUP_DIRECTORY)) {
	const dirname = path.join(CAPABILITY_GROUP_DIRECTORY, groupId);
	const pathname = path.join(dirname, 'README.md');
	const { data, content } = matter(await fs.promises.readFile(pathname, 'utf-8'));
	const htmlPathname = path.join(CAPABILITY_GROUP_HTML, `${groupId}.html`);
	const bodyElement = new JSDOM(MD.parser.render(content)).window.document.body;

	await extractImage(bodyElement, dirname);
	groupList.push({ id: groupId, ...data });
	await fs.promises.writeFile(htmlPathname, bodyElement.innerHTML);
}

const CAPABILITY_ITEM_DIRECTORY = path.join(PATH.SOURCE.DIRECTORY, 'item');
const CAPABILITY_ITEM_HTML = path.join(PATH.TARGET.HTML, 'item');
const itemList = [];

for (const itemId of await fs.promises.readdir(CAPABILITY_ITEM_DIRECTORY)) {
	const dirname = path.join(CAPABILITY_ITEM_DIRECTORY, itemId);
	const pathname = path.join(dirname, 'README.md');
	const { data, content } = matter(await fs.promises.readFile(pathname, 'utf-8'));
	const htmlPathname = path.join(CAPABILITY_ITEM_HTML, `${itemId}.html`);
	const bodyElement = new JSDOM(MD.parser.render(content)).window.document.body;

	await extractImage(bodyElement, dirname);
	itemList.push({ id: itemId, ...data });
	await fs.promises.writeFile(htmlPathname, bodyElement.innerHTML);
}

const groupFileData = JSON.stringify(groupList, null, '\t');
const itemFileData = JSON.stringify(itemList, null, '\t');

await fs.promises.writeFile(path.join(PATH.TARGET.METADATA, 'group.json'), groupFileData);
await fs.promises.writeFile(path.join(PATH.TARGET.METADATA, 'item.json'), itemFileData);

if (missingPathname.length > 0) {
	console.error(JSON.stringify(missingPathname, null, '  '));
	throw new Error('Files missing.');
}

const LEVEL_SOURCE_PATHNAME = path.join(PATH.SOURCE.DIRECTORY, 'level.json');
const LEVEL_TARGET_PATHNAME = path.join(PATH.TARGET.METADATA, 'level.json');

await fs.promises.copyFile(LEVEL_SOURCE_PATHNAME, LEVEL_TARGET_PATHNAME);
