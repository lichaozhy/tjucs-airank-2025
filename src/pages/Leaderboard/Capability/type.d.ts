export interface SourceScoreModel {
	type: 'summary' | 'benchmark';
	id: string;
}

export interface SourceAbstract {
	name: string;
}

export interface PropertyAbstract {
	name: string;
	radar: boolean;
	index: number;
}
