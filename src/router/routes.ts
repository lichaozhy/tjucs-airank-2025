import type { RouteRecordRaw } from 'vue-router';
import { h } from 'vue';
import { RouterView } from 'vue-router';

import * as Backend from 'src/backend';

const MIDDLE_ROUTER_VIEW = {
	name: 'MiddleRouterView',
	render: () => h(RouterView),
};

const routes: RouteRecordRaw[] = [
	{
		name: 'app.layout',
		path: '/',
		redirect: { name: 'app.home' },
		component: () => import('layouts/Main.vue'),
		children: [
			{
				name: 'app.home',
				path: '',
				component: () => import('pages/Home/Page.vue'),
			},
			{
				name: 'app.leaderboard',
				path: 'leaderboard/:leaderboardOperand?',
				redirect: { name: 'app.leaderboard.task' },
				component: () => import('layouts/Leaderboard'),
				async beforeEnter(to, from, next) {
					if (!Object.hasOwn(to.params, 'leaderboardOperand')) {
						const configuration = await Backend.API.Configuration.get();

						const leaderboard = await Backend.API
							.Leaderboard(configuration.DEFAULT_LEADERBOARD)
							.get();

						return next({
							name: to.name,
							params: {
								leaderboardOperand: leaderboard.code,
							},
						});
					}

					return next();
				},
				children: [
					{
						name: 'app.leaderboard.task',
						path: 'task',
						components: {
							default: () => import('pages/Leaderboard/Task/Default.vue'),
							banner: () => import('pages/Leaderboard/Task/Banner.vue'),
						},
					},
					{
						name: 'app.leaderboard.capability',
						path: 'capability',
						components: {
							default: () => import('pages/Leaderboard/Capability/Default.vue'),
							banner: () => import('pages/Leaderboard/Capability/Banner.vue'),
						},
					},
				],
			},
			{
				name: 'app.benchmark',
				path: 'benchmark',
				redirect: { name: 'app.benchmark.overview' },
				component: MIDDLE_ROUTER_VIEW,
				children: [
					{
						name: 'app.benchmark.overview',
						path: '',
						component: () => import('pages/BenchmarkOverview/Page.vue'),
					},
					{
						name: 'app.benchmark.detail',
						path: ':benchmarkCode',
						component: () => import('pages/BenchmarkDetail/Page.vue'),
					},
				],
			},
			{
				name: 'app.rule',
				path: 'rule',
				component: () => import('pages/Rule/Page.vue'),
			},
			{
				name: 'app.guide',
				path: 'guide',
				component: () => import('pages/Guide/Page.vue'),
			},
			{
				name: 'app.model.detail',
				path: 'model/:modelKey',
				component: () => import('pages/ModelDetail/Page.vue'),
			},
			{
				name: 'app.contribute',
				path: 'contribute',
				component: () => import('pages/ContributeBenchmark/Page.vue'),
			},
			{
				name: 'app.googleform',
				path: 'googleform/:id',
				component: () => import('pages/GoogleForm/Page.vue'),
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
