<template>
	<q-scroll-area class="absolute-full">
		<q-layout
			class="main-layout"
			view="lHh Lpr fFf"
		>
			<q-header bordered>
				<q-toolbar>
					<q-toolbar-title>
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

					<router-link
						v-for="leaderboard in leaderboardList"
						:key="leaderboard.id"
						:to="{ name: 'app.leaderboard.detail', params: { leaderboardId: leaderboard.id } }"
						custom
						v-slot="{ navigate }"
					>
						<div
							@click="navigate"
							class="text-subtitle q-ml-md"
							style="cursor: pointer; color: white"
						>
							{{ leaderboard.name }}
						</div>
					</router-link>

					<router-link
						:to="{ name: 'app.benchmark' }"
						custom
						v-slot="{ navigate }"
					>
						<div
							@click="navigate"
							class="text-subtitle q-ml-md"
							style="cursor: pointer; color: white"
						>
							Benchmark Hub
						</div>
					</router-link>

					<q-space></q-space>
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
import type * as Spec from 'src/spec';
import * as Backend from 'src/backend';

defineOptions({ name: 'AppMainLayout' });

const leaderboardList = ref<Array<Spec.Leaderboard.Type>>([]);
const LeaderboardAPI = Backend.API.Leaderboard;

onBeforeMount(async () => {
	leaderboardList.value = await LeaderboardAPI.query();
});
</script>

<style lang="scss">
.main-layout {
	background-image: linear-gradient(to bottom, #f0f4f8, rgba($primary, 0.1));
}
</style>
