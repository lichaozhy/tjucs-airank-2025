import { z } from 'zod/v4';

export const Schema = z.object({
	DEFAULT_BENCHMARK: z.string(),
});

export type Type = z.infer<typeof Schema>
