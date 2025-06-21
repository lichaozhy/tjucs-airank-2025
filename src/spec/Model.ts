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
		year: z.uint32(),
		month: z.uint32().optional(),
		date: z.uint32().optional(),
	}).optional(),
	opensource: z.boolean().optional(),
	qa: z.array(z.enum(['2D', '3D'])).optional(),
	navigation: z.boolean().optional(),
	taskPlanning: z.boolean().optional(),
	website: z.url().optional(),
	dimension: z.array(z.enum(['2D', '3D'])).optional(),
	reason: z.boolean().optional(),
	imageVideo: z.enum([
		'both', 'image/video', 'Image', 'Video', 'Point Clouds',
	]).optional(),
});

export type Type = z.infer<typeof Schema>;
