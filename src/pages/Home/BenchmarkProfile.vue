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
					v-model="leaderboard"
				>
					<q-tab
						content-class="q-pr-lg q-py-sm"
						v-for="leaderboard in INTRODUCTION.LEADERBOARD"
						:key="leaderboard.NAME"
						:label="leaderboard.LABEL"
						:icon="leaderboard.ICOM"
						style="justify-content: start"
						:name="leaderboard.NAME"
					></q-tab>
				</q-tabs>

				<q-separator
					vertical
					class="full-height"
					color="indigo-1"
				/>
			</div>

			<div class="col-shrink relative-postion text-black">
				<div class="text-body1 q-myb-lg">{{ lorem }}</div>

				<div class="text-h5 text-center text-weight-medium q-mt-lg">
					Benchmarks
				</div>

				<q-tabs
					v-model="benchmark"
					class="q-mt-md"
				>
					<q-tab
						v-for="name in benchmarkList"
						:key="name"
						:label="name"
						:name="name"
						no-caps
						align="justify"
						narrow-indicator
					></q-tab>
				</q-tabs>

				<q-tab-panels
					class="bg-transparent"
					v-model="benchmark"
					animated
					swipeable
					infinite
					style="height: 200px"
				>
					<q-tab-panel
						class="q-px-none text-body1"
						v-for="name in benchmarkList"
						:key="name"
						:name="name"
					>
						{{ BENCHMARK_DESCRIPTION_RECORD[name] }}
					</q-tab-panel>
				</q-tab-panels>
			</div>
		</div>
		<q-toolbar class="q-mt-lg justify-around">
			<q-btn
				label="View Leaderboards →"
				flat
				dense
				:to="{ name: 'app.leaderboard' }"
				no-caps
			></q-btn>
			<q-btn
				label="Go to Embodied Benchmarks to view all benchmarks →"
				flat
				dense
				:to="{ name: 'app.benchmark' }"
				no-caps
			></q-btn>
		</q-toolbar>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const PROFILE = {
	TITLE: 'What is Embodied Arena?',
	COMMENT: `An open-source, comprehensive, and user-friendly evaluation system
	and platform for embodied AI models, with foundational/core embodied tasks,
	diverse high-quality benchmarks and systematic capability dimesions,
	supporting both academic and industrial needs`,
};

const INTRODUCTION = {
	TITLE: '3 Types of Leaderboards, 17 Evaluation Benchmarks',
	LEADERBOARD: [
		{
			LABEL: 'Question Answering',
			ICOM: 'question_answer',
			NAME: 'qa',
			BENCHMARKS: [
				'UniEQA',
				'OpenEQA',
				'VSI',
				'ERQA',
				'SQA3D',
				'ScanQA',
				'Scan2Cap',
				'PhyBlock',
				'MineAnyBuild',
				'RoboVQA',
				'where2place',
			],
		},
		{
			LABEL: 'Navigation',
			ICOM: 'near_me',
			NAME: 'nav',
			BENCHMARKS: ['EB-Navigation', 'VLN-CE R2R', 'VLN-CE RxR', 'hm3d', 'mp3d'],
		},
		{
			LABEL: 'Task Planning',
			ICOM: 'view_timeline',
			NAME: 'task',
			BENCHMARKS: ['ET-Plan-Bench', 'EB-ALFRED', 'EB-Habitat'],
		},
	],
};

const lorem =
	'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.';

const BENCHMARK_DESCRIPTION_RECORD: Record<string, string> = {
	'EB-Navigation':
		'EB-Navigation is the navigation-focused benchmark within EmbodiedBench, designed to evaluate the low-level perception, grounding, and action prediction capabilities of Multimodal Large Language Models (MLLMs). It is built on AI2-THOR environments with tasks derived from the VLN-CE (Vision-and-Language Navigation in Continuous Environments) protocol, but restructured to use step-wise high-level commands.',
	'VLN-CE R2R':
		'The R2R_VLNCE dataset is a port of the Room-to-Room (R2R) dataset created by Anderson et al for use with the Matterport3DSimulator (MP3D-Sim).',
	'VLN-CE RxR':
		'RxR was ported to continuous environments originally for the RxR-Habitat Challenge. The dataset has train, val_seen, val_unseen, and test_challenge splits with both Guide and Follower trajectories ported.',
	'ET-Plan-Bench':
		'The ET-Plan-Bench focuses on various aspects of spatial understanding, including relation constraints, object occlusion, and global layout maps, as well as temporal understanding, covering action dependencies and optimal moving paths for robots. It provides a detailed and thorough diagnostic assessment of existing foundation models.',
	'EB-ALFRED':
		'EB-ALFRED is a high-level embodied planning benchmark introduced in EmbodiedBench, built on top of the ALFRED dataset and AI2-THOR simulator. Unlike traditional embodied settings that require pixel-level control, EB-ALFRED abstracts away low-level actions and focuses solely on symbolic high-level planning with language and vision input.',
	'EB-Habitat':
		'EB-Habitat is the 3D embodied navigation benchmark in EmbodiedBench, built on the HM3D dataset and executed in the Habitat 2.0 simulator. It evaluates an agent’s ability to perform long-horizon goal-directed navigation using only egocentric vision and natural language instructions, without access to ground-truth maps or GPS.',
};

for (const benchmarkName of INTRODUCTION.LEADERBOARD.map(
	({ BENCHMARKS }) => BENCHMARKS,
).flat()) {
	if (!Object.hasOwn(BENCHMARK_DESCRIPTION_RECORD, benchmarkName)) {
		BENCHMARK_DESCRIPTION_RECORD[benchmarkName] = lorem + lorem + lorem;
	}
}

const leaderboard = ref<string>('qa');
const benchmark = ref<string>('');

const benchmarkList = computed(() => {
	return INTRODUCTION.LEADERBOARD.find(
		({ NAME }) => NAME === leaderboard.value,
	)!.BENCHMARKS;
});

watch(
	leaderboard,
	() => {
		benchmark.value = benchmarkList.value[0]!;
	},
	{ immediate: true },
);

defineOptions({ name: 'AppPageHomeBenchmarkProfile' });
</script>
