
<script setup>

  import { logInWithEmailAndPassword } from '../utils/firebase.js';

  import { reactive, inject } from 'vue';

  const formInfo = reactive({

    email: '',

    password: ''

  } );

  let tab = inject('tab');

  let changeTab = target => tab.value = target;

  let validateForm = () => {

    if ( !formInfo.email || !formInfo.password ) return

    logInWithEmailAndPassword( formInfo.email, formInfo.password );

  };

</script>

<template>

  <div class="login-form">

    <div class="form">
      
      <div>

        <!-- <label for="email">Email Address</label> -->

        <input id="email" type="email" name="email" placeholder="Email" v-model="formInfo.email" required />

      </div>

      <div>

        <input type="password" name="password" placeholder="Password" v-model="formInfo.password" required />

      </div>

      <div>

        <button class="login" type="button" @click="validateForm">Log In</button>

        <hr>

        <button class="signup" type="button" @click="changeTab('signup')">Sign Up</button>

      </div>

    </div>

  </div>

</template>

<style scoped>

  button.login {

    width: 100%;

  }

  button.login {

    background: rgb(0, 75, 161);

  }

  button.signup {

    background: #eee;

    color: #000;

  }
  
</style>