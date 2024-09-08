
import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticated, isAdmin, state } from './store/state';

import App from './app.vue';

import Home from './views/home.vue';

import Requests from './views/requests.vue';

import Login from './views/login.vue';

import Signup from './views/signup.vue';

import MyRequests from './views/my-requests.vue';

import ReleasedRequests from './views/released-requests.vue';

import Admin from './views/admin.vue';

import Subscription from './views/subscription.vue';

import PrivacyPolicy from './views/privacy-policy.vue';

import Terms from './views/terms.vue';

import PasswordForgot from './views/password-forgot.vue';

import PasswordReset from './views/password-reset.vue';

import VueGtag from 'vue-gtag';

window.__VUE_OPTIONS_API__ = false;

window.__VUE_PROD_DEVTOOLS__ = true;

const routes = [

  {

    path: '/',

    name: 'home',

    component: Home,

    beforeEnter: ( to, from, next ) => {

      if ( ! state.user ) isAuthenticated();

      next();

    }

  }, {

    path: '/requests',

    name: 'requests',

    component: Requests,

    beforeEnter: ( to, from, next ) => {

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

      if ( ! isAuthenticated() ) return next( { name: 'login' } );
      
      if ( ! isAdmin.value ) return next( { name: 'home' } );

      next();

    }

  }, {

    path: '/subscription',

    name: 'subscription',

    component: Subscription

  }, {

    path: '/privacy-policy',

    name: 'privacy-policy',

    component: PrivacyPolicy

  }, {

    path: '/terms',

    name: 'terms',

    component: Terms

  }

]

const router = createRouter( {

  linkExactActiveClass: 'border-b-[1px] border-purple-900',
  
  history: createWebHistory(),

  routes

} );

const app = createApp( App );

app.use( router );

app.use( 
  
  VueGtag, 
  
  {

    appName: 'Scrapbook Concierge Requests App',

    pageTrackerScreenviewEnabled: true,

    config: {
      
      id: process.env.GOOGLE_MEASUREMENT_ID
    
    }
  
  }, 
  
  router 

);

app.mount( '#app' );
