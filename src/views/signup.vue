
<script setup>

  import { registerWithEmailAndPassword } from '../utils/firebase.js';

  // import { computed } from '@vue/reactivity';

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

    registerWithEmailAndPassword( formInfo.email, formInfo.password );

  };

</script>

<template>

  <div class="login-form">

    <div class="form">

      <div>
      
        <input type="email" name="email" placeholder="Email" v-model="formInfo.email" required/>

      </div>

      <div>

        <input type="password" name="password" placeholder="Password" v-model="formInfo.password" required />

      </div>

      <div>

        <input type="password" name="passwordRepeat" placeholder="Repeat Password" v-model="formInfo.passwordRepeat" required/>

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

  button.login {

    background: #eee;

    color: #000;

  }

  button.signup {

    background: #004ba1;

    color: #fff;

  }

</style>