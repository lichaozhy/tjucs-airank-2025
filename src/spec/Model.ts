import { z } from 'zod/v4';

export const Schema = z.object({
	id: z.string(),
	name: z.string(),
	component: z.record(z.string(), z.string().nullable()),
});

export type Type = z.infer<typeof Schema>;
