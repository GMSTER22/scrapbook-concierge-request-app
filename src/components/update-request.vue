
<script setup>

  import { ref, computed } from 'vue';

  import { useRouter } from 'vue-router';

  import { state, isAdmin, currentModalComponent, closeModal, isAuthenticated } from '../store/state';

  import { fetchRequests } from '../utils/utils';
  
  import { XMarkIcon } from '@heroicons/vue/24/solid';

  const router = useRouter();

  const request = currentModalComponent.request;

  const requestTitle = ref( request.title );

  const requestURL = ref( request.url );

  const requestReleased = ref( request.released ? 'true' : 'false' );

  const isUrlField = computed( () =>  requestReleased.value === 'true' && isAdmin );

  const numberOfCharactersLeft = computed( () => {

    return requestTitle.value ? 
    
      100 - requestTitle.value.length

      :

      100

  } );

  const onRequestUpdate = async ( event ) => {

    event.preventDefault();

    if ( ! isAuthenticated() ) return router.push( { name: 'login' } );

    try {

      const data = JSON.stringify( { 
        
        title: requestTitle.value,
        
        url: requestURL.value,

        released: requestReleased.value
      
      } );

      console.log( data, 'BEFORE SUBMIT' );

      const options = {

        method: 'PATCH',

        body: data,

        headers: {

          'Content-Type': 'application/json',

          // 'Accept': 'application/json'
          
        },

        credentials: 'include'

      }

      let response = await fetch( `${process.env.SERVER_URL}/requests/${ currentModalComponent.id }/users/${ state.user.id }`, options );

      if ( response.ok ) {

        const fetchedRequests = await fetchRequests();

        state.requests = fetchedRequests;

        closeModal();

      }
      
    } catch (error) {
      
      console.log( error );
      
    }

  }

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

        <div v-show="isUrlField" class="mb-4">

          <label class="block mb-1" for="url">URL</label>

          <input class="w-full rounded" type="text" name="url" id="url" v-model="requestURL" :required="isAdmin && requestReleased">

        </div>

      </Transition>

      <div class="mb-4">

        <div class="w-full">

          <label class="block mb-1" for="request">Title</label>

          <textarea class="w-full rounded font-medium" name="request" id="request" maxlength="100" v-model="requestTitle"></textarea>        

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