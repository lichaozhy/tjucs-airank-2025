import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import MarkdownIt from 'markdown-it';
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
		METADATA: path.join(dirname, '../public/data/benchmark.json'),
		HTML: path.join(dirname, '../public/html/benchmark'),
	},
};

const PUBLIC_PATH = '/html/assets/';
