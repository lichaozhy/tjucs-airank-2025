<template>
	<q-table
		class="app-rank-table fixed-layout-table width-full"
		:rows="rowList"
		:columns="columnList"
		hide-pagination
		square
		flat
		:pagination="{ rowsPerPage: 30 }"
		bordered
	>
		<template #body-cell-rank="props">
			<q-td :props="props">
				<AppRankBadge :order="props.rowIndex + 1"></AppRankBadge>
			</q-td>
		</template>

		<template v-slot:body-cell-model="props">
			<q-td :props="props">
				<router-link
					style="text-decoration: none"
					:to="{
						name: 'app.model.detail',
						params: { id: props.row.model.id },
					}"
					class="col-shrink text-black"
				>
					<div class="text-weight-medium">{{ props.row.model.name }}</div>
				</router-link>
			</q-td>
		</template>

		<template
			v-for="property in benchmark.properties"
			:key="property.index"
			#[`body-cell-item-${property.index}`]="props"
		>
			<q-td :props="props">{{
				toNoneOrFixed(props.row[`property:${property.index}`])
			}}</q-td>
		</template>
	</q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toNoneOrFixed } from './utils';

const props = withDefaults(defineProps<{
	rows?: object[];
	columns?: string[];
}>(), {
	rows: () => [],
	columns: () => [],
});

const columnList = computed(() => {
	return [];
});

const rowList = computed(() => {
	return [];
});

defineOptions({ name: 'AppLeaderboardScoreTable' });
</script>
