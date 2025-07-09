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
	types of core embodied tasks, a diverse range of high-quality benchmarks,
	LLM-driven automatic evaluation data generation, and a systematic embodied
	capability texnomy. Moreover, Embodied Arena offers professional supports for
	advanced models and new benchmarks to join. The aim of Embodied Arena is to
	present an up-to-date overview of embodied capabilities of advanced models
	and facilitate the identification of critical research areas, thereby
	accelerating progress in the field of Embodied AI.`,
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
	UniEQA:
		'UniEQA, a new unified evaluation benchmark for EAI, is designed to evaluate MFMs in terms of 5 core capabilities with 12 detailed dimensions. The benchmark is established based on seven heterogeneous data sources, covering simulated and real-world scenarios. Additionally, it includes more realistic, diverse, and complex household tasks.',
	OpenEQA:
		'OpenEQA, the first open-vocabulary benchmark supporting both approaches, along with an LLM-powered evaluation protocol that aligns well with human judgment. Experiments show state-of-the-art models still lag behind humans, making OpenEQA a challenging and practical benchmark for future research in Embodied AI and related fields.',
	VSI: 'VSI-Bench quantitatively evaluates the visual-spatial intelligence of MLLMs from egocentric video. VSI-Bench comprises over 5,000 question-answer pairs derived from 288 real videos. These videos are sourced from the validation sets of the public indoor 3D scene reconstruction datasets ScanNet, ScanNet++, and ARKitScenes, and represent diverse environments -- including residential spaces, professional settings (e.g., offices, labs), and industrial spaces (e.g., factories) and multiple geographic regions. By repurposing these existing 3D reconstruction and understanding datasets, VSI-Bench benefits from accurate object-level annotations, which are used in question generation and could support future studies exploring the connection between MLLMs and 3D reconstruction.',
	ERQA: 'To advance embodied reasoning in Vision-Language Models (VLMs), ERQA (Embodied Reasoning Question Answering) is introduced as a benchmark specifically targeting capabilities essential for agents interacting with the physical world. ERQA includes 400 multiple-choice Visual Question Answering (VQA)-style questions spanning a diverse set of categories, such as spatial reasoning, trajectory reasoning, action reasoning, state estimation, pointing, multi-view reasoning, and task reasoning. Unlike existing VLM benchmarks that primarily focus on atomic skills like object recognition, counting, or localization, ERQA emphasizes higher-level reasoning skills critical for physical interaction, making it a complementary addition to current evaluation suites.',
	SQA3D:
		'This work introduces a new benchmark for embodied scene understanding, aimed at bridging the gap between 3D scene comprehension and embodied AI. In the SQA3D task, the tested agent is required to first understand its situation (e.g., position, orientation, etc.) in a 3D scene, as described by text. It then needs to reason about the surrounding environment and answer a question based on that situation. The benchmark is built upon 650 scenes from the ScanNet dataset, offering a dataset centered around 6.8k unique situations. This dataset includes 20.4k descriptions and 33.4k diverse reasoning questions designed for these situations. The questions test a wide range of reasoning capabilities for intelligent agents, from spatial relation understanding to commonsense reasoning, navigation, and multi-hop reasoning.',
	ScanQA:
		'This work introduces a new 3D spatial understanding task for 3D question answering (3D-QA). In the 3D-QA task, models are provided with visual information from the entire 3D scene of a rich RGB-D indoor scan and are tasked with answering textual questions about the 3D scene. Unlike 2D question answering (2D-QA), conventional 2D-QA models face challenges in spatial understanding, particularly in object alignment and directions, and struggle with object localization based on textual questions in the 3D-QA context. A baseline model for 3D-QA, called ScanQA, is proposed. ScanQA learns a fused descriptor from 3D object proposals and encoded sentence embeddings. This learned descriptor correlates language expressions with the underlying geometric features of the 3D scan and enables the regression of 3D bounding boxes to identify the objects described in the textual questions. Human-edited question-answer pairs with free-form answers grounded in 3D objects from each 3D scene were collected. The new ScanQA dataset contains over 41k question-answer pairs from 800 indoor scenes derived from the ScanNet dataset.',
	Scan2Cap:
		'Scan2Cap introduces the task of dense captioning in 3D scans obtained from commodity RGB-D sensors. Given a point cloud of a 3D scene as input, the goal is to predict bounding boxes along with natural language descriptions of the underlying objects. To jointly address 3D object detection and caption generation, a method named Scan2Cap is proposed. Scan2Cap is trained in an end-to-end manner to detect objects in the input scene and generate corresponding descriptions. An attention mechanism is employed to produce descriptive tokens by attending to relevant components in the local context. To incorporate object relations—specifically relative spatial relationships—into the generated captions, a message passing graph module is introduced to facilitate the learning of relational features. The proposed approach effectively localizes and describes 3D objects in scenes from the ScanRefer dataset, achieving a significant improvement over 2D baseline methods, with a 27.61% increase in CiDEr@0.5IoU.',
	PhyBlock:
		'PhyBlock, a progressive benchmark designed to assess VLMs on physical understanding and planning through robotic 3D block assembly tasks. PhyBlock integrates a novel four-level cognitive hierarchy assembly task alongside targeted Visual Question Answering (VQA) samples, collectively aimed at evaluating progressive spatial reasoning and fundamental physical comprehension, including object properties, spatial relationships, and holistic scene understanding. PhyBlock includes 2600 block tasks (400 assembly tasks, 2200 VQA tasks) and evaluates models across three key dimensions: partial completion, failure diagnosis, and planning robustness.',
	MineAnyBuild:
		'MineAnyBuild, a comprehensive benchmark to evaluate the spatial planning abilities of open-world AI agents in Minecraft, requires them to generate building plans from multi-modal instructions. It includes 4,000 curated tasks and supports scalable data collection through player-generated content, evaluating spatial understanding, reasoning, creativity, and commonsense. The evaluation reveals significant limitations but also great potential in current MLLM-based agents, highlighting the importance of MineAnyBuild for advancing spatial intelligence in AI.',
	RoboVQA:
		'The RoboVQA dataset, containing 829,502 (video, text) pairs, enables improved performance in long-horizon reasoning tasks, with a video-conditioned model showing 46% lower cognitive intervention rates than zero-shot VLMs and video-based VLMs outperforming single-image models by 19% in VQA tasks. The study highlights the benefits of combining human and robot data within budget constraints and underscores the need for more grounded data for real-world deployment.',
	where2place:
		'Where2Place, a benchmark for spatial free-space reference on challenging real world images This dataset contains 100 real-world images to evaluate free space reference using spatial relations. The images are collected from various cluttered environments. Each image is labeled with a sentence describing the desired some free space and a mask of the desired region.',
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
