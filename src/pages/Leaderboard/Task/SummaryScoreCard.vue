<template>
	<AppScoreCard v-if="summary !== null">
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section class="col-shrink">
					<div class="text-h6 text-weight-600 q-py-sm text-white">
						{{ summary?.name }}
					</div>
				</q-item-section>
				<q-item-section side>
					<AppModelFilter
						:models="rowList"
						@filtered="(list) => (filteredModelDataList = list)"
					></AppModelFilter>
				</q-item-section>
			</q-item>
		</template>
		<AppScoreTable
			:columns="columnList"
			:rows="filteredModelDataList"
		></AppScoreTable>
	</AppScoreCard>
</template>

<script setup lang="ts">
import type * as Data from 'src/data';
import type { ModelData } from 'components/ScoreTable.vue';
import { computed, onBeforeMount, ref } from 'vue';

import AppScoreCard from 'components/ScoreCard.vue';
import AppScoreTable from 'components/ScoreTable.vue';
import AppModelFilter from 'components/ModelFilter.vue';

import * as Backend from 'src/backend';

const props = defineProps<{
	summaryId: string;
	leaderboardId: string;
}>();

const LeaderboardAPI = Backend.API.Leaderboard(props.leaderboardId);
const SummaryAPI = LeaderboardAPI.Summary(props.summaryId);

const summary = ref<Data.SummaryItem | null>(null);
const modelList = ref<(Data.Model & { id: string })[]>([]);
const filteredModelDataList = ref<ModelData[]>([]);

const columnList = computed(() => {
	return summary.value!.properties.map((property) => property.label);
});

const rowList = computed<ModelData[]>(() => {
	const list: ModelData[] = [];

	for (const model of modelList.value) {
		const data: ModelData = {
			id: model.id,
			name: model.name,
			scores: [...model.score.summary[props.summaryId]!.legacy!],
		};

		list.push(data);
	}

	return list;
});

onBeforeMount(async () => {
	const summaryData = await SummaryAPI.get();

	summary.value = summaryData;
	modelList.value = await Backend.API.Model.queryHasSummary(props.summaryId);
});

defineOptions({ name: 'AppPageLeaderboardDetailSummaryScoreCard' });
</script>
