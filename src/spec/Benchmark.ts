import { z } from 'zod/v4';
import * as Leaderboard from './Leaderboard';

function OptionalNullable<T extends z.ZodType>(schema: T) {
	return z.optional(z.nullable(schema));
}

const ReleasedSchema = z.object({
	at: z.object({
		year: z.uint32(),
		month: OptionalNullable(z.uint32()),
		date: OptionalNullable(z.uint32()),
	}),
});

const MetadataNamespace = {
	released: OptionalNullable(ReleasedSchema),
	description: OptionalNullable(z.string()),
	organization: OptionalNullable(z.string()),
	huggingface: OptionalNullable(z.url()),
	repository: OptionalNullable(z.url()),
	website: OptionalNullable(z.url()),
};

export const Schema = z.object({
	id: z.string(),
	leaderboard: Leaderboard.Schema.shape.id,
	name: z.string(),
	default: z.object({
		property: z.string(),
	}),
	...MetadataNamespace,
	properties: z.record(
		z.string(),
		z.object({
			order: z.number(),
			index: z.number(),
			label: z.string(),
			unit: z.string().nullable(),
		}),
	),
});

export type Type = z.infer<typeof Schema>;
