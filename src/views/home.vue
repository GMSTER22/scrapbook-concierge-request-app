
<script setup>

  import { computed } from '@vue/reactivity';

  import { ref, provide } from 'vue';

  import login from './login.vue';

  import signup from './signup.vue';

  import welcome from "./welcome.vue";

  import { isAuthenticated } from "../utils/firebase";

  let tab = ref('login');

  let currentTab = computed( () => {
    
    if ( tab.value === 'login' ) return login;

    if ( tab.value === 'signup' ) return signup;

    if ( isAuthenticated.value ) return welcome;

  } );

  provide( 'tab', tab );

</script>

<template>

  <component v-if="!isAuthenticated" :is="currentTab"></component>

  <welcome />

</template>

<style>

  .login-form {

    display: flex;

    justify-content: center;

    align-items: center;

    width: 100vw;

    height: 100vh;

  }

  .form {

    padding: 10px;

    text-align: center;

    border: 1px solid #ccc;

  }

  input {

    min-width: 280px;

    margin: 10px 0;

    padding: 10px 20px;

  }

  button {

    padding: 10px 20px;

    border: none;

    border-radius: 3px;

    color: white;

    font-weight: bold;

  }

  button:hover {

    cursor: pointer;

  }

  button:active {

    transform: scale(0.98);

  }

  button.login {

    background: rgb(77, 157, 248);

  }

  button.signup {

    background: rgb(6, 247, 6);

  }

  hr {

    margin: 15px;

  }

</style>