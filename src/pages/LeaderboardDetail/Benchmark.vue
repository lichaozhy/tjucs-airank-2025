<template>
	<q-card square>
		<q-item class="card-header justify-between">
			<q-item-section class="col-shrink">
				<q-btn
					:to="{
						name: 'app.rank.leaderboard',
						params: { leaderboardId, benchmarkId: benchmark.id },
					}"
					dense
					no-caps
					square
					flat
					class="col-shrink text-white"
					size="lg"
				>
					<div class="text-weight-light">{{ benchmark.name }} Benchmark</div>
				</q-btn>
			</q-item-section>
		</q-item>

		<q-table
			class="my-sticky-column-table fixed-layout-table width-full"
			:rows="rowList"
			:columns="columnList"
			hide-pagination
			square
			flat
			:pagination="{ rowsPerPage: 30 }"
			bordered
			dense
		>
			<template v-slot:body-cell-model="props">
				<q-td :props="props">
					<router-link
						style="text-decoration: none"
						:to="{ name: 'app.model.detail', params: { id: props.row.model.id } }"
						class="col-shrink text-primary"
					>
						<div class="q-px-xs text-weight-light">{{ props.row.model.name }}</div>
					</router-link>
				</q-td>
			</template>

			<template
				v-for="property in benchmark.properties"
				:key="property.index"
				#[`body-cell-item-${property.index}`]="props"
			>
				<q-td :props="props">{{ toNoneOrFixed(props.row[`property:${property.index}`]) }}</q-td>
			</template>
		</q-table>
	</q-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';
import { getColumnEMWidth, toNumberOrNull } from './utils';

const { leaderboardId, benchmark } = defineProps<{
	leaderboardId: string;
	benchmark: Spec.Benchmark.Type;
}>();

const BenchmarkAPI = Backend.API.Benchmark(benchmark.id);
const scoreList = ref<Spec.Score.Type[]>([]);
const modelList = ref<Spec.Model.Type[]>([]);

async function fetchModelFromScore(score: Spec.Score.Type) {
	return Backend.API.Model(score.model).get();
}

function toNoneOrFixed(value: number | null) {
	return value === null ? '-' : value.toFixed(2);
}

const isReady = computed(() => {
	if (scoreList.value.length === 0) {
		return false;
	}

	if (modelList.value.length === 0) {
		return false;
	}

	return true;
});

interface RowData {
	model: Spec.Model.Type;
	[key: `property:${string}`]: number | null;
}

const rowList = computed<RowData[]>(() => {
	const list: RowData[] = [];

	if (isReady.value) {
		const scoreRecord = Object.groupBy(scoreList.value, (score) => score.model);
		const propertyList = Object.values(benchmark.properties);

		for (const model of modelList.value) {
			const rowData: RowData = { model };
			const { items } = scoreRecord[model.id]![0]!;

			for (const { index } of propertyList) {
				rowData[`property:${index}`] = toNumberOrNull(items[index]!);
			}

			list.push(rowData);
		}
	}

	return list;
});

const columnList = computed(() => {
	if (!isReady.value) {
		return [];
	}

	const itemColumns = Object.values(benchmark.properties)
		.sort((a, b) => a.order - b.order)
		.map((property) => {
			return {
				name: `item-${property.index}`,
				field: `property:${property.index}`,
				label: property.label,
				align: 'right' as 'left' | 'right' | 'center',
				sortable: true,
				headerStyle: `width: ${getColumnEMWidth(property.label.length)}em`,
			};
		});

	return [
		{
			name: 'model',
			label: 'Model',
			field: 'model',
			align: 'left' as 'left' | 'right' | 'center',
			headerStyle: 'width: 260px;',
		},
		...itemColumns,
		{
			name: 'blank',
			label: ' ',
			field: () => null,
		},
	];
});

onBeforeMount(async () => {
	scoreList.value = await BenchmarkAPI.Score.query();
	modelList.value = await Promise.all(scoreList.value.map(fetchModelFromScore));
});

defineOptions({ name: 'AppBenchmark' });
</script>

<style lang="scss">
.rank-number {
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	height: 100%;
	width: 100%;

	color: white;
	font-size: 0.7em;
	font-weight: bold;
}

.rank-number-best {
	top: 12%;
}

.rank-number-rest {
	top: 4%;
}
</style>
