import * as fs from 'node:fs';
import * as crypto from 'node:crypto';

export async function ensureDirectory(pathname) {
	if (!fs.existsSync(pathname)) {
		await fs.promises.mkdir(pathname, { recursive: true });
	}
}

export function Hash(buffer) {
	const hash = crypto.createHash('MD5');

	hash.update(buffer);

	return hash.digest('hex');
}
