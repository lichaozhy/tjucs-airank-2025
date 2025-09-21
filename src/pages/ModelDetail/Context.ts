import type * as Type from 'src/data';
import type { InjectionKey, Ref } from 'vue';

export const Model = Symbol() as InjectionKey<Ref<Type.Model | null>>;
