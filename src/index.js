
import { createApp } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';

import App from './components/app.vue';

import router from "./router/router"

const app = createApp( App );

app.use( router );

app.mount( '#app' );