<template>
	<router-link
		:to="{
			name: 'app.report.detail',
			params: { code: props.article.code },
		}"
		custom
		v-slot="{ navigate }"
	>
		<q-card
			flat
			square
			bordered
			class="full-height cursor-pointer"
			:class="{ 'bg-grey-1': hover }"
			@click="navigate"
			@mouseenter="hover = true"
			@mouseleave="hover = false"
		>
			<q-card-section>
				<div class="text-h6">{{ props.article.title }}</div>
			</q-card-section>
			<q-card-section class="q-pt-none text-grey-8">
				<div class="text-body2 text-justify ellipsis-2-lines">
					{{ props.article.abstract }}
				</div>
			</q-card-section>
			<q-card-section class="q-pt-none text-grey-6 text-caption">
				<div class="row">
					<div class="col-6">
					</div>
					<div class="col-6 text-right">
						{{ toYMD(new Date(props.article.at)) }}
					</div>
				</div>
			</q-card-section>
		</q-card>
	</router-link>
</template>

<script setup lang="ts">
import type * as Backend from 'src/backend';
import { ref } from 'vue';
import * as Q from 'quasar';

const hover = ref<boolean>(false);

const props = defineProps<{
	article: Backend.Data.Article;
}>();

function toYMD(date: Date) {
	return Q.date.formatDate(date, 'YYYY-MM-DD');
}

defineOptions({ name: 'AppPageBlogOverviewArticleCard' });
</script>
