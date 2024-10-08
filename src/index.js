
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

import VueGtagPlugin from 'vue-gtag';

window.__VUE_OPTIONS_API__ = false;

window.__VUE_PROD_DEVTOOLS__ = true;

const routes = [

  {

    path: '/',

    name: 'home',

    component: Home,

    meta: { title: 'Home' },

    beforeEnter: ( to, from, next ) => {

      if ( ! state.user ) isAuthenticated();

      next();

    }

  }, {

    path: '/requests',

    name: 'requests',

    component: Requests,

    meta: { title: 'All Requests' },

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated() ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/login',

    name: 'login',

    component: Login,

    meta: { title: 'Login' },

  }, {

    path: '/signup',

    name: 'signup',

    component: Signup,

    meta: { title: 'Signup' },

  }, {

    path: '/password-forgot',

    name: 'password-forgot',

    component: PasswordForgot,

    meta: { title: 'Forgot Password' },

  }, {

    path: '/password-reset',

    name: 'password-reset',

    component: PasswordReset,

    meta: { title: 'Password Reset' },

  }, {

    path: '/my-requests',

    name: 'my-requests',

    component: MyRequests,

    meta: { title: 'My Requests' },

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated() ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/released-requests',

    name: 'released-requests',

    component: ReleasedRequests,

    meta: { title: 'Released Requests' },

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated() ) next( { name: 'login' } );

      else next();

    }

  }, {

    path: '/admin',

    name: 'admin',

    component: Admin,

    meta: { title: 'Admin' },

    beforeEnter: ( to, from, next ) => {

      if ( ! isAuthenticated() ) return next( { name: 'login' } );
      
      if ( ! isAdmin.value ) return next( { name: 'home' } );

      next();

    }

  }, {

    path: '/subscription',

    name: 'subscription',

    component: Subscription,

    meta: { title: 'Subscription' },

  }, {

    path: '/privacy-policy',

    name: 'privacy-policy',

    component: PrivacyPolicy,

    meta: { title: 'Privacy Policy' },

  }, {

    path: '/terms',

    name: 'terms',

    component: Terms,

    meta: { title: 'Terms and Conditions' },

  }

]

const router = createRouter( {

  linkExactActiveClass: 'border-b-[1px] border-purple-900',
  
  history: createWebHistory(),

  routes

} );

router.beforeEach( ( to, from ) => {

  document.title = `${ to.meta.title } | Scrapbook Concierge Requests App`;

} );

const app = createApp( App );

app.use( router );

app.use( 
  
  VueGtagPlugin, 
  
  {

    appName: 'Scrapbook Concierge Requests App',

    pageTrackerScreenviewEnabled: true,

    config: {
      
      id: "G-2N7XV7V1N5"
    
    }
  
  }, 
  
  router 

);

app.mount( '#app' );
