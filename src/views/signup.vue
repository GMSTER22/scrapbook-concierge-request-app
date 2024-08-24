
<script setup>

  import { ref } from 'vue';

  import { useRouter } from 'vue-router';

  import SocialMediaAuthButton from '../components/buttons/socialMediaAuthButton.vue';

  import { pushAlert } from '../store/state';

  const SERVER_URL = process.env.SERVER_URL;

  const router = useRouter();

  const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const username = ref( '' );
  
  const email = ref( '' );

  const password = ref( '' );

  const isUsernameMessage = ref( false );

  const isEmailMessage = ref( false );

  const isPasswordMessage = ref( false );

  function onUsernameFocusout() {

    isUsernameMessage.value = ! username.value.length;

  }

  function onEmailFocusout() {

    isEmailMessage.value = ! email.value.length || ! emailValidationRegex.test( email.value );

  }

  function onPasswordFocusout() {

    isPasswordMessage.value = password.value.length < 6;

  }

  const submitForm = async ( event ) => {

    event.preventDefault();

    try {

      onUsernameFocusout();

      onEmailFocusout();

      onPasswordFocusout();

      if ( isUsernameMessage.value || isEmailMessage.value || isPasswordMessage.value ) return;

      const userInfo = JSON.stringify( {

        username: username.value,

        email: email.value,
        
        password: password.value

      } );

      const options = {

        method: 'POST',

        body: userInfo,

        headers: {

          'Content-Type': 'application/json'

        } 

      }

      const response = await fetch( `${process.env.SERVER_URL}/signup/password`, options );

      const result = await response.json();

      console.log( result, 'result' );

      if ( response.ok ) {

        pushAlert( 'success', result.message );

        router.push( { name: 'login' } );

      } else {

        pushAlert( 'failure', result.message );

      }

    } catch ( error ) {

      console.warn( error );
      
      // pushAlert( 'failure', result.message );

      pushAlert( 'failure', 'An Error occurred while Signing up. Try again later.' );

    }

  }

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center px-4">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold mb-8 text-center">Sign up</h1>

      <div class="flex flex-col gap-3">

        <form 

          :action="`${SERVER_URL}/auth/google`" 
          
          method="GET">

          <SocialMediaAuthButton callToAction="Continue With Google" aria-label="Signup with Google">

            <img class="w-5 h-5" src="../assets/images/google.png" alt="Google icon">

          </SocialMediaAuthButton>

        </form>

        <form 

          :action="`${SERVER_URL}/auth/facebook`" 
          
          method="GET">

          <SocialMediaAuthButton callToAction="Continue With Facebook" aria-label="Signup with Facebook">

            <img class="w-6 h-6 rounded-full bg-[#3b5998]" src="../assets/images/facebook.png" alt="Facebook icon">

          </SocialMediaAuthButton>

        </form>

      </div>

      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 my-5">

        <hr>

        <span class="text-neutral-500 text-sm">or sign up with email</span>

        <hr>

      </div>

      <div>

        <form class="mb-4" action="" method="post">

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-1" for="username">Username</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="text" name="username" id="username" v-model="username" @focusout="onUsernameFocusout">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isUsernameMessage">Please enter a username</span>

          </fieldset>

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-1" for="email">Email</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="email" name="email" id="email" v-model="email" @focusout="onEmailFocusout">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isEmailMessage" @focusout="onEmailFocusout">Please enter a valid email</span>

          </fieldset>

          <fieldset class="flex flex-col mb-6">

            <label class="font-medium mb-1" for="password">Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="password" id="password" v-model="password" @focusout="onPasswordFocusout">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isPasswordMessage">Your password must be at least 6 characters long.</span>

          </fieldset>

          <button class="px-5 py-2 bg-purple-800 text-white w-full text-bold rounded" type="submit" @click="submitForm">Create Account</button>

        </form>

        <p class="text-center text-sm">Already have an account? <router-link class="underline" to="/login">Login</router-link> </p>

      </div>

    </div>

  </main>

</template>

