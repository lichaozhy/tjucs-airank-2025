<template>
	<q-page
		padding
		class="column content-center"
	>
		<div
			class="full-width"
			style="max-width: 1680px"
		>
			<q-card
				square
				flat
			>
				<q-card-section>
					<app-markdown-html
						v-if="id !== null"
						ref="document"
						:src="`blog/article/${id}`"
					/>
				</q-card-section>
			</q-card>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import * as Backend from 'src/backend';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

const route = useRoute();
const id = ref<string | null>(null);

onBeforeMount(async () => {
	const [article] = await Backend.API.Blog.Article.query({
		code: route.params.code as string,
	});

	if (article !== undefined) {
		id.value = article.id;
	}
});

defineOptions({ name: 'PageBlogDetail' });
</script>
