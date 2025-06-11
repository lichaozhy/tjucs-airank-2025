<template>
	<q-page
		class="column content-center"
		padding
	>
		<div
			class="full-width"
			style="max-width: 1680px"
		>
			<q-breadcrumbs>
				<q-breadcrumbs-el
					:label="$t('nav.app.benchmark.index')"
					:to="{ name: 'app.benchmark' }"
				/>
				<q-breadcrumbs-el
					class="text-weight-bold"
					:label="benchmark?.name"
				/>
			</q-breadcrumbs>

			<q-card
				square
				flat
				class="q-pa-md full-width q-mt-md"
			>
				<div class="text-h4 text-weight-light">{{ benchmark?.name }}</div>
				<div class="text-subtitle3 q-mt-md text-weight-light">
					{{
						Object.values(benchmark?.properties ?? {})
							.map((prop) => prop.label)
							.join(', ')
					}}
				</div>
			</q-card>

			<div class="row q-mt-none q-col-gutter-md">
				<div class="col-9">
					<q-card square flat>
						<q-card-section>
							<div
								class="app-markdown-html"
								v-html="documentHTML"
							></div>
						</q-card-section>
					</q-card>
				</div>
				<div class="col-3">information</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';

const route = useRoute();
const benchmarkId = route.params.id as string;
const BenchmarkAPI = Backend.API.Benchmark(benchmarkId);
const benchmark = ref<Spec.Benchmark.Type | null>(null);
const documentHTML = ref<string>('');

onBeforeMount(async () => {
	benchmark.value = await BenchmarkAPI.get();

	if (!benchmark.value) {
		throw new Error(`Benchmark with ID ${benchmarkId} not found`);
	}

	documentHTML.value = await BenchmarkAPI.Document.get();
});

defineOptions({ name: 'BenchmarkDetailPage' });
</script>
