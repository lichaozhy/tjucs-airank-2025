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
				v-for="(span, index) in data.title"
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
				v-for="(person, index) in data.personList"
				:key="index"
				class="q-ml-xs"
			>{{ person.name
			}}<sup
			>{{ person.core ? '*' : ''
			}}{{ person.at.map((n) => n + 1).join(',') }}</sup
			><span v-if="index < data.personList.length - 1">,</span></span
			>
		</div>
		<div
			class="text-grey-7 text-center row justify-center q-mt-md"
			style="max-width: 48em"
		>
			<div
				v-for="(name, index) in data.organizationList"
				:key="index"
				class="q-ml-md text-no-wrap col-shrink"
			>
				{{ index + 1 }}. {{ name }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';

const data = ref<{
	title: {
		emphasized: boolean;
		text: string;
	}[];
	personList: {
		at: number[];
		0: boolean;
		name: string;
	}[];
	organizationList: string[];
}>({
	title: [],
	personList: [],
	organizationList: [],
});

onBeforeMount(async () => {
	data.value = await Backend.API.Page.Home.Contributor.get();
});

defineOptions({ name: 'AppPageHomeSectionContributor' });
</script>
