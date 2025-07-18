<template>
	<div class="app-common-page-layout">
		<div
			class="app-page-banner column justify-center items-center absolute-full text-white"
		>
			<slot name="banner"></slot>
		</div>

		<div class="full-width app-max-width-1680 q-mt-md">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppCommonPageLayout' });
</script>

<style lang="scss">
$app-page-banner-height: 240px;

main.q-page:has(> .app-common-page-layout) {
	padding-top: $app-page-banner-height;
}

.app-page-banner {
	height: $app-page-banner-height;
	background:
		linear-gradient(
			to bottom,
			rgba($indigo-10, 0.6) 0%,
			rgba($indigo-10, 0.65) 25%,
			rgba($indigo-10, 0.7) 50%,
			rgba($indigo-10, 0.75) 75%,
			rgba($indigo-10, 0.8) 100%
		),
		url('/image/29085492_1944-no.jpg') center/cover;
}
</style>
