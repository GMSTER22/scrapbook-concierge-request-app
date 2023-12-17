
<script setup>

  import { useRouter } from 'vue-router';

  import { computed, ref } from 'vue';

  import { state } from '../store/state';

  const router = useRouter();

  const email = ref( '' );
  
  const password = ref( '' );

  const isEmail = ref( false );

  const isPassword = ref( false );

  const updateFormFieldsErrorMessages = () => {

    isEmail.value = email.value.length < 1;

    isPassword.value = password.value.length < 1;

  };

  const passwordCompute = computed( () => {

    console.log(password, 'Check password');

    return password;

  } );

  const emailCompute = computed( () => {

    console.log( email, 'Check email' );

    return email;

  } );

  // 'Johndoe@22'
  // 'johndoe@gmail.com'

  const submitForm = async ( event ) => {

    if ( ! isEmail.value || ! isPassword.value ) return updateFormFieldsErrorMessages();

    const data = JSON.stringify( {

      email : email.value,
      
      password: password.value

    } );

    const options = {

      method: 'post',

      body: data,

      headers: {

        'Content-Type': 'application/json',

        // 'Host': 'http://127.0.0.1:3000',

        'Accept': 'application/json',

        // 'Cache': 'no-cache'

        // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        
      },

      // credentials: 'include'

    }

    try {
      
      const response = await fetch( 'http://localhost:3000/login', options )
  
      console.log( 'response ===>', response );
      
      const userInfo = await response.json();
      
      state.user = data.user;
      
      router.push( { name: 'home'} );
      
    } catch ( error ) {

      alert( error.message )
      
    }

  }

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold mb-8 text-center">Login</h1>

      <div class="flex flex-col gap-3">

        <button type="button" class="border border-neutral-300 px-4 py-2 rounded">Login with Google</button>

        <button type="button" class="border border-neutral-300 px-4 py-2 rounded">Login with Facebook</button>

        <button type="button" class="border border-neutral-300 px-4 py-2 rounded">{{ passwordCompute }} {{ emailCompute }}</button>

      </div>

      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 my-5">

        <hr>

        <span class="text-neutral-500 text-sm">or login with email</span>

        <hr>

      </div>

      <div>

        <form class="mb-4">

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-2" for="email">Email</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="email" name="email" id="email" v-model="email" required>

            <span class="pt-1 text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isEmail">Please enter your email</span>

          </fieldset>


          <fieldset class="flex flex-col mb-6">

            <label class="font-medium mb-2" for="password">Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="password" id="password" v-model="password" required>

            <span class="pt-1 text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="! isPassword">Please enter your password</span>

          </fieldset>

          <button class="px-5 py-2 bg-purple-800 text-white w-full text-bold rounded" type="button" @click="submitForm">Login</button>

        </form>

        <p class="text-center text-sm">Don't have an account? <router-link class="underline" to="/signup">Sign up</router-link></p>

      </div>

    </div>

  </main>

</template>
