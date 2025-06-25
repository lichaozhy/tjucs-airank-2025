import { z } from 'zod/v4';

export const SummaryPropertyReference = z.object({
	benchmark: z.uuid(),
	key: z.string(),
});

export const SummaryPropertyType = z.enum(['computed', 'reference']);

export const SummaryProperty = z.object({
	type: SummaryPropertyType,
	label: z.string(),
	ref: z.optional(SummaryPropertyReference),
});

export const Summary = z.object({
	id: z.uuid(),
	name: z.string(),
	properties: z.array(SummaryProperty),
	models: z.record(z.uuid(), z.literal(true)).optional(),
});

export const Schema = z.object({
	id: z.uuid(),
	name: z.string(),
	summaries: z.array(Summary),
});

export type Type = z.infer<typeof Schema>;
export type Summary = z.infer<typeof Summary>;
