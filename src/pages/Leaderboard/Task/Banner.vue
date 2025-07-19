<template>
	<div class="text-center">
		<div class="text-h3 text-weight-light">
			{{ BannerData.title }}
		</div>
		<q-space class="q-my-lg"></q-space>
		<q-btn
			flat
			no-caps
			size="lg"
			:to="{ name: 'app.leaderboard.capability', params: $route.params }"
		>
			<div>
				<div>{{ BannerData.navigation.label }}</div>
				<div class="text-caption">{{ BannerData.navigation.caption }}</div>
			</div>
		</q-btn>
	</div>
</template>

<script setup lang="ts">
import BannerData from './banner.json';

defineOptions({ name: 'AppLeaderboardTaskBanner' });
</script>
