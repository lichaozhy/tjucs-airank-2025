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
				class="full-width q-mt-md"
			>
				<q-card-section>
					<div class="text-h4 text-weight-light q-mb-sm">
						{{ benchmark?.name }}
					</div>
				</q-card-section>
				<q-separator inset />
				<q-card-section>{{ benchmark?.description }}</q-card-section>
			</q-card>

			<div class="row q-mt-none q-col-gutter-md">
				<div class="col-8">
					<q-card
						square
						flat
					>
						<q-card-section class="q-py-none bg-indigo-10 text-white">
							<div class="text-h6 text-weight-regular">Documentation</div>
						</q-card-section>
						<q-separator />
						<q-card-section>
							<app-markdown-html :src="`benchmark/${benchmark?.id}`" />
						</q-card-section>
					</q-card>
				</div>
				<div class="col-4">
					<q-card
						square
						flat
					>
						<q-card-section class="q-py-none bg-indigo-10 text-white">
							<div class="text-h6 text-weight-regular">Public Access</div>
						</q-card-section>
						<q-separator />

						<q-list>
							<q-item clickable>
								<q-item-section
									avatar
									style="min-width: 40px"
								>
									<q-icon name="publish" />
								</q-item-section>
								<q-item-section>
									<q-item-label class="text-weight-bold"
									>Released At</q-item-label
									>
									<q-item-label caption>{{
										information.releasedAt || '-'
									}}</q-item-label>
								</q-item-section>
							</q-item>

							<q-item clickable>
								<q-item-section
									avatar
									style="min-width: 40px"
								>
									<q-icon name="domain" />
								</q-item-section>
								<q-item-section>
									<q-item-label class="text-weight-bold"
									>Institute</q-item-label
									>
									<q-item-label caption>{{
										information.organization || '-'
									}}</q-item-label>
								</q-item-section>
							</q-item>

							<q-item clickable>
								<q-item-section>
									<q-item-label class="text-weight-bold"
									>Hugging Face</q-item-label
									>
									<q-item-label caption>{{
										information.huggingface || '-'
									}}</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-btn
										v-if="information.huggingface !== null"
										icon="link"
										flat
										dense
										color="primary"
										:href="information.huggingface"
										target="_blank"
									></q-btn>
								</q-item-section>
							</q-item>

							<q-item clickable>
								<q-item-section>
									<q-item-label class="text-weight-bold"
									>Repository</q-item-label
									>
									<q-item-label caption>{{
										information.repository || '-'
									}}</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-btn
										v-if="information.repository !== null"
										icon="link"
										flat
										dense
										color="primary"
										:href="information.repository"
										target="_blank"
									></q-btn>
								</q-item-section>
							</q-item>

							<q-item clickable>
								<q-item-section>
									<q-item-label class="text-weight-bold">Website</q-item-label>
									<q-item-label caption>{{
										information.website || '-'
									}}</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-btn
										v-if="information.website !== null"
										icon="link"
										flat
										dense
										color="primary"
										:href="information.website"
										target="_blank"
									></q-btn>
								</q-item-section>
							</q-item>
						</q-list>
					</q-card>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type * as DataType from 'src/data';
import * as Q from 'quasar';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import * as Backend from 'src/backend';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

const route = useRoute();
const benchmark = ref<(DataType.BenchmarkData & { id: string }) | null>(null);

interface InformationData {
	releasedAt: string | null;
	organization: string | null;
	huggingface: string | null;
	repository: string | null;
	website: string | null;
}

const MASK = {
	YM: 'YYYY-MM',
	YMD: 'YYYY-MM-DD',
};

const information = computed<InformationData>(() => {
	const data: InformationData = {
		releasedAt: null,
		organization: null,
		huggingface: null,
		repository: null,
		website: null,
	};

	if (benchmark.value !== null) {
		const { huggingface, organization, repository, released, website } =
			benchmark.value;

		if (huggingface !== undefined) {
			data.huggingface = huggingface;
		}

		if (organization !== undefined) {
			data.organization = organization;
		}

		if (repository !== undefined) {
			data.repository = repository;
		}

		if (released !== undefined) {
			if (released !== null) {
				const { year, month, date } = released.at;
				const at = new Date(year, month! - 1, date === null ? 1 : date);

				data.releasedAt = Q.date.formatDate(
					at,
					date === null ? MASK.YM : MASK.YMD,
				);
			}
		}

		if (website !== undefined) {
			data.website = website;
		}
	}

	return data;
});

async function fetchBenchmark(operand: string) {
	try {
		return await Backend.API.Benchmark(operand).get();
	} catch {
		const code = operand;
		const [benchmark] = await Backend.API.Benchmark.query({ code });

		if (benchmark === undefined) {
			throw new Error(`Benchmark with code ${code} not found`);
		}

		return benchmark;
	}
}

onBeforeMount(async () => {
	benchmark.value = await fetchBenchmark(route.params.benchmarkCode as string);
});

defineOptions({ name: 'BenchmarkDetailPage' });
</script>
