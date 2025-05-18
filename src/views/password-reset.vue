
<script setup>

  import { ref, onBeforeMount } from 'vue';

  import { useRoute, useRouter } from 'vue-router';

  import { pushAlert } from '../store/state';

  const route = useRoute();

  const router = useRouter();

  const { token, id } = route.query;

  const newPassword = ref( '' );

  const confirmPassword = ref( '' );

  const isNewPasswordMessage = ref( false );

  const isConfirmPasswordMessage = ref( false );

  const isPasswordMatch = ref( true );

  // const isPasswordMatch = computed( () => newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword );

  function onNewPasswordFocusOut() {

    isNewPasswordMessage.value = newPassword.value.length < 6;

  }

  function onConfirmPasswordFocusOut() {

    isConfirmPasswordMessage.value = confirmPassword.value.length < 6;

  }

  async function onFormSubmit( event ) {

    event.preventDefault();

    try {
      
      if ( ! newPassword.value ) return isNewPasswordMessage.value = true;
      
      if ( ! confirmPassword.value  ) return isConfirmPasswordMessage.value = true;

      if ( newPassword.value !== confirmPassword.value ) return isPasswordMatch.value = false;

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

      let result = await response.json();

      if ( response.ok ) {

        pushAlert( 'success', result.message );

        router.push( { name: 'login' } );

      } else if ( response.status === 400 ) {

        pushAlert( 'failure', result.message );

        router.push( { name: 'password-forgot' } );

      } else {

        pushAlert( 'failure', result.message );

      }

    } catch ( error ) {
      
      console.error( error );

      pushAlert( 'failure', 'An Error occurred while resetting the password. Try again later.' );

    }

  }

  onBeforeMount( () => {

    if ( ! token || ! id ) router.push( { name: 'login' } );

  } );

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold text-center">Reset Password</h1>

      <hr class="my-8">

      <div v-if="! isPasswordMatch" class="mb-8 py-4 text-center border border-red-600 bg-red-200">

        <div class="text-xs">New Password and Confirm Password don't match.</div>

      </div>

      <div>

        <form class="mb-4">

          <fieldset class="flex flex-col mb-6">

            <label class="font-medium mb-1" for="new-password">New Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="new-password" id="new-password" v-model="newPassword" @focusout="onNewPasswordFocusOut">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="! isNewPasswordMessage">
              
              Password should be at least 6 Characters long.
            
            </span>

          </fieldset>

          <fieldset class="flex flex-col mb-8">

            <label class="font-medium mb-1" for="confirm-password">Confirm Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword" @focusout="onConfirmPasswordFocusOut">

            <span class="pt-[2px] text-red-500 text-xs opacity-100 aria-hidden:opacity-0 transition-opacity duration-300" :aria-hidden="! isConfirmPasswordMessage">
              
              Password should be at least 6 Characters long.
            
            </span>

          </fieldset>

          <button class="px-5 py-2 bg-purple-800 text-white w-full text-bold rounded" type="submit" @click="onFormSubmit">Submit</button>

        </form>

      </div>

    </div>

  </main>

</template>