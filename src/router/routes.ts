import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		name: 'app.home',
		path: '/',
		redirect: {
			name: 'app.leaderboard.detail',
			params: {
				leaderboardId: '09b4a56a-2e41-4103-a330-129381c24450',
			},
		},
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				name: 'app.leaderboard.detail',
				path: 'leaderboard/:leaderboardId',
				component: () => import('pages/LeaderboardDetail/Page.vue'),
			},
			{
				name: 'app.rank.leaderboard',
				path: 'rank/leaderboard/:leaderboardId/benchmark/:benchmarkId',
				component: () => import('pages/Rank/Page.vue'),
			},
			{
				name: 'app.benchmark',
				path: 'benchmark',
				component: () => import('pages/BenchmarkOverview/Page.vue'),
			},
			{
				name: 'app.model.detail',
				path: 'model/:id',
				component: () => import('pages/ModelDetail/Page.vue'),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
