<template>
	<div
		id="app-home-contributor"
		class="column content-center justify-center items-center q-pa-xl bg-white"
	>
		<div
			class="text-h3 text-center full-width"
			style="max-width: 24em"
		>
			<span
				v-for="(span, index) in SECTION.title"
				:key="index"
				class="q-mr-md"
				:class="{ 'text-weight-bold': span.emphasized }"
				>{{ span.text }}</span
			>
		</div>
		<div
			class="text-grey-9 text-center q-mt-lg"
			style="max-width: 60em"
		>
			<span
				v-for="(person, index) in SECTION.personList"
				:key="index"
				class="q-ml-xs"
				>{{ person.name
				}}<sup
					>{{ person.core ? '*' : ''
					}}{{ person.at.map((n) => n + 1).join(',') }}</sup
				><span v-if="index < SECTION.personList.length - 1">,</span></span
			>
		</div>
		<div
			class="text-grey-7 text-center row justify-center q-mt-md"
			style="max-width: 48em"
		>
			<div
				v-for="(name, index) in SECTION.organizationList"
				:key="index"
				class="q-ml-md text-no-wrap col-shrink"
			>
				{{ index + 1 }}. {{ name }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const SECTION = {
	title: [
		{
			emphasized: true,
			text: 'EmbodiedArena:',
		},
		{
			emphasized: false,
			text: 'A Comprehensive Evaluation Platform and Leaderboards for Embodied AI',
		},
	],
	personList: [
		{
			at: [0],
			core: false,
			name: 'EmbodiedArena Team',
		},
	],
	organizationList: [
		'Tianjin University',
		'Huawei Noah\'s Ark Lab',
		'Sun Yat-sen University',
		'Peng Cheng Laboratory',
		'Tsinghua University',
		'Peking University',
		'Shanghai Jiao Tong University',
		'Peking University',
		'HongShan',
		'Nanjing University',
		'Tongji University',
		'Imperial College London',
		'King\'s College London',
		'TU Darmstadt',
		'University College London',
	],
};

defineOptions({ name: 'AppPageHomeSectionContributor' });
</script>
