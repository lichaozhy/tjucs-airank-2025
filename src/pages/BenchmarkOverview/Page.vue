<template>
	<q-page
		id="app-benchmark-index"
		class="column content-center"
		padding
	>
		<div
			id="app-benchmark-banner"
			class="app-page-banner column justify-center items-center absolute-full text-white"
		>
			<div class="text-h2 text-weight-light">
				{{ $t('p.benchmark.banner.title') }}
			</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.benchmark.banner.description') }}
			</div>
		</div>

		<div class="full-width app-max-width-1680">
			<div class="filter">
				<div class="q-py-md">
					<q-btn-toggle
						no-caps
						square
						v-model="propsFilter"
						toggle-color="secondary"
						:options="propsOptions.filter((o) => o.label.length < 10)"
					/>
				</div>
			</div>

			<div class="row q-col-gutter-md items-stretch">
				<div
					class="col-lg-4 col-md-6"
					v-for="(benchmark) in filteredBenchmarkList"
					:key="benchmark.id"
				>
					<AppBenchmarkCard
						:benchmark="benchmark"
					/>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkIndexPage' });
import { API } from 'src/backend';
import AppBenchmarkCard from './BenchmarkCard.vue';
import type * as Spec from 'src/spec';
import { computed, onBeforeMount, ref } from 'vue';

const nameFilter = ref('');
const propsFilter = ref<string>('all');
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
onBeforeMount(async () => {
	benchmarkList.value = await API.Benchmark.query();
});

const propsOptions = computed(() => {
	const benchmarkPropList = benchmarkList.value
		.map((b) => Object.entries(b.properties))
		.flat();

	const propsGroup = Object.groupBy(benchmarkPropList, ([name]) => name);

	const list = Object.entries(propsGroup).map(([name, propList]) => {
		const prop = propList![0]![1];
		return {
			value: name,
			label: prop.label,
		};
	});

	list.unshift({
		value: 'all',
		label: 'All',
	});

	return list;
});

const filteredBenchmarkList = computed(() => {
	if (!nameFilter.value && propsFilter.value === 'all')
		return benchmarkList.value;
	return benchmarkList.value.filter((b) => {
		return (
			b.name.toLowerCase().includes(nameFilter.value.toLowerCase()) &&
			(propsFilter.value === 'all' || b.properties[propsFilter.value])
		);
	});
});
</script>

<style lang="scss" scoped>
#benchmark-index {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.content {
		margin: 48px;
		display: flex;
		flex-direction: column;
		/* min-width: 800px; */
		max-width: 1680px;

		.filter {
			display: flex;
			flex-direction: column;
			margin-bottom: 24px;

			.q-input {
				max-width: 320px;
			}

			/* .q-btn-toggle {
			} */
		}

		.benchmark-list {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 16px;
			width: 100%;
			max-width: 1680px;
		}

		.benchmark-card:hover {
			cursor: pointer;
			box-shadow: 0 8px 16px rgba($primary, 0.8);
			transform: translateY(-2px);
			transition:
				box-shadow 0.3s ease,
				transform 0.3s ease;
		}
	}
}
</style>
