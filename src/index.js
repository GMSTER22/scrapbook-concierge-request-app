
import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import App from './app.vue';

import Home from './views/home.vue';

import Login from './views/login.vue';

import Signup from './views/signup.vue';

import MyRequests from './views/my-requests.vue';

import Admin from './views/admin.vue';

window.__VUE_OPTIONS_API__ = false;

window.__VUE_PROD_DEVTOOLS__ = true;

const routes = [

  {

    path: '/',
    name: 'home',
    component: Home 

  }, {

    path: '/login',
    name: 'login',
    component: Login 

  }, {

    path: '/signup',
    name: 'signup',
    component: Signup 

  }, {

    path: '/my-requests',
    name: 'my-requests',
    component: MyRequests

  }, {

    path: '/admin',
    name: 'admin',
    component: Admin

  }

]

const router = createRouter( {

  history: createWebHistory(),

  routes

} );

const app = createApp( App );

app.use( router );

app.mount( '#app' );
