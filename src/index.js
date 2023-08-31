
import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import App from './app.vue';

import Home from './views/home.vue';

import Signin from './views/signin.vue';

import Signup from './views/signup.vue';

import Requests from './views/requests.vue';

window.__VUE_OPTIONS_API__ = false;
window.__VUE_PROD_DEVTOOLS__ = true;

const routes = [

  {

    path: '/', 
    name: 'home',
    component: Home 

  }, {

    path: '/signin', 
    name: 'signin', 
    component: Signin 

  }, {

    path: '/signup', 
    name: 'signup', 
    component: Signup 

  }, {

    path: '/requests', 
    name: 'requests', 
    component: Requests

  }

]

const router = createRouter( {

  history: createWebHistory(),

  routes

} );

const app = createApp( App );

app.use( router );

app.mount( '#app' );
