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
				>,</span
			>...
		</div>
		<div
			class="text-grey-7 text-center row justify-center q-mt-md"
			style="max-width: 42em"
		>
			<div
				v-for="(name, index) in SECTION.organizationList"
				:key="index"
				class="q-ml-md text-no-wrap col-shrink"
			>
				{{ index + 1 }}. {{ name }}
			</div>
			<div class="col-grow full-width">*: Core contributors</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const SECTION = {
	title: [
		{
			emphasized: true,
			text: 'RoboArena: ',
		},
		{
			emphasized: false,
			text: 'Distributed Real-World Evaluation of Generalist Robot Policies',
		},
	],
	personList: [
		{
			at: [0],
			core: true,
			name: 'Pranav Atreya',
		},
		{
			at: [0, 1],
			core: true,
			name: 'Karl Pertsch',
		},
		{
			at: [1],
			core: true,
			name: 'Tony Lee',
		},
		{
			at: [1],
			core: false,
			name: 'Moo Jin Kim',
		},
		{
			at: [2],
			core: false,
			name: 'Arhan Jain',
		},
		{
			at: [3],
			core: false,
			name: 'Artur Kuramshin',
		},
		{
			at: [4],
			core: false,
			name: 'Clemens Eppner',
		},
		{
			at: [3],
			core: false,
			name: 'Cyrus Neary',
		},
		{
			at: [5],
			core: false,
			name: 'Edward Hu',
		},
		{
			at: [4],
			core: false,
			name: 'Fabio Ramos',
		},
		{
			at: [4],
			core: false,
			name: 'Jonathan Tremblay',
		},
		{
			at: [2],
			core: false,
			name: 'Kanav Arora',
		},
		{
			at: [3],
			core: false,
			name: 'Kirsty Ellis',
		},
		{
			at: [6],
			core: false,
			name: 'Luca Macesanu',
		},
		{
			at: [5],
			core: false,
			name: 'Matthew Leonard',
		},
		{
			at: [7],
			core: false,
			name: 'Meedeum Cho',
		},
		{
			at: [3],
			core: false,
			name: 'Ozgur Aslan',
		},
		{
			at: [6],
			core: false,
			name: 'Shivin Dass',
		},
		{
			at: [5],
			core: false,
			name: 'Jie Wang',
		},
		{
			at: [5],
			core: false,
			name: 'Xingfang Yuan',
		},
		{
			at: [4],
			core: false,
			name: 'Xuning Yang',
		},
		{
			at: [2],
			core: false,
			name: 'Abhishek Gupta',
		},
		{
			at: [5],
			core: false,
			name: 'Dinesh Jayaraman',
		},
		{
			at: [3],
			core: false,
			name: 'Glen Berseth',
		},
		{
			at: [5],
			core: false,
			name: 'Kostas Daniilidis',
		},
		{
			at: [6],
			core: false,
			name: 'Roberto Martin-Martin',
		},
		{
			at: [7],
			core: false,
			name: 'Youngwoon Lee',
		},
		{
			at: [1],
			core: false,
			name: 'Percy Liang',
		},
		{
			at: [1],
			core: false,
			name: 'Chelsea Finn',
		},
		{
			at: [0],
			core: false,
			name: 'Sergey Levine',
		},
	],
	organizationList: [
		'University of California, Berkeley',
		'Stanford University',
		'University of Washington',
		'Université de Montréal',
		'NVIDIA',
		'University of Pennsylvania',
		'UT Austin',
		'Yonsei University',
	],
};

defineOptions({ name: 'AppPageHomeSectionContributor' });
</script>
