<template>
	<q-item-section>
		{{ props }}
	</q-item-section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
	id: string;
	values?: string[];
	multiple?: boolean;
}>(), {
	values: () => [],
	multiple: true,
});

const emit = defineEmits<{
	configure: [(value: string) => boolean]
}>();

defineOptions({ name: 'AppModelFilterItemEnum' });
</script>
