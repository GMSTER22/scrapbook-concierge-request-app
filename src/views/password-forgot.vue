
<script setup>

  import { ref } from 'vue';

  import { pushAlert } from '../store/state';

  const email = ref( '' );

  const isEmailMessage = ref( false );

  async function onFormSubmit( event ) {

    event.preventDefault();

    try {

      const options ={

        method: 'POST',

        body: JSON.stringify( { email: email.value } ),

        headers: {

          'Content-Type': 'application/json'

        }

      }

      const response = await fetch( `${process.env.SERVER_URL}/password-reset`, options );

      const result = await response.json();
      
      if ( response.ok ) {

        pushAlert( 'success', result.message );

      } else if ( response.status === 400 ) {

        pushAlert( 'failure', result.message );

      } else if ( response.status === 429 ) {

        pushAlert( 'failure', result.message );

      } else {
        
        pushAlert( 'failure', result.message );

      }

    } catch ( error ) {

      console.error( error );
      
      pushAlert( 'failure', 'An Error occurred while sending recovery email. Try again later.' );

    }

  }

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold text-center">Reset your password</h1>

      <hr class="my-8">

      <div>

        <form class="mb-4">

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-1" for="email">Email</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="email" name="email" id="email" v-model="email" required>

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isEmailMessage">Please enter your email</span>

          </fieldset>

          <button class="px-5 py-2 bg-purple-800 text-white w-full text-bold rounded" type="submit" @click="onFormSubmit">Submit</button>

        </form>

      </div>

    </div>

  </main>

</template>