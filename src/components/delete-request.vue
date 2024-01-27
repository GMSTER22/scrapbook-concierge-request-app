
<script setup>

  import { ref, computed } from 'vue';

  import { useRouter } from 'vue-router';

  import { state, currentModalComponent, closeModal, isAuthenticated } from '../store/state';
  
  import { XMarkIcon } from '@heroicons/vue/24/solid';
import { resolve } from 'path';

  const router = useRouter();

  const request = state.requests.find( request => request._id === currentModalComponent.id );

  const requestValue = ref( request.title );

  console.log(request);

  const options = {

    method: 'DELETE',

    headers: {

      'Content-Type': 'application/json'
      
    },

    credentials: 'include'

  }

  const onDeleteRequest = async ( event ) => {

    event.preventDefault();

    if ( ! isAuthenticated() ) return router.push( { name: 'login' } );

    try {

      let response = await fetch( `http://localhost:3000/requests/${ currentModalComponent.id }/users/${ state.user.id }`, options );

      console.log( response, 'RESPONSE' );

      if ( response.ok ) {

        // let result = await response.json();

        // console.log( 'updated request result ===>', result );

        console.log( state.requests, 'BEFORE' );

        state.requests = state.requests.filter( request => request._id !== currentModalComponent.id );

        console.log( state.requests, 'AFTER' );

        closeModal();

      }
      
      if ( response.status === 403 ) {

        const responseText = await response.text();

        await new Promise( ( resolve, reject ) => resolve(closeModal()) );

        // closeModal();

        alert( responseText );

      }
      
    } catch (error) {
      
      console.log( error, 'BOOM YAKAKA' );
      
    }

  }

</script>

<template>

  <form class="relative w-full max-w-sm px-5 py-8 border shadow rounded bg-white" action="">

    <button class="absolute top-2 right-2" type="button" @click="closeModal">

      <XMarkIcon class="h-6 w-6 text-black" />

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