
<script setup>

  // import { ref } from 'vue';

  import { useRouter } from 'vue-router';

  import { state, closeModal, isAdmin, logUserOut } from '../store/state';

  import { getToken } from '../utils/utils';
  
  import { XMarkIcon, MinusCircleIcon } from '@heroicons/vue/24/solid';

  const router = useRouter();

  function onRemoveButtonClick( id ) {

    const index = state.requestsReleaseList.findIndex( request => request.id === id );

    if ( index !== -1 ) state.requestsReleaseList.splice( index, 1 );

  }

  const onEmailRequestersButtonClick = async () => {

    if ( ! isAdmin ) return router.push( { name: 'home' } );

    try {

      const requestIds = state.requestsReleaseList.map( request => request.id );

      const options = {

        method: 'POST',

        body: JSON.stringify( { requestIds } ),

        headers: {

          'Authorization': `Bearer ${ getToken( 'token' ) }`,

          'Content-Type': 'application/json',
          
        }

      }

      // console.log( requestIds );

      let response = await fetch( `${process.env.SERVER_URL}/notifications`, options );

      if ( response.ok ) {

        // state.requests.find( request => request._id === currentModalComponent.request._id ).released = ! request.released;

        // alert( 'Email requesters successful' );

        closeModal();

      } else if ( response.status === 401 ) {

        logUserOut();

        router.push( { name: 'login' } );

      }
      
    } catch (error) {
      
      console.log( error );
      
    }

  }

</script>

<template>

  <div class="relative w-full max-w-sm px-5 py-8 border shadow rounded bg-white">

    <button class="absolute top-2 right-2 p-1 rounded-full bg-red-700" type="button" @click="closeModal">

      <XMarkIcon class="h-6 w-6 text-white" />

    </button>

    <div>

      <h2 class="max-w-[200px] mx-auto mb-8 text-xl text-center font-bold">
        
        Requests
      
      </h2>

      <div v-if="state.requestsReleaseList.length">

        <ul class="mb-6 space-y-2">
      
          <li 
          
            v-for="( { id, title } ) in state.requestsReleaseList" 
            
            :key="id" 
            
            class="flex justify-between items-center font-medium">
            
            <span>{{ title }}</span>

            <button 
            
              @click="() => onRemoveButtonClick( id )" 
            
              type="button" 
              
              aria-label="Remove Request from request list"
              
            >

              <MinusCircleIcon class="h-7 w-7 fill-red-700" />

            </button>
    
          </li>

        </ul>

        <p class="mb-5 text-sm text-gray-500">

          Users that have submitted or liked the requested kits above will be notified by email of the release.

        </p>

        <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="button" @click="onEmailRequestersButtonClick">

          Email Requesters

        </button>
      
      </div>

      <p v-else class="text-center">Add Requests</p>

    </div>

  </div>

</template>