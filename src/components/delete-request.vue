
<script setup>

  import { ref, computed } from 'vue';

  import { useRouter } from 'vue-router';

  import { state, currentModalComponent, closeModal, isAuthenticated, logUserOut } from '../store/state';

  import { getToken } from '../utils/utils';
  
  import { XMarkIcon } from '@heroicons/vue/24/solid';

  const router = useRouter();

  const request = currentModalComponent.request;

  const requestValue = ref( request.title );

  const options = {

    method: 'DELETE',

    headers: {

      'Authorization': `Bearer ${ getToken( 'token' ) }`,

      'Content-Type': 'application/json'
      
    },

    // credentials: 'include'

  }

  const onDeleteRequest = async ( event ) => {

    event.preventDefault();

    if ( ! isAuthenticated() ) return router.push( { name: 'login' } );

    try {

      let response = await fetch( `${process.env.SERVER_URL}/requests/${ currentModalComponent.request._id }/users/${ state.user.id }`, options );

      if ( response.ok ) {

        currentModalComponent.callbackFunction();

        closeModal();

      } else if ( response.status === 401 ) {

        logUserOut();

        router.push( { name: 'login' } );

      } else if ( response.status === 403 ) {

        const responseText = await response.text();

        await new Promise( ( resolve, reject ) => resolve( closeModal() ) );

        // closeModal();

        alert( responseText );

      }
      
    } catch (error) {
      
      console.log( error );
      
    }

  }

</script>

<template>

  <form class="relative w-full max-w-sm px-5 py-8 border shadow rounded bg-white">

    <button class="absolute top-2 right-2 p-1 rounded-full bg-red-700" type="button" @click="closeModal">

      <XMarkIcon class="h-6 w-6 text-white" />

    </button>

    <fieldset class="mb-3">

      <legend class="mb-4 text-xl text-center font-bold">Delete Request</legend>

      <div class="w-full">

        <label for="request"></label>

        <textarea class="w-full rounded" name="request" id="request" maxlength="100" v-model="requestValue" disabled></textarea>
        

      </div>

    </fieldset>

    <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="submit" @click="onDeleteRequest">

      Delete Request

    </button>

  </form>

</template>