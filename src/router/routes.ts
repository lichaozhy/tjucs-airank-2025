import type { RouteRecordRaw } from 'vue-router';
import { h } from 'vue';
import { RouterView } from 'vue-router';

import * as Backend from 'src/backend';

const MIDDLE_ROUTER_VIEW = {
	name: 'MiddleRouterView',
	render: () => h(RouterView),
};

const Configuration = await Backend.API.Configuration.get();

const routes: RouteRecordRaw[] = [
	{
		name: 'app.home',
		path: '/',
		redirect: {
			name: 'app.leaderboard.detail',
			params: {
				leaderboardId: Configuration.DEFAULT_LEADERBOARD,
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
