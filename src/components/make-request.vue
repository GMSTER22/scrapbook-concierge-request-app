
<script setup>

  import { ref, computed } from 'vue';

  import { useRouter } from 'vue-router';

  import { XMarkIcon } from '@heroicons/vue/24/solid';

  import { state, closeModal, isAuthenticated, currentModalComponent } from '../store/state';

  import { getToken } from '../utils/utils';

  const router = useRouter();
  
  const requestValue = ref( null );

  const numberOfCharactersLeft = computed( () => {

    return requestValue.value ? 
    
      100 - requestValue.value.length

      :

      100

  } );

  
  const onRequestSubmit = async ( event ) => {
    
    event.preventDefault();
    
    // if ( ! isAuthenticated() ) return router.push( { name: 'login' } );
    
    try {

      console.log( requestValue.value );

      const data = JSON.stringify( { title: requestValue.value } );

      const options = {
    
        method: 'POST',
    
        body: data,
    
        headers: {

          'Authorization': `Bearer ${ getToken( 'token' ) }`,
    
          'Content-Type': 'application/json',
    
          // 'Accept': 'application/json'
          
        }
    
      }

      let response = await fetch( `${process.env.SERVER_URL}/requests/${ state.user.id }`, options );

      if ( response.ok ) {

        let data = await response.text();

        console.log( currentModalComponent.callbackFunction );

        currentModalComponent.callbackFunction();

        closeModal();

      } else if ( response.status === 401 ) {

        logUserOut();

        router.push( { name: 'login' } );

      }
      
    } catch ( error ) {
      
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

      <legend class="mb-4 text-xl text-center font-bold">Make Request</legend>

      <div class="w-full">

        <label for="request"></label>

        <textarea class="w-full rounded" name="request" id="request" maxlength="100" v-model="requestValue" placeholder="Enter Title"></textarea>        

      </div>

      <p class="text-xs text-right">

        {{ numberOfCharactersLeft }} characters left.

      </p>

    </fieldset>

    <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="button" @click="onRequestSubmit">

      Submit Request

    </button>

  </form>

</template>