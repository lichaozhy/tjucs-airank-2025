<template>
	<div class="col-shrink">
		<div class="column content-center items-center text-center">
			<h2 class="text-indigo-10 text-weight-bold">{{ data.title }}</h2>
			<app-markdown-html
				class="text-body1 text-grey-8 self-center"
				style="max-width: 70em"
				src="page/home/profile/capability"
			></app-markdown-html>
		</div>

		<div class="bg-indigo-10 text-h5 q-pa-md q-mt-xl text-white">
			{{ detail.title }}
		</div>

		<q-space class="q-my-lg" />

		<div class="row q-col-gutter-lg no-wrap"
					v-if="level0Id !== null">
			<div class="col-grow row">
				<q-tabs
					vertical
					stretch
					inline-label
					v-model="level0Id"
				>
					<q-tab
						content-class="q-pr-lg q-py-sm"
						v-for="item in data.itemList"
						:key="item.id"
						:label="levelORecord[item.id]!.name"
						:icon="item.icon"
						style="justify-content: start"
						:name="item.id"
					></q-tab>
				</q-tabs>
				<q-separator
					vertical
					class="full-height"
					color="indigo-1"
				/>
			</div>

			<div class="col relative-postion text-black">
				<app-markdown-html
					class="q-mb-md"
					style="height: 14em"
					:src="`capability/children/${level0Id}`"
				/>

				<div class="text-h5 text-center text-weight-medium q-mt-md">
					{{ mapping.title }}
				</div>
				<app-markdown-html
					class="text-caption text-center q-mt-sm"
					src="page/home/profile/capability/mapping"
					style="font-size: 12px"
				></app-markdown-html>

				<q-tabs
					v-model="level1Id"
					class="q-mt-sm"
					v-if="level1Id !== null"
				>
					<q-tab
						v-for="item in levelORecord[level0Id!]!.children!"
						:key="item.id"
						:label="item.name"
						:name="item.id"
						no-caps
						align="justify"
						narrow-indicator
					></q-tab>
				</q-tabs>

				<q-tab-panels
					class="bg-transparent"
					v-model="level1Id"
					infinite
					style="height: 20em"
				>
					<q-tab-panel
						class="q-px-none"
						v-for="item in levelORecord[level0Id!]!.children!"
						:key="item.id"
						:name="item.id"
					>
						<app-markdown-html
							class="app-capability-markdown"
							:src="`capability/children/${level0Id}/children/${level1Id}`"
						/>
					</q-tab-panel>
				</q-tab-panels>
			</div>
		</div>
		<q-toolbar class="q-mt-xl justify-around">
			<q-btn
				label="Go to User Guide to View more Details about Capabilities →"
				flat
				dense
				:to="{ name: 'app.guide' }"
				no-caps
			></q-btn>
			<q-btn
				label="Go to Embodied Capbility Leaderboard to view the evaluation regarding capabilities →"
				flat
				dense
				:to="{ name: 'app.leaderboard.capability' }"
				no-caps
			></q-btn>
		</q-toolbar>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import * as Backend from 'src/backend';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

interface CapabilityItemAbastract {
	id: string;
	name: string;
	children?: CapabilityItemAbastract[];
	[key: string]: unknown;
}

const data = ref<{
	title: string;
	itemList: {
		id: string;
		icon: string;
	}[];
}>({ title: '', itemList: [] });

const detail = ref<{ title: string }>({ title: '' });
const mapping = ref<{ title: string }>({ title: '' });
const levelORecord = ref<Record<string, CapabilityItemAbastract>>({});
const level0Id = ref<string | null>(null);
const level1Id = ref<string | null>(null);

watch(level0Id, (level0Id) => {
	if (level0Id === null) {
		return;
	}

	level1Id.value = levelORecord.value[level0Id]!.children![0]!.id;
});

onBeforeMount(async () => {
	data.value = await Backend.API.Page.Home.Profile.Capability.get();

	for (const itemData of await Backend.API.Capability.query()) {
		const childItemList = await Backend.API.Capability(itemData.id).query();

		levelORecord.value[itemData.id] = {
			...itemData,
			children: childItemList.map(({ id, name }) => ({ id, name })),
		};
	}

	level0Id.value = data.value.itemList[0]!.id;
	detail.value = await Backend.API.Page.Home.Profile.Capability.Detail.get();
	mapping.value = await Backend.API.Page.Home.Profile.Capability.Mapping.get();
});

defineOptions({ name: 'AppPageHomeCapabilityProfile' });
</script>

<style>
.app-capability-markdown {
	table {
		margin: 0;
		td,
		th {
			padding: 0.2em 0.5em;
		}
	}

	img {
		width: 90%;
	}
}
</style>
