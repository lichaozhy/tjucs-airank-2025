<template>
	<div
		id="app-home-feature"
		class="column content-center justify-center q-pa-xl relative-position items-center"
	>
		<h2 class="text-indigo-10 text-weight-medium text-center">
			{{ data.title }}
		</h2>
		<div class="app-max-width-1680 q-py-xl q-my-xl">
			<div class="row q-col-gutter-xl items-stretch">
				<div
					v-for="(item, index) in data.features"
					:key="index"
					class="col-4"
				>
					<q-card
						class="full-height"
						flat
						square
					>
						<q-item class="text-indigo-10">
							<q-item-section avatar>
								<q-avatar
									:icon="item.icon"
									size="72px"
								></q-avatar>
							</q-item-section>
							<q-item-section>
								<div class="text-h6">{{ item.title }}</div>
							</q-item-section>
						</q-item>
						<q-card-section class="text-grey-8 text-body1">
							{{ item.description }}
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';

const data = ref<{
	title: string;
	features: {
		title: string;
		icon: string;
		description: string;
	}[];
}>({
	title: '',
	features: [],
});

onBeforeMount(async () => {
	data.value = await Backend.API.Page.Home.Feature.get();
});

defineOptions({ name: 'AppPageHomeSectionFeature' });
</script>
