import { z } from 'zod/v4';
import * as Leaderboard from './Leaderboard';

export const Schema = z.object({
	id: z.string(),
	leaderboard: Leaderboard.Schema.shape.id,
	name: z.string(),
	default: z.object({
		property: z.string(),
	}),
	properties: z.record(
		z.string(),
		z.object({
			index: z.number(),
			label: z.string(),
			unit: z.string().nullable(),
		}),
	),
});

export type Type = z.infer<typeof Schema>;
