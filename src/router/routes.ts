import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		name: 'app.home',
		path: '/',
		redirect: { name: 'app.leaderboard' },
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				name: 'app.leaderboard',
				path: 'leaderboard',
				component: () => import('pages/Leaderboard/Page.vue'),
			},
			// {
			// 	name: 'app.benchmark.rank',
			// 	path: 'benchmark/:name',
			// 	component: () => import('pages/BenchmarkRank/Page.vue'),
			// },
			{
				name: 'app.benchmark.rank',
				path: 'benchmark/:id',
				component: () => import('pages/BenchmarkRank/Page.vue'),
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
