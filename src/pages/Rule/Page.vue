<template>
	<q-page
		padding
		class="column content-center"
	>
		<div
			class="full-width"
			style="max-width: 1680px"
		>
			<div class="row q-col-gutter-md">
				<div class="col-9">
					<q-card
						square
						flat
					>
						<q-card-section>
							<app-markdown-html
								ref="document"
								:content="documentHTML"
							/>
						</q-card-section>
					</q-card>
				</div>
				<div class="col-3">
					<div
						class="toc"
						style="position: sticky; top: 60px"
					>
						<q-list dense>
							<q-item
								clickable
								v-for="item in toc"
								:key="item.id"
								:to="{ hash: `#${item.id}` }"
							>
								<q-item-section
									:style="{ 'padding-left': `${item.depth * 1}em` }"
								>
									<div class="text-grey-8">
										{{ item.label }}
									</div>
								</q-item-section>
							</q-item>
						</q-list>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, nextTick } from 'vue';

import * as Backend from 'src/backend';
import AppMarkdownHtml from 'components/MarkdownHTML.vue';

interface TOCItem {
	id: string;
	label: string | null;
	depth: number;
}

const documentHTML = ref<string>('');
const toc = ref<TOCItem[]>([]);
const document = ref<InstanceType<typeof AppMarkdownHtml> | null>(null);

const HEADING_DEPTH_MAP = {
	H1: 0,
	H2: 1,
	H3: 2,
	H4: 3,
};

watch(documentHTML, async () => {
	await nextTick(() => {
		const headingList = document.value!.$el.querySelectorAll('h1, h2, h3, h4');

		toc.value = [...headingList].map((element) => {
			return {
				id: element.id,
				label: element.textContent,
				depth:
					HEADING_DEPTH_MAP[element.tagName as keyof typeof HEADING_DEPTH_MAP],
			};
		});
	});
});

onBeforeMount(async () => {
	documentHTML.value = await Backend.API.Document.Rule.get();
});

defineOptions({ name: 'AppRulePage' });
</script>
