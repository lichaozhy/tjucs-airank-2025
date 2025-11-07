import type { InjectionKey, Ref } from 'vue';

export interface LeaderboardOperand {
	id: string | null;
	code: string | null;
}

export const symbol = Symbol(
	'LeaderboardOperand',
) as InjectionKey<Ref<LeaderboardOperand>>;
