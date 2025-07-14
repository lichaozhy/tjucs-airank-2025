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
				<div class="text-body1 q-myb-lg">
					{{ LEADERBOARD_DESCRIPTION_RECORD[leaderboard] }}
				</div>

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
				label="Contribute Benchmark →"
				flat
				dense
				no-caps
				:to="{
					name: 'app.googleform',
					params: { id: '2ncVcX8K6quaEc7TA' },
					query: { height: 2029 },
				}"
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
	COMMENT: `Embodied Arena is an open-source, comprehensive, and user-friendly
	evaluation system and platform for embodied AI models. It features three
	types of core embodied tasks, a diverse range of high-quality benchmarks, an
	LLM-driven automatic evaluation data generation framework, and a systematic
	embodied capability taxonomy. Moreover, Embodied Arena offers professional
	supports for advanced models and new benchmarks to join. The aim of Embodied
	Arena is to present an up-to-date overview of embodied capabilities of
	advanced models and facilitate the identification of critical research areas,
	thereby accelerating progress in the field of Embodied AI.`,
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
				'VABench-Point',
			],
		},
		{
			LABEL: 'Navigation',
			ICOM: 'near_me',
			NAME: 'nav',
			BENCHMARKS: ['EB-Navigation', 'VLN-CE R2R', 'VLN-CE RxR'],
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

const LEADERBOARD_DESCRIPTION_RECORD: Record<string, string> = {
	qa: `The Embodied Question Answering Leaderboard is a dedicated ranking
	system for evaluating and comparing the performance of embodied AI models
	in question-answering tasks. This platform integrates several representative
	evaluation benchmarks, such as OpenEQA and VSI-Bench, aiming to help
	researchers quickly understand the performance of different models in
	embodied question answering tasks.`,
	nav: `The Embodied Navigation Leaderboard is a dedicated ranking system for
	evaluating and comparing the performance of embodied AI models in navigation
	tasks. This platform integrates several representative evaluation benchmarks,
	such as EB-Navigation and VLN-CE R2R, aiming to help researchers quickly
	understand the performance of different models in embodied navigation tasks.`,
	task: `The Embodied Task Planning Leaderboard is a dedicated ranking system
	for evaluating and comparing the performance of embodied AI models in task
	planning. This platform integrates several representative evaluation
	benchmarks, such as ET-Plan-Bench and EB-Habitat, aiming to help researchers
	quickly understand the performance of different models in embodied task
	planning.`,
};

const BENCHMARK_DESCRIPTION_RECORD: Record<string, string> = {
	UniEQA: `UniEQA, a new unified evaluation benchmark for embodied artificial
	intelligence, is designed to evaluate MLLMs in terms of 5 core capabilities
	with 12 detailed dimensions. The benchmark is established based on seven
	heterogeneous data sources, covering simulated and real-world scenarios. The
	benchmark contains a total of 5378 question-answer pairs, of which 4445 are
	completely different questions format. By integrating multiple existing EQA
	benchmarks with newly annotated datasets and performing manual review, UniEQA
	effectively ensures its reliability, comprehensiveness and diversity.`,

	OpenEQA: `OpenEQA is the first open-vocabulary benchmark dataset for EQA
	supporting both episodic memory and active exploration use cases. OpenEQA
	contains over 1600 high-quality human generated questions drawn from over 180
	real-world environments. OpenEQA stands out as a straightforward, measurable,
	and practically relevant benchmark that poses a considerable challenge to
	current generation of AI models.`,

	VSI: `VSI-Bench quantitatively evaluates the visual-spatial intelligence of
	MLLMs from egocentric video. VSI-Bench comprises over 5,000 question-answer
	pairs derived from 288 real videos. These videos are sourced from the
	validation sets of the public indoor 3D scene reconstruction datasets
	ScanNet, ScanNet++, and ARKitScenes, and represent diverse environments --
	including residential spaces, professional settings (e.g., offices, labs),
	and industrial spaces (e.g., factories) and multiple geographic regions. By
	repurposing these existing 3D reconstruction and understanding datasets,
	VSI-Bench benefits from accurate object-level annotations, which are used in
	question generation and could support future studies exploring the connection
	between MLLMs and 3D reconstruction.`,

	ERQA: `To advance embodied reasoning in Vision-Language Models (VLMs), ERQA
	(Embodied Reasoning Question Answering) is introduced as a benchmark
	specifically targeting capabilities essential for agents interacting with the
	physical world. ERQA includes 400 multiple-choice Visual Question Answering
	(VQA)-style questions spanning a diverse set of categories, such as spatial
	reasoning, trajectory reasoning, action reasoning, state estimation,
	pointing, multi-view reasoning, and task reasoning. Unlike existing VLM
	benchmarks that primarily focus on atomic skills like object recognition,
	counting, or localization, ERQA emphasizes higher-level reasoning skills
	critical for physical interaction, making it a complementary addition to
	current evaluation suites.`,

	SQA3D: `SQA3D is a benchmark designed for embodied scene understanding,
	aiming to bridge the gap between 3D scene comprehension and embodied AI. In
	the SQA3D task, the tested agent must first comprehend its situation within
	a 3D environment—such as position and orientation—based on a textual
	description. It then reasons about the surrounding scene and answers a
	corresponding question. The benchmark is constructed using 650 scenes from
	the ScanNet dataset, encompassing approximately 6.8k unique situations. It
	includes 20.4k textual descriptions and 33.4k diverse reasoning questions
	tailored to these situations. These questions evaluate a broad spectrum of
	reasoning capabilities in intelligent agents, including spatial
	understanding, commonsense reasoning, navigation, and multi-hop inference.`,

	ScanQA: `ScanQA is a benchmark designed to evaluate 3D spatial
	understanding through the task of 3D question answering (3D-QA). In this
	task, models are given full 3D representations of indoor scenes—captured as
	rich RGB-D scans—and are required to answer free-form textual questions
	grounded in the 3D environment. Unlike traditional 2D question answering
	tasks, 3D-QA demands a deeper understanding of spatial relationships, object
	locations, orientations, and contextual alignment within three-dimensional
	space. ScanQA includes over 41,000 human-edited question-answer pairs
	collected from 800 indoor scenes based on the ScanNet dataset. It poses
	unique challenges in linking natural language to spatially grounded visual
	information, offering a comprehensive benchmark for evaluating multimodal
	reasoning in 3D environments.`,

	Scan2Cap: `Scan2Cap is a benchmark for dense captioning in 3D scans captured
	using commodity RGB-D sensors. It focuses on the task of generating natural
	language descriptions for multiple objects within a 3D scene, given as a
	point cloud. Each object is annotated with a 3D bounding box and an
	associated textual description, enabling the joint evaluation of object
	localization and language generation. The benchmark emphasizes detailed scene
	understanding by requiring models to capture both the geometric properties of
	objects and their contextual relationships. Built on the ScanRefer dataset,
	Scan2Cap provides a challenging testbed for evaluating multimodal models that
	combine 3D perception with language capabilities.`,

	PhyBlock: `PhyBlock, a progressive benchmark designed to assess VLMs on
	physical understanding and planning through robotic 3D block assembly tasks.
	PhyBlock integrates a novel four-level cognitive hierarchy assembly task
	alongside targeted Visual Question Answering (VQA) samples, collectively
	aimed at evaluating progressive spatial reasoning and fundamental physical
	comprehension, including object properties, spatial relationships, and
	holistic scene understanding. PhyBlock includes 2600 block tasks (400
	assembly tasks, 2200 VQA tasks) and evaluates models across three key
	dimensions: partial completion, failure diagnosis, and planning robustness.`,

	MineAnyBuild: `MineAnyBuild, a comprehensive benchmark to evaluate the
	spatial planning abilities of open-world AI agents in Minecraft, requires
	them to generate building plans from multi-modal instructions. It includes
	4,000 curated tasks and supports scalable data collection through
	player-generated content, evaluating spatial understanding, reasoning,
	creativity, and commonsense. The evaluation reveals significant limitations
	but also great potential in current MLLM-based agents, highlighting the
	importance of MineAnyBuild for advancing spatial intelligence in AI.`,

	RoboVQA: `RoboVQA consists of 238h (10 days) of (video, text) pairs coming
	from recordings of long-horizon instructions being performed by 3 different
	embodiments (robot, human, human with tool) in a same environment (3
	corporate buildings).`,

	where2place: `Where2Place is a benchmark for spatial free-space reference
	on challenging real world images This dataset contains 100 real-world images
	to evaluate free space reference using spatial relations. The images are
	collected from various cluttered environments. Each image is labeled with a
	sentence describing the desired some free space and a mask of the desired
	region.`,

	'VABench-Point': `VABench, a challenging benchmark with 300 manually
	annotated problems from real-world and simulation datasets (OXE, BridgeData,
	Droid). VABench evaluates models' abilities to generate spatial affordance
	and visual traces from natural language instructions, using metrics including
	point accuracy, trajectory MAE/RMSE, and GPT-based qualitative scoring.`,

	'EB-Navigation': `EB-Navigation is the navigation-focused benchmark within
	EmbodiedBench, designed to evaluate the low-level perception, grounding, and
	action prediction capabilities of Multimodal Large Language Models (MLLMs).
	It is built on AI2-THOR environments with tasks derived from the VLN-CE
	(Vision-and-Language Navigation in Continuous Environments) protocol, but
	restructured to use step-wise high-level commands.`,

	'VLN-CE R2R': `VLN-CE R2R dataset consists of 4475 trajectories. For each
	trajectory, R2R-CE provides the multiple natural language instructions from
	R2R and a pre-computed shortest path following the waypoints via low-level
	actions. The low-level action space of R2R-CE makes trajectories
	significantly longer horizon tasks – with an average of 55.88 steps
	compared to the 4-6 in R2R.`,

	'VLN-CE RxR': `VLN-CE RxR is a dataset of human-annotated navigation
	instructions in English, Hindi and Telugu, matched to navigation paths
	through reconstructed buildings from the Matterport3D dataset. Compared to
	similar datasets, VLN-CE RxR is multilingual and an order of magnitude
	larger, and every instruction is validated by a separate annotator.
	urthermore, each word in each instruction is time-aligned to the virtual
	poses of instruction creators and validators. VLN-CE RxR dataset contains
	instructions of fine granularity that describe rich landmarks and longer
	trajectories, which establishes a large language and visual gap that is
	suitable for evaluating the generalization potential of the methods.`,

	'ET-Plan-Bench': `The ET-Plan-Bench focuses on various aspects of spatial
	understanding, including relation constraints, object occlusion, and global
	layout maps, as well as temporal understanding, covering action dependencies
	and optimal moving paths for robots. It provides a detailed and thorough
	diagnostic assessment of existing foundation models.`,

	'EB-ALFRED': `EB-ALFRED is a high-level embodied planning benchmark
	introduced in EmbodiedBench, built on top of the ALFRED dataset and AI2-THOR
	simulator. Unlike traditional embodied settings that require pixel-level
	control, EB-ALFRED abstracts away low-level actions and focuses solely on
	symbolic high-level planning with language and vision input.`,

	'EB-Habitat': `EB-Habitat is the 3D embodied navigation benchmark in
	EmbodiedBench, built on the HM3D dataset and executed in the Habitat 2.0
	simulator. It evaluates an agent’s ability to perform long-horizon
	goal-directed navigation using only egocentric vision and natural language
	instructions, without access to ground-truth maps or GPS.`,
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
