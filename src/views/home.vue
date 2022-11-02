
<script setup>

  import { computed } from '@vue/reactivity';

  import { ref, provide } from 'vue';

  import login from './login.vue';

  import signup from './signup.vue';

  let tab = ref('login');

  let currentTab = computed( () => {
    
    if ( tab.value === 'login' ) return login;

    if ( tab.value === 'signup' ) return signup;

  } );

  provide( 'tab', tab );

</script>

<template>

  <component :is="currentTab"></component>

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

    border-radius: 5px;

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

  hr {

    margin: 15px;

  }

</style>