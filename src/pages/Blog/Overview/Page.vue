<template>
	<q-page
		padding
		class="column content-center"
	>
		<div
			class="full-width"
			style="max-width: 800px"
		>
			<app-markdown-html
				ref="document"
				src="blog/cover"
			/>

			<q-space class="q-my-lg"></q-space>

			<div class="row q-col-gutter-md">
				<div
					class="col-12"
					v-for="article in articleList"
					:key="article.id"
				>
					<app-article-card :article="article"></app-article-card>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import type { Data } from 'src/backend';

import { onBeforeMount, ref } from 'vue';

import * as Backend from 'src/backend';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';
import AppArticleCard from './ArticleCard.vue';

const articleList = ref<Data.Article[]>([]);
onBeforeMount(async () => {
	const _articleList = await Backend.API.Blog.Article.query();

	articleList.value = _articleList;
});

defineOptions({ name: 'PageBlogOverview' });
</script>
