import type { InjectionKey } from 'vue';
import type { FilterItemManager } from '../ItemManager';

export const MANAGER = Symbol() as InjectionKey<FilterItemManager>;
