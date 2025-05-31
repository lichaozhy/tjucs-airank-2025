<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

				<!-- <q-toolbar-title> TJU CS AIRank </q-toolbar-title> -->
				<q-toolbar-title>
					<router-link :to="{ name: 'app.home' }"> TJU CS AIRank </router-link>
				</q-toolbar-title>

				<div>v.{{ 2025 }}</div>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer>
			<q-toolbar>
				<q-toolbar-title class="flex">
					<span>© 2025 Tianjin University All Rights Reserved</span>
					<q-separator class="q-mx-md bg-white" vertical />
					<span>Tianjin University Deep Reinforcement Learning Laboratory</span>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

// const leftDrawerOpen = ref(false);

// function toggleLeftDrawer() {
// 	leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>

<style scoped>
body {
	/* 所有浏览器通用方案 */
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE/Edge */
}
body::-webkit-scrollbar {
	display: none; /* Chrome/Safari/Edge */
}
</style>
