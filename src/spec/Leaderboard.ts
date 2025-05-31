import { z } from 'zod/v4';

export const Schema = z.object({
	id: z.string(),
	name: z.string(),
});

export type Type = z.infer<typeof Schema>;
