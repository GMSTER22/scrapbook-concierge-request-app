
<script setup>

  import { useRouter } from 'vue-router';

  import { computed, ref } from 'vue';

  import { state } from '../store/state';

  import SocialMediaAuthButton from '../components/buttons/socialMediaAuthButton.vue';

  const router = useRouter();

  const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const email = ref( '' );
  
  const password = ref( '' );

  const isCredentialsMessage = ref( false );

  const isEmailMessage = ref( false );

  const isPasswordMessage = ref( false );

  function onEmailFocusout() {

    isEmailMessage.value = ! email.value.length || ! emailValidationRegex.test( email.value );

  }

  function onPasswordFocusout() {

    isPasswordMessage.value = password.value.length < 6;

  }

  const submitForm = async ( event ) => {

    event.preventDefault();

    if ( isEmailMessage.value || isPasswordMessage.value ) return;

    const userInfo = {

      email : email.value,
      
      password: password.value

    };

    const options = {

      method: 'POST',

      body: JSON.stringify( userInfo ),

      headers: {

        'Content-Type': 'application/json',

        'Accept': 'application/json'
        
      },

      credentials: 'include'

    }

    try {
      
      const response = await fetch( `${process.env.SERVER_URL}/login`, options );
  
      if ( response.ok ) {

        const result = await response.json();
      
        state.user = result;
        
        router.push( { name: 'home'} );

      } else {

        isCredentialsMessage.value = true;

      } 
      
    } catch ( error ) {

      alert( error.message );
      
    }

  }

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold mb-8 text-center">Login</h1>

      <div class="flex flex-col gap-3">

        <form 
        
          action="https://scrapbook-concierge-request-app-backend.onrender.com/auth/google`" 
          
          method="GET">

          <SocialMediaAuthButton callToAction="Continue With Google" />

        </form>

        <form 
        
          action="https://scrapbook-concierge-request-app-backend.onrender.com/auth/facebook`" 
          
          method="GET">

          <SocialMediaAuthButton callToAction="Continue With Facebook" />

        </form>

      </div>

      <div v-if="isCredentialsMessage" class="mt-4 py-4 text-center border border-red-600 bg-red-200">

        <div class="text-sm font-bold mb-1">Wrong Credentials</div>

        <div class="text-xs">Invalid username or password</div>

      </div>

      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 my-5">

        <hr>

        <span class="text-neutral-500 text-sm">or login with email</span>

        <hr>

      </div>

      <div>

        <form class="mb-4" action="http://localhost:3000/login">

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-1" for="email">Email</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="email" name="email" id="email" v-model="email" @focusout="onEmailFocusout">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isEmailMessage">Please enter a valid email</span>

          </fieldset>

          <fieldset class="flex flex-col mb-6">

            <label class="font-medium mb-1" for="password">Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="password" id="password" v-model="password" @focusout="onPasswordFocusout">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isPasswordMessage">Please enter your password</span>

          </fieldset>

          <button class="px-5 py-2 bg-purple-800 text-white w-full text-bold rounded" type="submit" @click="submitForm">Login</button>

        </form>

        <p class="mb-1 text-center text-sm">Don't have an account? <router-link class="underline" to="/signup">Sign up</router-link></p>

        <div class="text-center text-sm">
          
          <router-link class="underline" to="/password-forgot">Forgot Password?</router-link>
        
        </div>

      </div>

    </div>

  </main>

</template>
