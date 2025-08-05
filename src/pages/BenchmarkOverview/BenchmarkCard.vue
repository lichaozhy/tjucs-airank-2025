<template>
	<router-link
		:to="{ name: 'app.benchmark.detail', params: { id: benchmark.id } }"
		custom
		v-slot="{ navigate }"
	>
		<q-card
			flat
			square
			bordered
			class="full-height cursor-pointer"
			:class="{ 'bg-grey-2': hover }"
			@click="navigate"
			@mouseenter="hover = true"
			@mouseleave="hover = false"
		>
			<q-card-section>
				<q-badge
					color="indigo-10"
					:label="benchmark.released?.at.year"
					:outline="benchmark.released?.at.year !== CUTTENT_YEAR"
					class="q-mr-sm bg-white"
					floating
				/>

				<div class="text-h5 ">
					<span>{{ benchmark.name }}</span>
				</div>

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
				<div class="text-caption text-grey">Capability Dimension</div>
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
	</router-link>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import { computed, ref } from 'vue';

const CUTTENT_YEAR = new Date().getFullYear();
const hover = ref<boolean>(false);

const { benchmark } = defineProps<{
	benchmark: Spec.Benchmark.Type;
}>();

const tagList = computed(() => {
	const list = [];

	if (benchmark.capabilities !== undefined) {
		for (const capabilityName of benchmark.capabilities) {
			list.push({ label: capabilityName, color: 'indigo-10' });
		}
	}

	return list;
});

defineOptions({ name: 'BenchmarkCard' });
</script>
