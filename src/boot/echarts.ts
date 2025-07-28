import { defineBoot } from '#q-app/wrappers';
import * as charts from 'echarts';

import theme from './theme.json';

export default defineBoot(() => {
	charts.registerTheme('embodied', theme);
});
