
import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/home.vue';

import Welcome from '../views/Welcome.vue';

const routes = [

  { path: '/', name: 'home', component: Home },

  { path: '/welcome', name: 'Welcome', component: Welcome }

]

const router = createRouter( {

  history: createWebHashHistory(),

  routes

} );

export default router;