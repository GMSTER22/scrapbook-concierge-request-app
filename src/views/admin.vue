
<script setup>

  import { ref, computed, onBeforeMount, watch } from 'vue';

  import { useRouter } from 'vue-router';

  import Header from '../components/header.vue';

  import UpdateButton from '../components/buttons/updateButton.vue';
  
  import DeleteButton from '../components/buttons/deleteButton.vue';

  import NotifyButton from '../components/buttons/notifyButton.vue';

  import Spinner from '../components/spinner.vue';

  import Pagination from '../components/pagination.vue';
  
  import { state, onUpdateButtonClicked, onDeleteButtonClicked, onReleaseButtonClicked, pushAlert, logUserOut } from '../store/state';

  import { formatDate, getToken } from '../utils/utils';

  const router = useRouter();

  const REQUESTS_PER_PAGE = 20;

  const showReleased = ref( false );

  const isLoadingRequests = ref( true );

  // const requests = ref( null );

  const currentPage = ref( 0 );

  const totalPages = ref( 1 );

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( 'usersLength-desc' );

  const filteredRequests = computed( () => {

    return state.requests
    
      ?.filter( request => request.title.toLocaleLowerCase()
    
      .includes( searchRequestValue.value.toLocaleLowerCase() ) ? request : '' );

  } );

  const requestsReleaseListIds = computed( () => state.requestsReleaseList.map( request => request.id ) );

  function toggleIdFromRequestList( id, title ) {

    const index = state.requestsReleaseList.findIndex( request => request.id === id );

    if ( index != -1 ) state.requestsReleaseList.splice( index, 1 );

    else state.requestsReleaseList.push( { id, title } );

  }

  const options = {

    method: "GET",

    headers: {

      'Authorization': `Bearer ${ getToken( 'token' ) }`

    }

  }

  const fetchPage = async ( page ) => {

    try {

      const sortingValues = sortRequestValue.value.split( '-' );
  
      isLoadingRequests.value = true;
  
      const response = await fetch( `${process.env.SERVER_URL}/requests?page=${page}&limit=${REQUESTS_PER_PAGE}&released=${showReleased.value}&sort_by=${sortingValues[0]}&order_by=${sortingValues[1]}`, options );
      
      const data = await response.json();
      
      if ( response.ok ) {
  
        state.requests = data.requests;
  
        currentPage.value = data.page;
  
        totalPages.value = data.total;
  
      } else if ( response.status === 401 ) {

        pushAlert( 'failure', 'You\'re not logged in.' );

        logUserOut();

        router.push( { name: 'login' } );

      } else {

        pushAlert( 'failure', data?.message );

      }

      isLoadingRequests.value = false;
      
    } catch ( error ) {

      console.error( error );

      pushAlert( 'failure', 'An Error occurred while retrieving the requests. Try again later.' );

    }

  }

  onBeforeMount( () => fetchPage( 1 ) );

  watch( sortRequestValue, fetchPage );

  watch( showReleased, fetchPage );

</script>

<template>

  <Header />

  <main class="relative min-h-[calc(100vh-70px)] px-5 py-14 sm:min-h-[calc(100vh-60px)] sm:py-28 lg:px-0">

    <div class="max-w-4xl mx-auto mb-14">

      <div class="sticky top-10 z-10 mb-5 text-right">

        <button 
        
          class="px-4 py-2 rounded-md bg-purple-900 text-white" 
          
          type="button" 
          
          @click="onReleaseButtonClicked">
          
          Email Requesters
        
        </button>

      </div>

      <form class="flex flex-col-reverse justify-between gap-5 mb-20 sm:flex-row">

        <fieldset class="sm:self-end sm:w-1/2">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingRequests">

        </fieldset>

        <div class="self-end">

          <fieldset class="mb-5 flex justify-between">

            <label for="released" class="select-none hover:cursor-pointer"><strong>{{ showReleased ? 'Hide' : 'Show' }}</strong> released</label>

            <div class="relative grid grid-cols-1 w-16 p-1 bg-gray-300 rounded-full has-[:checked]:bg-purple-900 transition-colors">
              
              <input id="released" class="w-full peer row-start-1 col-start-1 ring-0 border-0 opacity-0 focus:ring-0" type="checkbox" v-model="showReleased">
              
              <span class="pointer-events-none row-start-1 col-start-1 w-5 h-5 rounded-full bg-white peer-checked:translate-x-9 transition-transform"></span>

            </div>

          </fieldset>

          <fieldset>

            <label for="sort"><span class="sr-only">Sort By</span></label>

            <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingRequests">

              <option value="" disabled>Sort by</option>
              
              <option value="usersLength-asc">Likes Asc</option>

              <option value="usersLength-desc">Likes Desc</option>

              <option value="releaseDate-asc">Released Date Asc</option>

              <option value="releaseDate-desc">Released Date Desc</option>

            </select>

          </fieldset>

        </div>

      </form>

      <div v-if="isLoadingRequests" class="mb-7">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! state.requests.length" class="text-center">
        
          <p class="mb-8 text-2xl">

            No requests made

          </p>
        
        </div>

        <div v-else>

          <ul v-if="filteredRequests.length">

            <li class="relative grid grid-rows-3 grid-cols-1 justify-between items-center gap-y-2 mb-10 p-2 rounded odd:bg-purple-100 sm:grid-rows-1 sm:grid-cols-[64px_1fr_auto_auto] sm:gap-x-5 shadow-[0_0_3px_rgb(0,0,0)] sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="request in filteredRequests" :key="request._id">
              <!-- ({ _id: id, createdAt, title, users, released, url }, index) -->

              <span v-show="request.released" class="absolute left-0 -top-5 px-3 py-[2px] text-xs font-medium rounded bg-green-500 empty:hidden">

                Released

              </span>

              <span class="text-left text-xs text-neutral-600 sm:text-center">
                
                {{ formatDate( request.releaseDate ) ?? 'NA' }}
              
              </span>

              <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">
                
                {{ request.title }}
              
              </span>

              <div class="text-right">

                <span class="text-sm">{{ request.users.length - 1 }}</span>

              </div>

              <div class="flex gap-x-2 justify-self-end">

                <UpdateButton 
                
                  :is-disabled="! state.user?.admin" 
                  
                  @update-button-clicked="() => onUpdateButtonClicked( request, () => fetchPage( currentPage ) )" />

                <DeleteButton 
                
                :is-disabled="! state.user?.admin"  
                
                @delete-button-clicked="() => onDeleteButtonClicked( request, () => fetchPage( currentPage ) )" />

                <NotifyButton 
                
                  :released="requestsReleaseListIds.includes( request._id )"
                  
                  @notify-button-clicked="() => toggleIdFromRequestList( request._id, request.title )" 
                  
                />

              </div>
              
            </li>

          </ul>

          <p v-else class="text-2xl text-center">
            
            No result found...
          
          </p>

        </div>
        
      </div>
      
    </div>

    <Pagination 

      v-if="state.requests?.length" 
      
      :disabled="isLoadingRequests"
    
      :current="currentPage" 
      
      :total="totalPages" 
      
      @change-page="( page ) => fetchPage( page )" />

  </main>

</template>