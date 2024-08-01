
<script setup>

  import { computed, ref, onBeforeMount, onMounted } from 'vue';

  import { useRoute, useRouter } from 'vue-router';

  import { state, pushAlert } from '../store/state';

  import { decodeJWT } from '../utils/utils';

  import SocialMediaAuthButton from '../components/buttons/socialMediaAuthButton.vue';

  const SERVER_URL = process.env.SERVER_URL;

  const router = useRouter();

  const { query } = useRoute();

  const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const email = ref( '' );
  
  const password = ref( '' );

  const isCredentialsMessage = ref( false );

  const isEmailMessage = ref( false );

  const isPasswordMessage = ref( false );

  function onEmailFocusOut() {

    isEmailMessage.value = ! email.value.length || ! emailValidationRegex.test( email.value );

  }

  function onPasswordFocusOut() {

    isPasswordMessage.value = password.value.length < 6;

  }

  const submitForm = async ( event ) => {

    event.preventDefault();

    onEmailFocusOut();

    onPasswordFocusOut();

    if ( isCredentialsMessage.value ) isCredentialsMessage.value = false;

    if ( isEmailMessage.value || isPasswordMessage.value ) return;

    // if ( ! email.value || isEmailMessage.value ) return isEmailMessage.value = true;

    // if ( ! password.value || isPasswordMessage.value ) return isPasswordMessage.value = true;

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

      // credentials: 'include'

    }

    try {
      
      const response = await fetch( `${process.env.SERVER_URL}/login`, options );

      const result = await response.json();
  
      if ( response.ok ) {

        localStorage.setItem( 'token', result.token );
        
        const decodedToken = decodeJWT( result.token );
      
        state.user = decodedToken.payload;
        
        router.push( { name: 'home'} );

      } else if ( response.status === 400 ) {

        // pushAlert( 'failure', result.message );

        isCredentialsMessage.value = true;

      } else {

        pushAlert( 'failure', result.message );

      } 
      
    } catch ( error ) {

      console.error( `An error occurred during login: ${ error.message }` );

      pushAlert( 'failure', 'An Error occurred during login. Try again later.' );
      
    }

  }

  onBeforeMount( () => {

    const token = query?.token;

    if ( ! token ) return;

    localStorage.setItem( 'token', token );
        
    const decodedToken = decodeJWT( token );
  
    state.user = decodedToken.payload;
    
    router.push( { name: 'home'} );

  } );

  onMounted( () => {

    if ( query.err ) pushAlert( 'failure', 'Wrong authentication method.' );

  } );

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold mb-8 text-center">Login</h1>

      <div class="flex flex-col gap-3">

        <form 
        
          :action="`${SERVER_URL}/auth/google`" 
          
          method="GET">

          <SocialMediaAuthButton callToAction="Continue With Google" />

        </form>

        <form 
        
          :action="`${SERVER_URL}/auth/facebook`" 
          
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

        <form class="mb-4">

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-1" for="email">Email</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="email" name="email" id="email" v-model="email" @focusout="onEmailFocusOut">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isEmailMessage">Please enter a valid email</span>

          </fieldset>

          <fieldset class="flex flex-col mb-6">

            <label class="font-medium mb-1" for="password">Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="password" id="password" v-model="password" @focusout="onPasswordFocusOut">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isPasswordMessage">Password should be at least 6 Characters long.</span>

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
