<template>
	<div class="text-center">
		<div class="text-h3 text-weight-light">
			{{ data.banner.title }}
		</div>
		<q-space class="q-my-lg"></q-space>
		<app-markdown-html
			style="min-height: 6em; max-width: 72em;"
			class="text-body text-weight-light text-justify"
			src="page/leaderboard/task"
		></app-markdown-html>
		<q-space class="q-my-lg"></q-space>
		<q-btn
			flat
			no-caps
			size="lg"
			:to="{ name: 'app.leaderboard.capability', params: $route.params }"
		>
			<div>
				<div>{{ data.banner.navigation.label }}</div>
				<div class="text-caption">{{ data.banner.navigation.caption }}</div>
			</div>
		</q-btn>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';

import AppMarkdownHtml from 'components/MarkdownHTML.vue';

const data = ref<{
	banner: {
		title: string;
		navigation: {
			label: string;
			caption: string;
		};
	};
}>({
	banner: {
		title: '',
		navigation: {
			label: '',
			caption: '',
		},
	},
});

onBeforeMount(async () => {
	data.value = await Backend.API.Page.Leaderboard.Task.get();
});

defineOptions({ name: 'AppLeaderboardTaskBanner' });
</script>
