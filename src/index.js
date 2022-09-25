
import { createApp } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';

import App from './components/app.vue';

import Home from './views/home.vue';

import Login from './views/login.vue';

import SignUp from './views/signup.vue';

const routes = [

  { path: '/', name: 'home', component: Home },

  { path: '/login', name: 'login', component: Login },

  { path: '/signup', name: 'signup', component: SignUp }

]

const router = createRouter( {

  history: createWebHashHistory(),

  routes

} )

const app = createApp( App );

app.use( router );

app.mount( '#app' );