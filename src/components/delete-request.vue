
<script setup>

  import { ref, computed } from 'vue';

  import { XMarkIcon } from '@heroicons/vue/24/solid';

  import { state, currentModalComponent, closeModal } from '../store/state';

  const request = state.requests.find( request => request.id === currentModalComponent.id );

  const requestValue = ref( request.name );

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

    if ( ! state.user ) return router.push( { name: 'login' } );

    try {

      let response = await fetch( `http://localhost:3000/user-requests/${ currentModalComponent.id }/users/${ state.user.id }`, options );

      if ( response.ok ) {

        let result = await response.json();

        console.log( 'updated request result ===>', result );

      } else {

        console.log( 'update failed ===>' );

      }
      
    } catch (error) {
      
      console.log( error );
      
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