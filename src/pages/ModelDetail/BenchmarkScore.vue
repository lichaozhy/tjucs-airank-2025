<template>
	<div>
		<div class="text-h6">Benchmark Scores</div>
		<q-separator class="q-my-sm"></q-separator>

		<div class="row q-col-gutter-sm">
			<div
				class="col-lg-2 col-md-3 col-sm-4 col-xs-6"
				v-for="({ name, value, label }, index) in benchmarkScoreList"
				:key="index"
			>
				<q-card
					square
					flat
					bordered
				>
					<q-item>
						<q-item-section>
							<q-item-label class="text-weight-bold">{{ name }}</q-item-label>
							<q-item-label
								caption
								lines="1"
							>{{ label }}</q-item-label
							>
						</q-item-section>

						<q-item-section side>
							<div class="text-grey-9 text-weight-medium">
								{{ value?.toFixed(2) }}
							</div>
						</q-item-section>
					</q-item>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, inject } from 'vue';

import { API } from 'src/backend';
import * as Context from './Context';

interface BenchmarkScoreDescriptor {
	name: string;
	label: string;
	index: number;
}

const model = inject(Context.Model);

if (model === undefined) {
	throw new Error('PageModelDetail required.');
}

const ready = ref<boolean>(false);
const descriptors = ref<Record<string, BenchmarkScoreDescriptor>>({});

const benchmarkScoreList = computed(() => {
	const scoreList: {
		name: string;
		label: string;
		value: number | null;
	}[] = [];

	if (ready.value && model.value !== null) {
		const { score } = model.value;

		if ('benchmark' in score) {
			for (const [benchmarkId, { legacy }] of Object.entries(score.benchmark)) {
				if (legacy === undefined) {
					continue;
				}

				const { label, index, name } = descriptors.value[benchmarkId]!;

				scoreList.push({ name, label, value: legacy[index] ?? null });
			}
		}
	}

	return scoreList;
});

onBeforeMount(async () => {
	const _descriptors: Record<string, BenchmarkScoreDescriptor> = {};

	for (const benchmark of await API.Benchmark.query()) {
		const { label, index } = benchmark.properties[benchmark.default.property]!;

		_descriptors[benchmark.id] = {
			name: benchmark.name,
			label,
			index,
		};
	}

	descriptors.value = _descriptors;
	ready.value = true;
});

defineOptions({ name: 'AppPageModelDetailBenchmarkScore' });
</script>
