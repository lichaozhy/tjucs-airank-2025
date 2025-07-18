<template>
	<div class="app-banner-with-layout">
		<div
			class="app-page-banner column justify-center items-center absolute-full text-white"
			:style="{ height: `${props.height}px` }"
		>
			<slot name="banner"></slot>
		</div>

		<div
			class="full-width app-max-width-1680"
			:style="{ 'padding-top': `${props.height}px` }"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		height?: number;
	}>(),
	{
		height: 240,
	},
);

defineOptions({ name: 'AppBannerWithLayout' });
</script>

<style lang="scss">
.app-page-banner {
	height: var(--app-layout-banner-with-height);
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
