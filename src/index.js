
import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticated } from './store/state';

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

    beforeEnter: async ( to, from ) => {

      if ( isAuthenticated() && ! state.requests ) {

        const options = {

          method: 'GET',
    
          headers: {
    
            'Accept': 'application/json'
            
          },
    
          credentials: 'include'
    
        }
    
        const response = await fetch( 'http://localhost:3000/requests', options );

        const requests = response.json();

        console.log( 'requests set' );

        state.requests = requests;

        console.log( 'before enter HOME VIEW Fired' );

      }

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

router.beforeEach( ( to, from, next ) => {

  if ( ( to.name !== 'login' ) && ! isAuthenticated() ) next( { name: 'login' } );

  else next();

} );

const app = createApp( App );

app.use( router );

app.mount( '#app' );
