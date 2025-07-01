<template>
	<q-layout
		class="main-layout"
		view="lHh Lpr fFf"
	>
		<q-header
			id="app-header"
			class="justify-center bg-indigo-10"
		>
			<q-toolbar>
				<q-toolbar-title shrink>
					<router-link
						:to="{ name: 'app.home' }"
						custom
						v-slot="{ navigate }"
						style="cursor: pointer; color: white; font-size: 25px"
					>
						<div @click="navigate">
							{{ $t('spec.project.name') }}
						</div>
					</router-link>
				</q-toolbar-title>

				<q-space></q-space>

				<q-btn
					class="app-navbar-feature-item text-weight-regular"
					no-caps
					flat
					label="Home"
					:to="{ name: 'app.home' }"
					stretch
					:class="{ active: routeMatched('app.home') }"
				></q-btn>

				<q-btn
					class="app-navbar-feature-item text-weight-regular"
					no-caps
					flat
					label="Embodied Benchmarks"
					:to="{ name: 'app.benchmark' }"
					stretch
					:class="{ active: routeMatched('app.benchmark') }"
				></q-btn>

				<q-btn
					class="app-navbar-feature-item text-weight-regular"
					no-caps
					flat
					stretch
					:to="{
						name: 'app.leaderboard.detail',
						params: { leaderboardId: defaultLeaderboardId },
					}"
					label="Embodied Rank"
					:class="{ active: routeMatched('app.leaderboard') }"
				></q-btn>

				<q-btn
					class="app-navbar-feature-item text-weight-regular"
					no-caps
					flat
					stretch
					label="Embodied Leaderboard Rules"
					:class="{ active: routeMatched('app.rule') }"
					:to="{ name: 'app.rule' }"
				></q-btn>

				<q-btn
					class="app-navbar-feature-item text-weight-regular"
					no-caps
					flat
					stretch
					label="User Guide"
					:class="{ active: routeMatched('app.guide') }"
					:to="{ name: 'app.guide' }"
				>
				</q-btn>

				<q-space></q-space>

				<q-btn
					class="app-navbar-service-item text-weight-regular"
					no-caps
					outline
					rounded
					label="Online Evaluation"
				></q-btn>

				<q-btn
					class="app-navbar-service-item text-weight-regular q-ml-md"
					no-caps
					outline
					rounded
					label="Contribute Benchmark"
					:class="{ active: routeMatched('app.contribute') }"
					:to="{ name: 'app.contribute' }"
				></q-btn>
			</q-toolbar>
		</q-header>

		<q-page-container id="app-container">
			<router-view
				:key="$route.path"
				@vue:mounted="scrollTop"
			/>
		</q-page-container>

		<q-footer
			bordered
			reveal
			class="bg-grey-3 text-grey-10"
		>
			<q-toolbar class="flex-center text-overline">
				<q-space />
				<div>{{ $t('spec.rights') }}</div>
				<q-separator
					vertical
					inset
					spaced
				/>
				<div>{{ $t('spec.subject') }}</div>
				<q-space />
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script setup lang="ts">
import type * as Quasar from 'quasar';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import * as Backend from 'src/backend';

const route = useRoute();
const defaultLeaderboardId = ref<string | null>(null);
const scrollArea = ref<Quasar.QScrollArea | null>(null);

function routeMatched(name: string) {
	return route.matched.some((route) => route.name?.toString().includes(name));
}

onBeforeMount(async () => {
	const Configuration = await Backend.API.Configuration.get();

	if (Configuration !== null) {
		defaultLeaderboardId.value = Configuration.DEFAULT_LEADERBOARD;
	}
});

function scrollTop() {
	if (scrollArea.value !== null) {
		scrollArea.value?.setScrollPosition('vertical', 0);
	}
}

defineOptions({ name: 'AppMainLayout' });
</script>

<style lang="scss">
.main-layout {
	background-image: linear-gradient(to bottom, #f0f4f8, rgba($primary, 0.1));
}

.app-navbar-feature-item {
	font-family: Helvetica;
	font-feature-settings:
		'clig' 0,
		'liga' 0;
	font-weight: 400;
	font-size: 16px;

	&.active {
		font-weight: 600;
	}
}

.app-navbar-service-item {
	font-family: 'PingFang SC';
	font-weight: 400;
}
</style>
