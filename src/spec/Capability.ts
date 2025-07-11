import { z } from 'zod/v4';

export const GroupSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	order: z.int32(),
	icon: z.string().optional(),
});

export const ItemSchema = z.object({
	id: z.uuid(),
	group: z.uuid(),
	name: z.string(),
	order: z.int32(),
});

export const ScoreMapSchema = z.object({
	id: z.uuid(),
	index: z.uint32(),
	order: z.int32(),
});

export type Group = z.infer<typeof GroupSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type ScoreMap = z.infer<typeof ScoreMapSchema>;
