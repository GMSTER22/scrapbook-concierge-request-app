
<script setup>

  import { signUpWithEmailAndPassword } from '../utils/firebase.js';

  import { computed } from '@vue/reactivity';

  import { reactive, inject } from 'vue';

  const formInfo = reactive({

    email: 'gaeln92@yahoo.fr',

    password: '123456',

    passwordRepeat: '123456'

  } );

  let tab = inject('tab');

  let changeTab = target => tab.value = target;

  let validateForm = () => {

    if ( !formInfo.email || !formInfo.password || !formInfo.passwordRepeat || formInfo.password !== formInfo.passwordRepeat ) return

    signUpWithEmailAndPassword( formInfo.email, formInfo.password );

  };

</script>

<template>

  <div class="login-form">

    <div class="form">

      <div>
      
        <input 
        
          type="email" 
          
          name="email" 
          
          placeholder="Email"

          v-model="formInfo.email"
          
          required/>

      </div>

      <div>

        <input 
        
          type="password" 
          
          name="password" 
          
          placeholder="Password"

          v-model="formInfo.password"
          
          required />

      </div>

      <div>

        <input 
        
          type="password" 
          
          name="passwordRepeat" 
          
          placeholder="Repeat Password"

          v-model="formInfo.passwordRepeat"
          
          required/>

      </div>

      <div>

        <button class="signup" type="button" @click="validateForm">Sign Up</button>

        <hr>

        <button class="login" type="button" @click="changeTab('login')">Login</button>

      </div>

    </div>

  </div>

</template>

<style scoped>

  button.signup {

    width: 100%;

  }

  /* .login-form {

    display: flex;

    justify-content: center;

    align-items: center;

    width: 100vw;

    height: 100vh;

  }

  .form {

    display: flex;

    flex-direction: column;

    max-width: 500px;

    border: 1px solid #ccc;

  }

  input {

    display: block;

    min-width: 280px;    

    margin: 10px;

    padding: 10px 20px;

  }

  button {

    padding: 10px 20px;

    border: none;

    border-radius: 3px;

    color: white;

  }

  button:hover {

    cursor: pointer;

  }

  button.login {

    background: rgb(77, 157, 248);

  }

  button.signup {

    background: rgb(6, 247, 6);

  }

  hr {

    margin: 15px;

  } */

</style>