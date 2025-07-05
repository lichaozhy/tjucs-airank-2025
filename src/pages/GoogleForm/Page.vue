<template>
	<q-page
		id="app-google-form"
		class="column justify-center content-center"
	>
		<div class="app-max-width-1680 full-width">
			<iframe
				:src="`https://forms.gle/${$route.params.id}`"
				frameborder="0"
				class="full-width"
				:height="$route.query.height"
			></iframe>
		</div>
	</q-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppGoogleForm' });
</script>

<style lang="scss">
div.main-layout:has(#app-google-form) {
	background: rgb(226, 238, 224);
}
</style>
