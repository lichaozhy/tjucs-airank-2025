<template>
	<div class="col-shrink">
		<div class="column content-center items-center text-center">
			<h2 class="text-indigo-10 text-weight-bold">{{ data.title }}</h2>
			<app-markdown-html
				style="max-width: 70em;"
				class="text-grey-8"
				src="page/home/profile/model"
			></app-markdown-html>
		</div>

		<div class="bg-indigo-10 text-h5 q-pa-md q-mt-xl text-white">
			{{ detail.title }}
		</div>

		<q-space class="q-my-lg" />

		<div class="row q-col-gutter-lg no-wrap">
			<div
				class="col-shrink row"
				style="min-width: fit-content"
			>
				<q-tabs
					v-model="category"
					vertical
					stretch
					inline-label
				>
					<q-tab
						content-class="q-pr-lg q-py-sm"
						v-for="category in categoryList"
						:key="category.id"
						:label="`${category.label} Models`"
						:name="category.id"
						:icon="category.icon"
						narrow-indicator
						style="justify-content: start"
					></q-tab>
				</q-tabs>
				<q-separator
					vertical
					class="full-height"
					color="indigo-1"
				/>
			</div>
			<div class="col">
				<q-tab-panels
					class="bg-transparent full-width"
					v-model="category"
					animated
					swipeable
					infinite
					style="height: 84em"
				>
					<q-tab-panel
						class="q-pa-none"
						v-for="category in categoryList"
						:key="category.id"
						:name="category.id"
					>
						<q-table
							flat
							square
							:columns="columns"
							:rows="category.itemList"
							hide-pagination
							:pagination="{ rowsPerPage: 0 }"
							class="bg-transparent"
						>
							<template #body-cell-org="props">
								<q-td :props="props">{{
									props.row.organizationList.join(' / ')
								}}</q-td>
							</template>

							<template #body-cell-model="props">
								<q-td :props="props">{{
									props.row.modelList.join(' / ')
								}}</q-td>
							</template>
						</q-table>
					</q-tab-panel>
				</q-tab-panels>
			</div>
		</div>

		<q-toolbar class="q-mt-lg justify-around">
			<q-btn
				label="Go to Embodied Task Leaderboard to view the model evaluation →"
				flat
				dense
				no-caps
				:to="{ name: 'app.leaderboard' }"
			></q-btn>
			<q-btn
				label="Join Evaluation →"
				flat
				dense
				no-caps
				:to="{
					name: 'app.googleform',
					params: { id: 'CLAcMUbvU7TsNeKD8' },
					query: { height: 2157 },
				}"
			></q-btn>
		</q-toolbar>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';
import type * as Utils from 'src/spec';

import AppMarkdownHtml from 'components/MarkdownHTML.vue';

const data = ref<{
	title: string;
}>({
	title: '',
});

const detail = ref<{
	title: string;
}>({
	title: '',
});

const categoryList = ref<PageHomeModelProfileCategoryData[]>([]);

interface PageHomeModelProfileCategoryData {
	id: string;
	label: string;
	icon: string;
	itemList: {
		organizationList: string[];
		modelList: string[];
	}[];
}

const category = ref<string | null>(null);

const columns = [
	{
		name: 'org',
		label: 'Institute',
		field: 'organizationList',
		align: 'left' as Utils.Alignment,
		headerStyle: 'width: 40em',
	},
	{
		name: 'model',
		label: 'Model',
		field: 'modelList',
		align: 'left' as Utils.Alignment,
		style: 'white-space: normal',
	},
];

onBeforeMount(async () => {
	const _data = await Backend.API.Page.Home.Profile.Model.get();
	const _detail = await Backend.API.Page.Home.Profile.Model.Detail.get();

	const _categoryList = [
		await Backend.API.Page.Home.Profile.Model.Category.General.get(),
		await Backend.API.Page.Home.Profile.Model.Category.Embodied.get(),
	];

	category.value = _categoryList[0]!.id;
	categoryList.value = _categoryList;
	data.value = _data;
	detail.value = _detail;
});

defineOptions({ name: 'AppPageHomeRankProfile' });
</script>
