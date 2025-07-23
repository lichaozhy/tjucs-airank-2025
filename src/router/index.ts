import { defineRouter } from '#q-app/wrappers';
import {
	createMemoryHistory,
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from 'vue-router';

import routes from './routes';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(async function (/* { store, ssrContext } */) {
	const createHistory = process.env.SERVER
		? createMemoryHistory
		: process.env.VUE_ROUTER_MODE === 'history'
			? createWebHistory
			: createWebHashHistory;

	const Router = createRouter({
		async scrollBehavior(to, from, saved) {
			if (to.hash === '' || to.hash === '#') {
				return { top: 0 };
			}

			await sleep(100);

			const el = document.getElementById(to.hash.substring(1));

			if (el === null) {
				return { ...saved };
			}

			// el.scrollIntoView({ top: 60 });
			return { el, top: 60 };
		},
		routes,

		// Leave this as is and make changes in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		history: createHistory(process.env.VUE_ROUTER_BASE),
	});

	return Router;
});
