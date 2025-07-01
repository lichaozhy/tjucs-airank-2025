<template>
	<q-card
		class="column justify-between"
		style="min-height: 240px"
	>
		<q-badge
			floating
			v-if="isNew"
			color="primary"
			class="q-mb-md"
		>
			New
		</q-badge>
		<q-card-section class="q-pb-none">
			<div class="text-h6">{{ benchmark.name }}</div>
			<div class="text-subtitle2">
				<q-badge
					v-for="tag in tagList"
					:key="tag"
					class="q-mr-xs"
				>
					{{ tag }}
				</q-badge>
			</div>
		</q-card-section>

		<q-card-section> {{ benchmark.description }} </q-card-section>
		<q-card-section>
			<q-item>
				<q-item-section avatar>
					<q-avatar>
						<img src="https://cdn.quasar.dev/img/avatar2.jpg" />
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label>TJU</q-item-label>
				</q-item-section>

				<q-item-section side>
					<q-icon
						name="visibility"
						color="green"
					/>
				</q-item-section>
				<q-item-section side>
					{{ Math.floor(Math.random() * 100 * Math.expm1(Math.random() * 10)) }}
				</q-item-section>
				<q-item-section side>
					<q-icon name="schedule" />
				</q-item-section>
				<q-item-section side>
					{{ new Date().toLocaleDateString() }}
				</q-item-section>
			</q-item>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'BenchmarkCard' });
import { computed } from 'vue';
import type * as Spec from 'src/spec';

const { benchmark, isNew } = defineProps<{
	benchmark: Spec.Benchmark.Type;
	isNew: boolean; //temporary, remove later
}>();

function lorem(
	options: { words?: number; sentences?: number; paragraphs?: number } = {},
): string {
	// 基础词库
	const vocab = [
		'lorem',
		'ipsum',
		'dolor',
		'sit',
		'amet',
		'consectetur',
		'adipiscing',
		'elit',
		'sed',
		'do',
		'eiusmod',
		'tempor',
		'incididunt',
		'ut',
		'labore',
		'et',
		'dolore',
		'magna',
		'aliqua',
		'enim',
		'minim',
		'veniam',
		'quis',
		'nostrud',
		'exercitation',
		'ullamco',
		'laboris',
		'nisi',
		'aliquip',
		'ex',
		'ea',
		'commodo',
		'consequat',
		'duis',
		'aute',
		'irure',
	];

	// 随机选择数组中的元素
	const randomChoice = <T,>(arr: T[]): T => {
		return arr[Math.floor(Math.random() * arr.length)]!;
	};

	// 生成单个句子 (5-12个单词)
	const generateSentence = (): string => {
		const wordCount = Math.floor(Math.random() * 8) + 5; // 5-12个单词
		const words = Array.from({ length: wordCount }, () => randomChoice(vocab));
		words[0] = words[0]!.charAt(0).toUpperCase() + words[0]!.slice(1); // 首字母大写
		return words.join(' ') + randomChoice(['.', '!', '?']);
	};

	// 生成单个段落 (3-6个句子)
	const generateParagraph = (): string => {
		const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6个句子
		return Array.from({ length: sentenceCount }, generateSentence).join(' ');
	};

	// 根据参数优先级生成文本
	if (options.words) {
		const words = Array.from({ length: options.words }, () =>
			randomChoice(vocab),
		);
		words[0] = words[0]!.charAt(0).toUpperCase() + words[0]!.slice(1);
		return words.join(' ');
	}

	if (options.sentences) {
		return Array.from({ length: options.sentences }, generateSentence).join(
			' ',
		);
	}

	if (options.paragraphs) {
		return Array.from({ length: options.paragraphs }, generateParagraph).join(
			'\n\n',
		);
	}

	// 默认返回一个段落
	return generateParagraph();
}

// const tagList = ref<Array<string>>(
// 	lorem({ words: 5 })
// 		.split(' ')
// 		.map((word) => `#${word}`),
// );

const tagList = computed(() => {
	return Object.entries(benchmark.properties)
		.filter(([key]) => key !== benchmark.default.property)
		.map(([, value]) => `${value.label}`)
		.concat(
			lorem({ words: 5 })
				.split(' ')
				.map((word) => `${word}`),
		);
});

// const isNew = Math.random() < 0.5;
</script>
