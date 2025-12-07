<template>
	<router-view />
	<analytics></analytics>
</template>

<script setup lang="ts">
import 'temml/dist/Temml-Local.css';
import './css/app.scss';
import { Analytics } from '@vercel/analytics/vue';
</script>
