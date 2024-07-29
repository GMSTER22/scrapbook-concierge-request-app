
<script setup>

  import { ref, computed, onMounted } from 'vue';

  import { useRouter } from 'vue-router';

  import { XMarkIcon } from '@heroicons/vue/24/solid';

  import { state, closeModal, isAuthenticated, currentModalComponent, pushAlert } from '../store/state';

  import { getToken } from '../utils/utils';

  const router = useRouter();

  const textAreaElement = ref( null ); 
  
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

      let result = await response.json();
      
      if ( response.ok ) {

        pushAlert( 'success', result.message );

        currentModalComponent.callbackFunction();

        closeModal();

      } else if ( response.status === 401 ) {

        pushAlert( 'failure', 'You\'re not logged in.' );

        logUserOut();

        router.push( { name: 'login' } );

      } else {

        pushAlert( 'failure', result.message );

      }
      
    } catch ( error ) {
      
      console.warn( error );

      pushAlert( 'failure', 'An Error occurred while making a request. Try again later.' );
      
    }

  }

  onMounted( () => textAreaElement.value.focus() );

</script>

<template>

  <form class="relative w-full max-w-sm px-5 py-8 border shadow rounded bg-white" @submit="onRequestSubmit">

    <button class="absolute top-2 right-2 p-1 rounded-full bg-red-700" type="button" @click="closeModal">

      <XMarkIcon class="h-6 w-6 text-white" />

    </button>

    <fieldset class="mb-3">

      <legend class="mb-4 text-xl text-center font-bold">Make Request</legend>

      <div class="w-full">

        <label for="request"></label>

        <textarea 
        
          ref="textAreaElement" 
          
          class="w-full rounded" 
          
          name="request" 
          
          id="request" 
          
          maxlength="100" 
          
          v-model="requestValue" 
          
          placeholder="Enter Title" required>
        
        </textarea>        

      </div>

      <p class="text-xs text-right">

        {{ numberOfCharactersLeft }} characters left.

      </p>

    </fieldset>

    <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="submit">

      Submit Request

    </button>

  </form>

</template>
