<template>
	<div class="col-shrink">
		<div class="column content-center items-center text-center">
			<h2 class="text-indigo-10 text-weight-bold">{{ PROFILE.TITLE }}</h2>
			<p
				class="text-body1 text-grey-8 self-center"
				style="max-width: 70em"
			>
				{{ PROFILE.COMMENT }}
			</p>
		</div>

		<div class="bg-indigo-10 text-h5 q-pa-md q-mt-xl text-white">
			{{ INTRODUCTION.TITLE }}
		</div>

		<q-space class="q-my-lg" />

		<div class="row q-col-gutter-lg no-wrap">
			<div class="col-grow row">
				<q-tabs
					vertical
					stretch
					inline-label
					v-model="group"
				>
					<q-tab
						content-class="q-pr-lg q-py-sm"
						v-for="group in groupList"
						:key="group.id"
						:label="group.name"
						:icon="group.icon"
						style="justify-content: start"
						:name="group.id"
					></q-tab>
				</q-tabs>
				<q-separator
					vertical
					class="full-height"
					color="indigo-1"
				/>
			</div>

			<div class="col relative-postion text-black">
				<div
					class="app-markdown-html q-mb-md"
					style="height: 8em;"
					v-html="groupContent"
				></div>

				<div class="text-h5 text-right text-weight-medium q-mt-md">
					Sub Capabilities
				</div>

				<q-tabs
					v-model="item"
					class="q-mt-md"
				>
					<q-tab
						v-for="item in itemList"
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
					v-model="item"
					animated
					swipeable
					infinite
					style="height: 16em"
				>
					<q-tab-panel
						class="q-px-none"
						v-for="item in itemList"
						:key="item.id"
						:name="item.id"
					>
						<div
							class="app-markdown-html"
							v-html="itemContent"
						></div>
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
				label="Go to XXXX to view the evaluation regarding capabilities →"
				flat
				dense
				:to="{ name: 'app.benchmark' }"
				no-caps
			></q-btn>
		</q-toolbar>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';

const PROFILE = {
	TITLE: 'Systematic Embodied Capability Taxonomy',
	COMMENT: `Embodied Arena uses a systematic taxonomy of emboidied capability,
	carefully sifted and refined from diverse embodied tasks and benchmarks,
	aiming to provide concentrated metrics for reliable evlauation and essential
	objectives for research breakthrough`,
};

import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';

const groupDataList = ref<Spec.Capability.Group[]>([]);
const itemDataList = ref<Spec.Capability.Item[]>([]);

const INTRODUCTION = {
	TITLE: '7 Core/Embodied Capabilities, 30 Nuanced/Fine-grained/Refined/Detailed Dimensions',
};

const group = ref<string>('');
const item = ref<string>('');
const groupContent = ref<string>('');
const itemContent = ref<string>('');

const groupList = computed(() => {
	return [...groupDataList.value].sort((a, b) => a.order - b.order);
});

const itemList = computed(() => {
	const currentGroupId = group.value;

	return itemDataList.value
		.filter((item) => item.group === currentGroupId)
		.sort((a, b) => a.order - b.order);
});

watch(group, async (groupId) => {
	groupContent.value =
		await Backend.API.Document.Capability.Group(groupId).get();
	item.value = itemList.value[0]!.id;
});

watch(item, async (itemId) => {
	itemContent.value = await Backend.API.Document.Capability.Item(itemId).get();
});

onBeforeMount(async () => {
	itemDataList.value = await Backend.API.Capability.Item.query();
	groupDataList.value = await Backend.API.Capability.Group.query();
	group.value = groupDataList.value[0]!.id;
});

defineOptions({ name: 'AppPageHomeBenchmarkProfile' });
</script>
