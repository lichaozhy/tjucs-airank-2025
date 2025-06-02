<template>
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
						>{{ $t('spec.project.name') }}</div>
					</router-link>
				</q-toolbar-title>

				<q-space></q-space>
			</q-toolbar>
		</q-header>

		<q-scroll-area class="absolute-full">
			<q-page-container>
				<router-view />
			</q-page-container>
		</q-scroll-area>

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
defineOptions({ name: 'AppMainLayout' });
</script>

<style lang="scss">
.main-layout {
	background-image: linear-gradient(to bottom, #f0f4f8, rgba($primary, 0.1));
}
</style>
