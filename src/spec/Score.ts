import { z } from 'zod/v4';
import * as Benchmark from './Benchmark';
import * as Model from './Model';

export const Schema = z.object({
	benchmark: Benchmark.Schema.shape.id,
	model: Model.Schema.shape.id,
	items: z.array(z.number().nullable()),
});

export type Type = z.infer<typeof Schema>
