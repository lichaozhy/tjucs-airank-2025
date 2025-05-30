import type { RouteRecordRaw } from 'vue-router';

import { h } from 'vue';
import { RouterView } from 'vue-router';

const MIDDLE_ROUTER_VIEW = {
	name: 'MiddleRouterView',
	render: () => h(RouterView),
};

const routes: RouteRecordRaw[] = [
	{
		name: 'app.home',
		path: '/',
		redirect: { name: 'app.benchmark', params: { name: 'test' } },
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				name: 'app.benchmark',
				path: 'benchmark/:name',
				redirect: { name: 'app.benchmark.overview' },
				component: MIDDLE_ROUTER_VIEW,
				children: [
					{
						name: 'app.benchmark.overview',
						path: 'overview',
						component: () => import('pages/IndexPage.vue'),
					},
					{
						name: 'app.benchmark.rank',
						path: 'rank',
						component: () => import('pages/IndexPage.vue'),
					},
				],
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
