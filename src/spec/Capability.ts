import { z } from 'zod/v4';

export const GroupSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	order: z.uint32(),
	icon: z.string().optional(),
});

export const ItemSchema = z.object({
	id: z.uuid(),
	group: z.uuid(),
	name: z.string(),
	order: z.uint32(),
});

export type Group = z.infer<typeof GroupSchema>;
export type Item = z.infer<typeof ItemSchema>;
