<template>
	<q-page padding>
		<h1 class="text-h4">Leaderboards</h1>
		<q-list bordered separator>
			<q-item
				v-for="leaderboard in leaderboards"
				:key="leaderboard.id"
				clickable
				:to="{ name: 'app.leaderboard.detail', params: { id: leaderboard.id } }"
			>
				<q-item-section>
					<q-item-label>{{ leaderboard.name }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import leaderboardData from '../../../public/data/leaderboard.json';

interface Leaderboard {
	id: string;
	name: string;
}

export default defineComponent({
	name: 'LeaderboardPage',
	setup() {
		const leaderboards = ref<Leaderboard[]>([]);

		onMounted(() => {
			leaderboards.value = leaderboardData;
		});

		return {
			leaderboards,
		};
	},
});
</script>
