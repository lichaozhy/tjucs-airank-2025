<template>
	<div class="text-center">
		<div class="text-h3 text-weight-light">
			{{ data.banner.title }}
		</div>
		<q-space class="q-my-lg"></q-space>
		<q-btn
			flat
			no-caps
			size="lg"
			:to="{ name: 'app.leaderboard.task', params: $route.params }"
		>
			<div>
				<div>{{ data.banner.navigation.label }}</div>
				<div class="text-caption">{{ data.banner.navigation.caption }}</div>
			</div>
		</q-btn>
	</div>
</template>

<script setup lang="ts">
import * as Spec from 'src/spec';
import { onBeforeMount, ref, inject } from 'vue';

import * as Backend from 'src/backend';

const setExclude = inject(Spec.INJECTION_KEY.SET_EXCLUDE)!;

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
	const { exclude, banner } = await Backend.API.Page.Leaderboard.Capability.get();

	data.value = { banner };
	setExclude(exclude);
});

defineOptions({ name: 'AppLeaderboardCapabilityBanner' });
</script>
