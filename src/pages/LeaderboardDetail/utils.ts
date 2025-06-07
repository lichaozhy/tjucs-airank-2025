const MIN_WIDTH = 8;
const EM_RATIO = 0.5;
const FIXED_SPACE = 2;

export function getColumnEMWidth(labelLength: number) {
	return Math.max(Math.ceil(labelLength * EM_RATIO + FIXED_SPACE), MIN_WIDTH);
}

export function toNumberOrNull(value: number | null) {
	return value === null ? null : value;
}
