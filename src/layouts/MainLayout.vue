<template>
	<q-scroll-area class="absolute-full">
		<q-layout
			class="main-layout"
			view="lHh Lpr fFf"
		>
			<q-header bordered class="justify-center">
				<q-toolbar>
					<q-toolbar-title shrink>
						<router-link
							:to="{ name: 'app.home' }"
							custom
							v-slot="{ navigate }"
						>
							<div
								@click="navigate"
								class="text-h6"
								style="cursor: pointer; color: white"
							>
								{{ $t('spec.project.name') }}
							</div>
						</router-link>
					</q-toolbar-title>

					<q-space></q-space>

					<q-btn
						no-caps
						flat
						label="Embodied Benchmarks"
						:to="{ name: 'app.benchmark' }"
						stretch
					></q-btn>

					<q-btn
						no-caps
						flat
						stretch
						:to="{
							name: 'app.leaderboard.detail',
							params: { leaderboardId: defaultLeaderboardId } }
						"
						label="Embodied Rank"
					></q-btn>

					<q-btn
						no-caps
						flat
						stretch
						label="Embodied Leaderboard Rules"
					></q-btn>

					<q-btn
						no-caps
						flat
						stretch
						label="Embodied Eval"
					></q-btn>

					<q-btn
						no-caps
						flat
						stretch
						label="Docs"
					>
					</q-btn>

					<q-space></q-space>

					<q-btn
						no-caps
						outline
						rounded
						label="Online Evaluation"
					></q-btn>
				</q-toolbar>
			</q-header>

			<q-page-container>
				<router-view :key="$route.fullPath" />
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
	</q-scroll-area>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import * as Backend from 'src/backend';

defineOptions({ name: 'AppMainLayout' });

const defaultLeaderboardId = ref<string | null>(null);

onBeforeMount(async () => {
	const Configuration = await Backend.API.Configuration.get();

	if (Configuration !== null) {
		defaultLeaderboardId.value = Configuration.DEFAULT_LEADERBOARD;
	}
});
</script>

<style lang="scss">
.main-layout {
	background-image: linear-gradient(to bottom, #f0f4f8, rgba($primary, 0.1));
}
</style>
