import { createApp } from 'vue';

import 'ress/ress.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/main.less';

import initTDesign from '@/assets/t-design/index';
import App from './App.vue';

const APP = createApp(App);

initTDesign(APP).mount('#app');
