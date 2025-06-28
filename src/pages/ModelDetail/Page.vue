<template>
	<q-page
		padding
		class="column content-center"
	>
		<div
			class="full-width"
			style="max-width: 1680px"
			v-if="model"
		>
			<div class="row items-end">
				<q-toolbar-title shrink class="text-h4">{{ model.name }}</q-toolbar-title>
				<q-btn
					v-if="model.website"
					:href="model.website"
					icon="public"
					:label="model.website"
					flat
					dense
					no-caps
					class="text-caption text-grey-8"
					target="_blank"
					size="sm"
				></q-btn>
			</div>

			<div class="q-mt-sm">
				<q-chip
					size="11px"
					color="teal-8"
					v-for="(item, index) in propertyEntityList"
					:key="index"
					dense
					class="glossy q-ml-none q-mr-sm overflow-hidden"
				>
					<q-avatar
						text-color="white"
						:icon="item.icon || item.label"
						:color="item.color || 'indigo-10'"
						style="margin-right: 0"
						class="glossy"
					></q-avatar>
					<div
						v-if="item.label && item.icon"
						class="text-white q-mx-sm text-weight-medium"
					>{{ item.label }}</div>
					<div
						v-if="item.value"
						class="bg-indigo-10 q-px-sm glossy text-weight-thin text-white"
						style="margin-right: -0.4em;"
					>{{ item.value }}</div>
				</q-chip>
			</div>

			<div class="q-mt-lg">
				<h2 class="text-h6">Benchmark Scores</h2>
				<q-list
					bordered
					separator
				>
					<q-item
						v-for="score in modelScores"
						:key="score.benchmark"
						clickable
						:to="{
							name: 'app.leaderboard.rank',
							params: {
								leaderboardId: score.leaderboard,
								benchmarkId: score.benchmark,
							},
						}"
					>
						<q-item-section>
							<q-item-label>{{
								getBenchmarkName(score.benchmark)
							}}</q-item-label>
							<q-item-label caption
								>Total Score: {{ score.total }}</q-item-label
							>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type * as Spec from 'src/spec';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { API } from 'src/backend';

interface Score {
	leaderboard: string;
	benchmark: string;
	model: string;
	total: number;
	items: Array<number | null>;
}

const model = ref<Spec.Model.Type | null>(null);
const modelScores = ref<Score[]>([]);
const benchmarkList = ref<Array<Spec.Benchmark.Type>>([]);

const getBenchmarkName = (id: string) => {
	const benchmark = benchmarkList.value.find((bm) => bm.id === id);
	return benchmark ? benchmark.name : `Benchmark ${id}`;
};

interface PropertyEntity {
	icon?: string;
	label: string;
	value?: string;
	color?: string;
}

const propertyEntityList = computed<PropertyEntity[]>(() => {
	const list: PropertyEntity[] = [];

	if (model.value !== null) {
		const {
			component, size, author, release, opensource, dimension, imageVideo,
		} = model.value;

		if (component !== undefined) {
			if (component.vision !== undefined) {
				for (const vision of component.vision) {
					list.push({ label: 'Vision Nodel', value: vision, icon: 'visibility' });
				}
			}

			if (component.language !== undefined) {
				for (const language of component.language) {
					list.push({ label: 'Language Model', value: language, icon: 'translate' });
				}
			}
		}

		if (size !== undefined) {
			for (const sizeValue of size) {
				list.push({ label: 'Size', value: `${sizeValue}B`, icon: 'open_in_full' });
			}
		}

		if (author !== undefined) {
			for (const authorName of author) {
				list.push({ label: 'Institute', value: authorName, icon: 'hub' });
			}
		}

		if (release !== undefined) {
			const { year, month, date } = release;
			const sectionList = [year];

			if (month !== undefined) {
				sectionList.push(month);

				if (date !== undefined) {
					sectionList.push(date);
				}
			}

			list.push({ label: 'Release Time', value: sectionList.join('-'), icon: 'publish' });
		}

		if (opensource !== undefined) {
			list.push({
				label: 'Open Source',
				icon: opensource ? 'check' : 'close',
				color: opensource ? 'positive' : 'negative',
			});
		}

		if (dimension !== undefined) {
			for (const value of dimension) {
				list.push({
					label: 'Dimension',
					icon: 'view_in_ar',
					value,
				});
			}
		}

		if (imageVideo !== undefined) {
			list.push({
				label: 'Modality',
				icon: 'ondemand_video',
				value: imageVideo,
			});
		}
	}

	return list;
});

onMounted(async () => {
	const route = useRoute();
	const modelId = route.params.id as string;

	const modelResponse = await API.Model(modelId).get();
	const scoresResponse = await API.Model(modelId).Score.query();
	benchmarkList.value = await API.Benchmark.query();

	model.value = modelResponse;
	modelScores.value = scoresResponse.map((score) => ({
		...score,
		leaderboard:
			benchmarkList.value.find((bm) => bm.id === score.benchmark)
				?.leaderboard || '',
		total: score.items.at(-1) || 0,
	}));
});

defineOptions({ name: 'ModelDetailPage' });
</script>
