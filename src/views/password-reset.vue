
<script setup>

  import { computed, ref } from 'vue';

  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();

  const router = useRouter();

  const { token, id } = route.query;
  
  console.log( token, id, 'token and userId' );

  const newPassword = ref( '' );

  const confirmPassword = ref( '' );

  // const isEmailMessage = ref( false );

  async function onFormSubmit( event ) {

    event.preventDefault();

    if ( ! newPassword.value || ! confirmPassword.value || newPassword.value !== confirmPassword.value ) {

      console.log( 'no value or ' );

      return;

    }

    if ( ! token || ! id ) {

      console.log( 'query missing' );

      return;

    }

    const options = {

      method: 'PATCH',

      body: JSON.stringify( { 

        userId: id,
        
        resetToken: token,

        newPassword: newPassword.value

      } ),

      headers: {

        'Content-Type': 'application/json'

      }

    }

    const response = await fetch( `${process.env.SERVER_URL}/password-reset`, options );

    let result = await response.text();

    if ( response.ok ) {

      alert( result );

      router.push( 'login' );

    } else {

      console.log( result, 'Result' );

      console.log( response, 'Response' );

    }

  }

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold text-center">Reset Password</h1>

      <hr class="my-8">

      <div>

        <form class="mb-4">

          <fieldset class="flex flex-col mb-6">

            <label class="font-medium mb-1" for="new-password">New Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="new-password" id="new-password" v-model="newPassword" required>

            <!-- <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isPasswordMessage">Please enter your password</span> -->

          </fieldset>

          <fieldset class="flex flex-col mb-8">

            <label class="font-medium mb-1" for="confirm-password">Confirm Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword" required>

            <!-- <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="!isPasswordMessage">Please enter your password</span> -->

          </fieldset>

          <button class="px-5 py-2 bg-purple-800 text-white w-full text-bold rounded" type="submit" @click="onFormSubmit">Submit</button>

        </form>

      </div>

    </div>

  </main>

</template>