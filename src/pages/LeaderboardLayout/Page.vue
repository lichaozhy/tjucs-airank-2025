<template>
	<q-page
		class="column content-center"
		padding
	>
		<div
			id="app-leaderboard-banner"
			class="title column justify-center items-center absolute-full"
			style="height: 230px"
		>
			<div class="text-h2 text-weight-light">{{ $t('p.leaderboard.banner.title') }}</div>
			<div class="text-subtitle1 q-mt-md text-weight-light">
				{{ $t('p.leaderboard.banner.description') }}
			</div>
		</div>

		<q-tabs
			no-caps
			class="q-my-lg"
			style="margin-top: 220px;"
		>
			<q-route-tab
				v-for="item in leaderboardList"
				:key="item.id"
				:name="item.id"
				:label="item.name"
				:to="{
					name: 'app.leaderboard.detail',
					params: { leaderboardId: item.id }
				}"
			/>
		</q-tabs>

		<div
			style="max-width: 1680px"
			class="full-width"
		>
			<router-view></router-view>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';
import type * as Spec from 'src/spec';

const leaderboardList = ref<Spec.Leaderboard.Type[]>([]);

async function fetchAllLeaderboard() {
	leaderboardList.value = await Backend.API.Leaderboard.query();
}

onBeforeMount(async () => {
	await fetchAllLeaderboard();
});

defineOptions({ name: 'AppLeaderboardLayout' });
</script>

<style lang="scss">
#app-leaderboard-banner {
	background:
		linear-gradient(
			to bottom,
			rgba($primary, 0.4) 0%,
			rgba($primary, 0.45) 25%,
			rgba($primary, 0.5) 50%,
			rgba($primary, 0.55) 75%,
			rgba($primary, 0.6) 100%
		),
		url('/image/29085492_1944-no.jpg') center/cover;
}
</style>
