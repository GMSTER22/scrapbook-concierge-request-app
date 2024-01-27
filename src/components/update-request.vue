
<script setup>

  import { ref, computed } from 'vue';

  import { useRouter } from 'vue-router';

  import { state, currentModalComponent, closeModal, isAuthenticated } from '../store/state';
  
  import { XMarkIcon } from '@heroicons/vue/24/solid';

  const router = useRouter();

  console.log( state.requests );

  const request = state.requests.find( request => request._id === currentModalComponent.id );

  const requestValue = ref( request.title );

  const numberOfCharactersLeft = computed( () => {

    return requestValue.value ? 
    
      100 - requestValue.value.length

      :

      100

  } );

  const onRequestUpdate = async ( event ) => {

    event.preventDefault();

    if ( ! isAuthenticated() ) return router.push( { name: 'login' } );

    try {

      const data = JSON.stringify( { title: requestValue.value } );

      const options = {

        method: 'PATCH',

        body: data,

        headers: {

          'Content-Type': 'application/json',

          // 'Accept': 'application/json'
          
        },

        credentials: 'include'

      }

      let response = await fetch( `http://localhost:3000/requests/${ currentModalComponent.id }/users/${ state.user.id }`, options );

      if ( response.ok ) {

        console.log( state.requests, 'BEFORE' );

        state.requests.find( request => request._id === currentModalComponent.id ).title = requestValue.value;

        console.log( state.requests, 'AFTER' );

        closeModal();

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

      <legend class="mb-4 text-xl text-center font-bold">Update Request</legend>

      <div class="w-full">

        <label for="request"></label>

        <textarea class="w-full rounded" name="request" id="request" maxlength="100" v-model="requestValue"></textarea>
        

      </div>

      <p class="text-xs text-right">

        {{ numberOfCharactersLeft }} characters left.

      </p>

    </fieldset>

    <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="submit" @click="onRequestUpdate">

      Update Kit

    </button>

  </form>

</template>