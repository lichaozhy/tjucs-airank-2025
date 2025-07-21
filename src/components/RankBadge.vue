<template>
	<q-avatar
		size="md"
		text-color="white"
		square
	>
		<q-icon
			name="fas fa-crown"
			:style="{ color: ICON_COLORS[props.order] }"
			size="28px"
		></q-icon>
		<div
			class="absolute text-caption"
			style="top: 10px"
		>
			{{ props.order }}
		</div>
	</q-avatar>
</template>

<script setup lang="ts">
const props = defineProps<{
	order: number;
}>();

const ICON_COLORS: Record<number, string> = {
	1: 'rgba(255, 215, 0, 1)', //golden
	2: 'rgba(192, 192, 192, 1)', //silver
	3: 'rgba(205, 127, 50, 1)', //bronze
};

defineOptions({ name: 'AppScoreTableRankBadge' });
</script>
