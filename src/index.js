
import { createApp, ref } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticated, isAdmin, state } from './store/state';

import { fetchRequests } from './utils/utils';

import App from './app.vue';

import Home from './views/home.vue';

import Login from './views/login.vue';

import Signup from './views/signup.vue';

import MyRequests from './views/my-requests.vue';

import ReleasedRequests from './views/released-requests.vue';

import Admin from './views/admin.vue';

import PasswordForgot from './views/password-forgot.vue';

import PasswordReset from './views/password-reset.vue';

window.__VUE_OPTIONS_API__ = false;

window.__VUE_PROD_DEVTOOLS__ = true;

const routes = [

  {

    path: '/',

    name: 'home',

    component: Home,

    beforeEnter: ( to, from, next ) => {

      console.log(isAuthenticated(), 'Auth value in HOME');

      if ( ! isAuthenticated() ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/login',

    name: 'login',

    component: Login

  }, {

    path: '/signup',

    name: 'signup',

    component: Signup 

  }, {

    path: '/password-forgot',

    name: 'password-forgot',

    component: PasswordForgot

  }, {

    path: '/password-reset',

    name: 'password-reset',

    component: PasswordReset

  }, {

    path: '/my-requests',

    name: 'my-requests',

    component: MyRequests,

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated() ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/released-requests',

    name: 'released-requests',

    component: ReleasedRequests,

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated() ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/admin',

    name: 'admin',

    component: Admin,

    beforeEnter: ( to, from, next ) => {

      // console.log( isAdmin.value, typeof isAdmin.value, 'isAdmin' );

      if ( ! isAuthenticated() ) return next( { name: 'login' } );
      
      if ( ! isAdmin.value ) return next( { name: 'home' } );

      next();

    }

  }

]

const router = createRouter( {

  linkExactActiveClass: 'border-b-[1px] border-purple-900',
  
  history: createWebHistory(),

  routes

} );

router.beforeEach( async ( to, from, next ) => {

  if ( ! state.requests && isAuthenticated() ) {

    const fetchedRequests = await fetchRequests();

    if ( fetchRequests ) state.requests = fetchedRequests;
    
  }

  next();

} );

const app = createApp( App );

app.use( router );

app.mount( '#app' );
