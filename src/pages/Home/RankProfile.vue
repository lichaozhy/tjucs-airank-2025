<template>
	<div class="col-shrink">
		<div class="column content-center items-center text-center">
			<h2 class="text-indigo-10 text-weight-bold">{{ PROFILE.TITLE }}</h2>
			<p
				class="text-body1 text-grey-8"
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
						v-for="category in MODEL_CATEGORY"
						:key="category.NAME"
						:label="`${category.LABEL} Models`"
						:name="category.NAME"
						:icon="category.ICON"
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
					style="height: 800px"
				>
					<q-tab-panel
						class="q-pa-none"
						v-for="category in MODEL_CATEGORY"
						:key="category.NAME"
						:name="category.NAME"
					>
						<q-table
							flat
							square
							:columns="columns"
							:rows="rows"
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
				label="Go to Embodied Rank to view the model evaluation →"
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
import { computed, ref } from 'vue';
import type * as Utils from 'src/spec';

const PROFILE = {
	TITLE: '50+ Advanced Models Have Joined Embodied Arena',
	COMMENT: `Embodied Arena evaluates both general large models and Embodied AI
	models, including both leading commercial models and advanced academic
	models, while eagerly calling for more open-/close-source models with
	professional and user-friendly evaluation support`,
};

const INTRODUCTION = {
	TITLE: '20+ Institutes, 30+ Advanced Models',
};

const MODEL_CATEGORY = [
	{
		NAME: 'language',
		LABEL: 'General Large',
		ICON: 'psychology',
		RECORD: [
			{
				organizationList: ['OpenAI'],
				modelList: ['GPT-4o', 'GPT-4V', 'GPT-3.5-Turbo'],
			},
			{
				organizationList: ['Google DeepMind'],
				modelList: ['Gemini-2.0-Flash', 'Gemini-2.0-Pro', 'Gemini-2.5-Pro'],
			},
			{
				organizationList: ['Anthropic'],
				modelList: ['Claude-3.5-Sonnet', 'Claude-3.7-Sonnet'],
			},
			{
				organizationList: ['Alibaba Group'],
				modelList: [
					'Qwen-VL-Max',
					'Qwen2.5-VL-3B-Ins',
					'Qwen2.5-VL-7B-Ins',
					'Qwen2.5-VL-72B-Ins',
				],
			},
			{
				organizationList: ['ByteDance'],
				modelList: ['Seed1.5-VL', 'LLaVA-OneVision'],
			},
			{
				organizationList: ['Shanghai AI Lab', 'Tsinghua'],
				modelList: ['InternVL3'],
			},
			{
				organizationList: ['NVIDIA'],
				modelList: ['VILA-1.5'],
			},
		],
	},
	{
		NAME: 'embodied',
		LABEL: 'Embodied AI',
		ICON: 'smart_toy',
		RECORD: [
			{
				organizationList: ['Beijing Jiaotong University', 'Peking University'],
				modelList: ['PhysVLM'],
			},
			{
				organizationList: ['Tianjin University'],
				modelList: ['RoboBrain', 'RoboAnnotatorX', 'Embodied-FSD'],
			},
			{
				organizationList: ['The University of Hong Kong'],
				modelList: ['EmbodiedGPT'],
			},
			{
				organizationList: ['Boston University'],
				modelList: ['SAT'],
			},
			{
				organizationList: ['University of Washington'],
				modelList: ['RoboPoint'],
			},
			{
				organizationList: ['Shanghai Jiao Tong University'],
				modelList: ['SpatialBot'],
			},
			{
				organizationList: ['Google DeepMind'],
				modelList: ['SpatialVLM'],
			},
			{
				organizationList: ['Huawei Noah\'s Ark Lab'],
				modelList: ['SpatialCoT'],
			},
			{
				organizationList: ['Peking University'],
				modelList: ['UniNavid', 'Navid'],
			},
			{
				organizationList: ['The Chinese University of Hong Kong'],
				modelList: ['Video-3D LLM', 'LLaVA-3D'],
			},
			{
				organizationList: ['The University of Hong Kong', 'Shanghai AI Lab'],
				modelList: ['GPT4Scene'],
			},
			{
				organizationList: ['Shanghai AI Lab', 'Zhejiang University'],
				modelList: ['Grounded-3D-LLM'],
			},
			{
				organizationList: ['Beijing University of Posts and Telecom'],
				modelList: ['3DMIT'],
			},
			{
				organizationList: ['UMass Amherst'],
				modelList: ['3D-Mem'],
			},
			{
				organizationList: ['Huawei Noah\'s Ark Lab'],
				modelList: ['Mem2Ego'],
			},
		],
	},
];

const category = ref<string>(MODEL_CATEGORY[0]!.NAME);

const columns = [
	{
		name: 'org',
		label: 'Institute',
		field: 'organizationList',
		align: 'left' as Utils.Alignment,
		headerStyle: 'width: 30em',
	},
	{
		name: 'model',
		label: 'Model',
		field: 'modelList',
		align: 'left' as Utils.Alignment,
	},
];

const rows = computed(() => {
	return MODEL_CATEGORY.find(({ NAME }) => NAME === category.value)!.RECORD;
});

defineOptions({ name: 'AppPageHomeRankProfile' });
</script>
