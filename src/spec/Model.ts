import { z } from 'zod/v4';

export const Schema = z.object({
	id: z.string(),
	name: z.string(),
	component: z.object({
		vision: z.array(z.string()).optional(),
		language: z.array(z.string()).optional(),
	}).optional(),
	size: z.array(z.uint32()).optional(),
	author: z.array(z.string()).optional(),
	release: z.object({
		year: z.uint32().optional(),
		month: z.uint32().optional(),
		date: z.uint32().optional(),
	}).optional(),
	opensource: z.boolean().nullable().optional(),
	qa: z.array(z.enum(['2D', '3D'])).optional(),
	navigation: z.boolean().nullable().optional(),
	taskPlanning: z.boolean().nullable().optional(),
});

export type Type = z.infer<typeof Schema>
