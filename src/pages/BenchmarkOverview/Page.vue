<template>
	<div id="benchmark-index">
		<div
			id="app-benchmark-banner"
			class="title column justify-center items-center full-width"
			style="height: 230px"
		>
			<div class="text-h2 text-weight-light">{{ $t('p.benchmark.banner.title') }}</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.benchmark.banner.description') }}
			</div>
		</div>
		<div class="content">
			<router-link
				v-for="(benchmark, index) in benchmarkList"
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
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkIndexPage' });
import { API } from 'src/backend';
import AppBenchmarkCard from './BenchmarkCard.vue';
import type * as Spec from 'src/spec';
import { onBeforeMount, ref } from 'vue';

const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);
onBeforeMount(async () => {
	benchmarkList.value = await API.Benchmark.query();
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		min-width: 800px;
		max-width: 1680px;

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
