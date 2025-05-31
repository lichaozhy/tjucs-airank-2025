<template>
	<div>
		<q-tabs v-model="tab" class="text-teal">
			<q-tab name="mails" icon="mail" label="Mails" />
			<q-tab name="alarms" icon="alarm" label="Alarms" />
			<q-tab name="movies" icon="movie" label="Movies" />
		</q-tabs>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineOptions({ name: 'AppLeaderboardPage' });
import { data } from 'src/data';

console.log(data);

const tab = ref('mails');
</script>
