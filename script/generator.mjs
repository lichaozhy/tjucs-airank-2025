import * as path from 'node:path';
import { ensureDirectory } from './utils.mjs';

const { dirname } = import.meta;

const PATH = {
	TARGET: {
		ASSETS: path.join(dirname, '../public/html/assets'),
		HTML: path.join(dirname, '../public/html'),
	},
};

await ensureDirectory(PATH.TARGET.ASSETS);
await ensureDirectory(PATH.TARGET.HTML);

await import('./benchmark.mjs');
await import('./guide.mjs');
await import('./model.mjs');
await import('./rule.mjs');
await import('./capability.mjs');
