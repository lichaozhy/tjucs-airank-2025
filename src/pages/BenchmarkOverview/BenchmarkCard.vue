<template>
	<q-card
		flat
		square
		bordered
		class="full-height"
	>
		<q-card-section>
			<q-badge
				color="indigo-10"
				:label="benchmark.released?.at.year"
				:outline="benchmark.released?.at.year !== CUTTENT_YEAR"
				class="q-mr-sm bg-white"
				floating
			/>

			<q-btn
				size="lg"
				flat
				dense
				class="q-px-none"
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
				v-for="(tag, index) in tagList"
				:key="index"
				class="q-ml-none text-white"
				dense
				square
				:label="tag.label"
				:color="tag.color"
				size="sm"
			/>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import { computed } from 'vue';

const CUTTENT_YEAR = new Date().getFullYear();

const { benchmark } = defineProps<{
	benchmark: Spec.Benchmark.Type;
}>();

console.log(benchmark);

const tagList = computed(() => {
	const list = [];

	if (benchmark.capabilities !== undefined) {
		for (const capabilityName of benchmark.capabilities) {
			list.push({ label: capabilityName, color: 'indigo-10' });
		}
	}

	for (const property of Object.values(benchmark.properties)) {
		list.push({ label: property.label, color: 'grey' });
	}

	return list;
});

defineOptions({ name: 'BenchmarkCard' });
</script>
