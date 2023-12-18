
import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticated, isAdmin, state } from './store/state';

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

    component: Home,

    beforeEnter: ( to, from, next ) => {

      console.log(state.user);

      console.log(isAuthenticated.value);

      if ( ! isAuthenticated.value ) next( { name: 'login' } );

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

    path: '/my-requests',

    name: 'my-requests',

    component: MyRequests,

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated.value ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/admin',

    name: 'admin',

    component: Admin,

    beforeEnter: ( to, from, next ) => {

      console.log( isAdmin.value, 'isAdmin' )

      if ( ! isAdmin.value ) next( { name: 'home' } );

      else next();

    }

  }

]

const router = createRouter( {

  history: createWebHistory(),

  routes

} );

// router.beforeEach( ( to, from, next ) => {

//   if ( to.name === 'home' || to.name === 'my-requests' || to.name === 'admin' ) {



//   }

// } );

const app = createApp( App );

app.use( router );

app.mount( '#app' );
