<template>
	<q-card
		flat
		square
		class="full-height"
	>
		<q-card-section>
			<q-btn
				size="lg"
				flat
				dense
				class="q-px-none"
				:to="{ name: 'app.benchmark.detail', params: { id: benchmark.id } }"
				>{{ benchmark.name }}</q-btn
			>

			<div class="text-caption text-grey-9 ellipsis">
				<span>
					{{ benchmark.organization }}
					<q-tooltip
						v-if="benchmark.organization"
						anchor="top start"
						self="center start"
						transition-show="fade"
						transition-hide="fade"
					>
						{{ benchmark.organization }}
					</q-tooltip>
				</span>
			</div>

			<div class="text-body q-mt-md">
				<div
					style="height: 3em"
					v-if="benchmark.description"
				>
					{{ benchmark.description }}
				</div>

				<div
					v-else
					class="text-grey-9 text-italic"
				>
					No description
				</div>
			</div>
		</q-card-section>

		<q-card-section>
			<q-chip
				v-if="tagList.length === 0"
				class="q-ml-none text-white"
				dense
				color="grey-8"
				size="sm"
				label="Unknown"
			></q-chip>

			<q-chip
				v-for="tag in tagList"
				:key="tag"
				class="q-ml-none text-white"
				dense
				color="indigo-10"
				size="sm"
			>
				{{ tag }}
			</q-chip></q-card-section
		>
	</q-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkCard' });
import { computed } from 'vue';
import type * as Spec from 'src/spec';

const { benchmark } = defineProps<{
	benchmark: Spec.Benchmark.Type;
}>();

const tagList = computed(() => {
	return Object.entries(benchmark.properties)
		.filter(([key]) => key !== benchmark.default.property)
		.map(([, value]) => `${value.label}`);
});
</script>
