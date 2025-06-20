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
						<q-card-section class="q-py-none bg-secondary text-white">
							<div class="text-h6 text-weight-regular">Documentation</div>
						</q-card-section>
						<q-separator />
						<q-card-section>
							<div
								class="app-markdown-html"
								style="font-size: 16px"
								v-html="documentHTML"
							></div>
						</q-card-section>
					</q-card>
				</div>
				<div class="col-4">
					<q-card
						square
						flat
					>
						<q-card-section class="q-py-none bg-secondary text-white">
							<div class="text-h6 text-weight-regular">Property List</div>
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
										>Organization</q-item-label
									>
									<q-item-label caption>{{
										information.organization || '-'
									}}</q-item-label>
								</q-item-section>
							</q-item>

							<q-item clickable>
								<q-item-section>
									<q-item-label class="text-weight-bold"
										>Reference</q-item-label
									>
									<q-item-label caption>{{
										information.reference || '-'
									}}</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-btn
										v-if="information.reference !== null"
										icon="link"
										flat
										dense
										color="primary"
										:href="information.reference"
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
										information.repository || '-'
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
import * as Q from 'quasar';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';

const route = useRoute();
const benchmarkId = route.params.id as string;
const BenchmarkAPI = Backend.API.Benchmark(benchmarkId);
const benchmark = ref<Spec.Benchmark.Type | null>(null);
const documentHTML = ref<string>('');

interface InformationData {
	releasedAt: string | null;
	organization: string | null;
	reference: string | null;
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
		reference: null,
		repository: null,
		website: null,
	};

	if (benchmark.value !== null) {
		const { reference, organization, repository, released, website } =
			benchmark.value;

		if (reference !== undefined) {
			data.reference = reference;
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
				const at = new Date(year, month - 1, date === null ? 1 : date);

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

onBeforeMount(async () => {
	benchmark.value = await BenchmarkAPI.get();

	if (!benchmark.value) {
		throw new Error(`Benchmark with ID ${benchmarkId} not found`);
	}

	documentHTML.value = await BenchmarkAPI.Document.get();
});

defineOptions({ name: 'BenchmarkDetailPage' });
</script>
