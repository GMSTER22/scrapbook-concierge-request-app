
<script setup>

  import { ref, computed, onMounted } from 'vue';

  import { useRouter } from 'vue-router';

  import { state, isAdmin, currentModalComponent, closeModal, isAuthenticated, logUserOut, pushAlert } from '../store/state';

  import { getToken } from '../utils/utils';
  
  import { XMarkIcon } from '@heroicons/vue/24/solid';

  const router = useRouter();

  const textAreaElement = ref( null );

  const request = currentModalComponent.request;

  const requestTitle = ref( request.title );

  const requestURL = ref( request.url );

  const requestReleased = ref( request.released ? 'true' : 'false' );

  const isUrlField = computed( () => requestReleased.value === 'true' && isAdmin );

  const numberOfCharactersLeft = computed( () => {

    return requestTitle.value ? 
    
      100 - requestTitle.value.length

      :

      100

  } );

  const onRequestUpdate = async ( event ) => {

    event.preventDefault();

    try {

      const data = JSON.stringify( { 
        
        title: requestTitle.value,
        
        url: requestURL.value,

        released: requestReleased.value
      
      } );

      const options = {

        method: 'PATCH',

        body: data,

        headers: {

          'Authorization': `Bearer ${ getToken( 'token' ) }`,

          'Content-Type': 'application/json',
          
        },

      }

      let response = await fetch( `${process.env.SERVER_URL}/requests/${ currentModalComponent.request._id }/users/${ state.user.id }`, options );

      let result = await response.json();

      if ( response.ok ) {

        [ state.requests, state.searchRequestResult ].forEach( requestList => {

          if ( ! requestList ) return;

          const requestIndex = requestList?.findIndex( request => request._id === currentModalComponent.request._id );
  
          if ( requestIndex !== -1 ) requestList.splice( requestIndex, 1, result.request );

        } );
        
        pushAlert( 'success', result.message );

        closeModal();

      } else if ( response.status === 401 ) {

        pushAlert( 'failure', 'You\'re not logged in.' );

        logUserOut();

        router.push( { name: 'login' } );

      } else if ( response.status === 404 ) {

        pushAlert( 'failure', result.message );

        // setTimeout( () => currentModalComponent.callbackFunction(), 0 );

      } else {

        pushAlert( 'failure', result.message );

      }
      
    } catch ( error ) {
      
      console.warn( error );

      pushAlert( 'failure', 'An Error occurred while updating the request. Try again later.' );
      
    }

  }

  onMounted( () => textAreaElement.value.focus() );

</script>

<template>

  <form class="relative w-full max-w-sm px-5 py-8 border shadow rounded bg-white" @submit="onRequestUpdate">

    <button class="absolute top-2 right-2 p-1 rounded-full bg-red-700" type="button" @click="closeModal">

      <XMarkIcon class="h-6 w-6 text-white" />

    </button>

    <fieldset class="mb-8">

      <legend class="mb-4 text-xl text-center font-bold">
        
        Update Request
      
      </legend>
      
      <Transition>

        <div v-if="isUrlField" class="mb-4">

          <label class="block mb-1" for="url">URL</label>

          <input class="w-full rounded" type="text" name="url" id="url" v-model="requestURL" :required="isAdmin && requestReleased">

        </div>

      </Transition>

      <div class="mb-4">

        <div class="w-full">

          <label class="block mb-1" for="request">Title</label>

          <textarea 
          
            ref="textAreaElement" 
            
            class="w-full rounded font-medium" 
            
            name="request" 
            
            id="request" 
            
            maxlength="100" 

            @focusout="onTitleTextAreaFocusOut"
            
            v-model="requestTitle" required>
          
          </textarea>

        </div>

        <p class="text-xs text-right">

          {{ numberOfCharactersLeft }} characters left.

        </p>

      </div>

      <div v-show="isAdmin">

        <p class="block mb-1">Released</p>

        <div class="flex items-center gap-x-2 mb-1">

          <input class="text-purple-800 focus:ring-purple-800" type="radio" name="released" id="true" value="true" v-model="requestReleased">

          <label for="true">True</label>

        </div>

        <div class="flex items-center gap-x-2">

          <input class="text-purple-800 focus:ring-purple-800" type="radio" name="released" id="false" value="false" v-model="requestReleased">

          <label for="false">False</label>

        </div>

      </div>

    </fieldset>

    <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="submit">

      Update Request

    </button>

  </form>

</template>

<style scoped>

  .v-enter-active, 
  .v-leave-active {

    transition: all 0.3s ease;

  }

  .v-enter-from,
  .v-leave-to {

    opacity: 0;

    transform: translateX( -200px );

  }

</style>