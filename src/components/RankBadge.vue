<template>
	<q-avatar
		size="md"
		text-color="white"
		square
	>
		<q-icon
			:name="iconName"
			:style="{ color: iconColor }"
			size="28px"
		></q-icon>
		<div
			class="absolute text-caption"
			:style="{ top }"
		>
			{{ props.order }}
		</div>
	</q-avatar>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	order: number;
}>();

const DEFAULT_ICON_COLOR = 'rgba(66, 66, 66, 0.2)';

const ICON_COLORS: Record<number, string> = {
	1: 'rgba(255, 215, 0, 1)', //golden
	2: 'rgba(192, 192, 192, 1)', //silver
	3: 'rgba(205, 127, 50, 1)', //bronze
};

const DEFAULT_ICON_TOP = '8px';

const ICON_LABEL_TOP_VALUES: Record<number, string> = {
	1: '10px', //golden
	2: '10px', //silver
	3: '10px', //bronze
};

const top = computed(() => {
	if (Object.hasOwn(ICON_LABEL_TOP_VALUES, props.order)) {
		return ICON_LABEL_TOP_VALUES[props.order];
	}

	return DEFAULT_ICON_TOP;
});

const iconColor = computed(() => {
	if (Object.hasOwn(ICON_COLORS, props.order)) {
		return ICON_COLORS[props.order];
	}

	return DEFAULT_ICON_COLOR;
});

const iconName = computed<string>(() => {
	if (props.order <= 3) {
		return 'fas fa-crown';
	}

	return 'fas fa-star';
});

defineOptions({ name: 'AppScoreTableRankBadge' });
</script>
