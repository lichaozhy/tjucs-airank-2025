<template>
	<q-card
		flat
		square
		class="full-height"
	>
		<q-card-section>
			<q-badge
				color="indigo-10"
				:label="benchmark.released?.at.year"
				:outline="benchmark.released?.at.year !== CUTTENT_YEAR"
				class="q-mr-sm"
			/>

			<q-btn
				size="lg"
				flat
				dense
				:to="{ name: 'app.benchmark.detail', params: { id: benchmark.id } }"
				:label="benchmark.name"
				no-caps
			/>

			<div class="text-caption text-grey-9 ellipsis">
				<span>
					{{ benchmark.organization }}
					<q-tooltip
						v-if="benchmark.organization"
						anchor="top start"
						self="center start"
						transition-show="fade"
						transition-hide="none"
						class="bg-black"
					>
						{{ benchmark.organization }}
					</q-tooltip>
				</span>
			</div>

			<div
				class="text-body q-mt-md"
				style="height: 5em"
			>
				<div v-if="benchmark.description">
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
				square
				color="grey-8"
				size="sm"
				label="Unknown"
			></q-chip>

			<q-chip
				v-for="tag in tagList"
				:key="tag"
				class="q-ml-none text-white"
				dense
				square
				color="primary"
				size="sm"
			>
				{{ tag }}
			</q-chip></q-card-section
		>
	</q-card>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import { computed } from 'vue';

const CUTTENT_YEAR = new Date().getFullYear();

const { benchmark } = defineProps<{
	benchmark: Spec.Benchmark.Type;
}>();

const tagList = computed(() => {
	return Object.values(benchmark.properties).map((property) => property.label);
});

defineOptions({ name: 'BenchmarkCard' });
</script>
