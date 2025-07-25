<template>
	<AppScoreCard>
		<template #header>
			<q-item class="card-header justify-between">
				<q-item-section>
					<div class="text-h6 text-weight-600 q-py-sm text-white row">
						<div class="col col-shrink">Embodied Capability Leaderboard</div>
						<div class="col col-shrink content-end">
							<div class="q-ml-lg text-weight-light text-body1">
								<slot name="subtitle"></slot>
							</div>
						</div>
					</div>
				</q-item-section>
				<q-item-section side>
					<AppModelFilter
						:models="props.rows"
						@filtered="(list) => (filteredModelDataList = list)"
					></AppModelFilter>
				</q-item-section>
			</q-item>
		</template>
		<AppScoreTable
			:columns="props.columns"
			:rows="filteredModelDataList"
			:groups="props.groups"
		></AppScoreTable>
	</AppScoreCard>
	<slot></slot>
</template>

<script setup lang="ts">
import type { ModelData, GroupOptions } from 'components/ScoreTable.vue';
import { ref } from 'vue';

import AppScoreCard from 'components/ScoreCard.vue';
import AppModelFilter from 'components/ModelFilter.vue';
import AppScoreTable from 'components/ScoreTable.vue';

const props = withDefaults(
	defineProps<{
		groups?: GroupOptions[] | null;
		columns?: string[];
		rows?: ModelData[];
	}>(),
	{
		groups: null,
		columns: () => [],
		rows: () => [],
	},
);

const filteredModelDataList = ref<ModelData[]>([]);

defineOptions({ name: 'AppPageLeaderboardCapabilityScoreCard' });
</script>
