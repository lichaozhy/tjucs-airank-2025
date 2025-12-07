<template>
	<router-view />
	<analytics></analytics>
	<speed-insights></speed-insights>
</template>

<script setup lang="ts">
import 'temml/dist/Temml-Local.css';
import './css/app.scss';
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>
