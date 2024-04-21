
<script setup>

  import { computed, ref } from 'vue';

  import { useRouter } from 'vue-router';

  const router = useRouter();

  // const queries = route.query;
  
  // console.log( queries );

  const email = ref( '' );

  const isEmailMessage = ref( false );

  async function onFormSubmit( event ) {

    event.preventDefault();

    const options ={

      method: 'POST',

      body: JSON.stringify( { email: email.value } ),

      headers: {

        'Content-Type': 'application/json'

      }

    }

    const response = await fetch( 'http://localhost:3000/password-reset', options );

    if ( response.ok ) {

      const data = await response.text();

      alert( `Email was sent to ${ email.value }` )

      // console.log( data, 'data' );

      // router.push( { name: 'password-reset'} );

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