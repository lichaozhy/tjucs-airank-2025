const MIN_WIDTH = 8;
const EM_RATIO = 0.5;
const FIXED_SPACE = 4;

export function getColumnEMWidth(labelLength: number) {
	return Math.max(Math.ceil(labelLength * EM_RATIO + FIXED_SPACE), MIN_WIDTH);
}

export function toNumberOrNull(value: number | null | undefined = null) {
	return value === null ? null : value;
}

export function toNoneOrFixed(value: number | null, fractionDigital = 2) {
	return value === null ? '-' : value.toFixed(fractionDigital);
}

export type ColumnAlignment = 'left' | 'center' | 'right';

export const STATIC_COLUMN_LIST = [
	{
		name: 'rank',
		label: '#',
		field: '',
		align: 'center' as ColumnAlignment,
		headerStyle: 'width: 6em',
	},
	{
		name: 'model',
		label: 'Model',
		field: 'model',
		align: 'left' as ColumnAlignment,
		headerStyle: 'width: 260px;',
	},
];

export const TAIL_BLANK_COLUMN = {
	name: 'blank',
	label: ' ',
	field: 'blank',
};
