
import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticated, isAdmin, state } from './store/state';

import { fetchRequests } from './utils/utils';

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

    path: '/my-requests',

    name: 'my-requests',

    component: MyRequests,

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated() ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/admin',

    name: 'admin',

    component: Admin,

    beforeEnter: ( to, from, next ) => {

      console.log( isAdmin.value, typeof isAdmin.value, 'isAdmin' );

      if ( ! isAuthenticated() ) return next( { name: 'login' } );
      
      if ( ! isAdmin.value ) return next( { name: 'home' } );

      next();

    }

  }

]

const router = createRouter( {

  history: createWebHistory(),

  routes

} );

router.beforeEach( async ( to, from, next ) => {

  if ( state.requests ) return next();

  const fetchedRequests = await fetchRequests();
    
  state.requests = fetchedRequests;

  next();

  // if ( to.name == 'signup' ) {
    
  //   next( { name: 'signup' } );

  // } else {
  //   if ( ! isAuthenticated() ) next( { name: 'login' } );
  //   console.log(isAuthenticated(), 'auth')
  // }

} );

const app = createApp( App );

app.use( router );

app.mount( '#app' );
