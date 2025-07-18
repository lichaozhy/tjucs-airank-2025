<template>
	<div class="text-center">
		<div class="text-h3 text-weight-light">
			{{ BannerData.title }}
		</div>
		<div
			class="text-body1 q-mt-md text-weight-light text-center"
			style="width: 72em; height: 10em"
		>
			{{ BannerData.caption }}
		</div>
		<q-space class="q-my-lg"></q-space>
		<q-btn
			flat
			no-caps
			size="lg"
			:to="{
				name: 'app.leaderboard.task',
				params: { leaderboardId: defaultLeaderboardId },
			}"
		>
			<div>
				<div>{{ BannerData.navigation.label }}</div>
				<div class="text-caption">{{ BannerData.navigation.caption }}</div>
			</div>
		</q-btn>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';
import BannerData from './banner.json';

const defaultLeaderboardId = ref<string | null>(null);

onBeforeMount(async () => {
	const Configuration = await Backend.API.Configuration.get();

	if (Configuration !== null) {
		defaultLeaderboardId.value = Configuration.DEFAULT_LEADERBOARD;
	}
});

defineOptions({ name: 'AppLeaderboardCapabilityBanner' });
</script>
