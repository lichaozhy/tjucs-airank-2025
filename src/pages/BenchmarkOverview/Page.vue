<template>
	<div id="benchmark-index">
		<div
			id="app-benchmark-banner"
			class="title column justify-center items-center full-width"
			style="height: 230px"
		>
			<div class="text-h2 text-weight-light">
				{{ $t('p.benchmark.banner.title') }}
			</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.benchmark.banner.description') }}
			</div>
		</div>
		<div class="content">
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
				<q-input
					v-model="nameFilter"
					placeholder="Search..."
					class="q-mb-md"
				>
					<template v-slot:append>
						<q-icon
							v-if="nameFilter.length > 0"
							class="cursor-pointer"
							name="clear"
							@click.stop.prevent="nameFilter = ''"
						/>
						<q-icon name="search" />
					</template>
				</q-input>
			</div>

			<div class="benchmark-list">
				<router-link
					v-for="(benchmark, index) in filteredBenchmarkList"
					:key="benchmark.id"
					:to="{ name: 'app.benchmark.detail', params: { id: benchmark.id } }"
					custom
					v-slot="{ navigate }"
				>
					<AppBenchmarkCard
						square
						class="benchmark-card"
						:benchmark="benchmark"
						:isNew="index < 5"
						@click="navigate"
					/>
				</router-link>
			</div>
		</div>
	</div>
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

#app-benchmark-banner {
	background:
		linear-gradient(
			to bottom,
			rgba($primary, 0.4) 0%,
			rgba($primary, 0.45) 25%,
			rgba($primary, 0.5) 50%,
			rgba($primary, 0.55) 75%,
			rgba($primary, 0.6) 100%
		),
		url('/image/29085492_1944-no.jpg') center/cover;
}
</style>
