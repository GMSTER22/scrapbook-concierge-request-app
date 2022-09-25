
<script setup>

  import { inject } from 'vue';

  let tab = inject('tab');

  let changeTag = target => tab.value = target;

</script>

<template>

  <div class="login-form">

    <div class="form">
      
      <div>

        <input 
        
          type="email" 
          
          name="email" 
          
          placeholder="Email" 
          
          required />

      </div>

      <div>

        <input 
        
          type="password" 
          
          name="password" 
          
          placeholder="Password" 
          
          required />

      </div>

      <div>

        <button class="login" type="button">Log In</button>

        <hr>

        <button class="signup" type="button" @click="changeTag('signup')">Sign Up</button>

      </div>

    </div>

  </div>

</template>

<style scoped>

  button.login {

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