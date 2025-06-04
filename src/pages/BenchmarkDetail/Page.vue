<template>
	<q-page
		class="column content-center benchmark-detail"
		padding
	>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs class="q-mb-md">
				<q-breadcrumbs-el
					:label="$t('nav.app.benchmark.index')"
					:to="{ name: 'app.benchmark.index' }"
				/>
				<q-breadcrumbs-el :label="benchmark?.name" />
			</q-breadcrumbs>
		</div>

		<div
			class="column content-center"
			style="width: 1000px"
		>
			<q-card
				square
				class="q-pa-md full-width"
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

			<div class="content full-width">
				<div class="readme">readme</div>
				<div class="information">information</div>
			</div>
		</div>

		<!-- <div
			id="app-leaderboard-banner"
			class="title column justify-center items-center absolute-full"
			style="height: 230px"
		>
			<div class="text-h2 text-weight-light">{{ $t('p.leaderboard.banner.title') }}</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.leaderboard.banner.description') }}
			</div>
		</div> -->
	</q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkDetailPage' });
import { useRoute } from 'vue-router';
import type * as Spec from 'src/spec';
import { onBeforeMount, ref } from 'vue';
import { API } from 'src/backend';

const route = useRoute();
const benchmarkId = route.params.id as string;
const benchmark = ref<Spec.Benchmark.Type | null>(null);

onBeforeMount(async () => {
	benchmark.value = await API.Benchmark(benchmarkId).get();
	if (!benchmark.value) {
		throw new Error(`Benchmark with ID ${benchmarkId} not found`);
	}
});
</script>

<style lang="scss" scoped>
.benchmark-detail {
	.content {
		$content-background: #ffffff;
		margin-top: 32px;
		display: grid;
		grid-template-columns: 2fr 1fr;

		.readme {
			padding: 16px;
			background-color: $content-background;
			overflow-y: auto;
			min-height: 600px;
		}

		.information {
			padding: 16px;
			background-color: $content-background;
			border-left: 1px solid #888888;
			overflow-y: auto;
			min-height: 600px;
		}
	}
}
</style>
