
<script setup>

  import { ref, computed, onBeforeMount } from 'vue';

  import Header from '../components/header.vue';

  import UpdateButton from '../components/buttons/updateButton.vue';
  
  import DeleteButton from '../components/buttons/deleteButton.vue';

  import NotifyButton from '../components/buttons/notifyButton.vue';

  import Spinner from '../components/spinner.vue';

  import Pagination from '../components/pagination.vue';
  
  import { state, onUpdateButtonClicked, onDeleteButtonClicked, onReleaseButtonClicked } from '../store/state';

  import { formatDate } from '../utils/utils';

  const REQUESTS_PER_PAGE = 20;

  const isLoadingRequests = ref( true );

  const requests = ref( null );

  const currentPage = ref( 1 );

  const totalPages = ref( 1 );

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( '' );

  const filteredRequests = computed( () => {

    return requests.value.sort( ( a, b ) => {

      switch ( sortRequestValue.value ) {

        case 'date-asc':
          return new Date( a.createdAt ).valueOf() - new Date( b.createdAt ).valueOf();

        case 'date-desc':
          return new Date( b.createdAt ).valueOf() - new Date( a.createdAt ).valueOf();

        case 'likes-asc':
          return a.users.length - b.users.length;

        case 'likes-desc':
          return b.users.length - a.users.length;
      
        default:
          return 0;

      }
      
    } )
    
      .filter( request => request.title.toLocaleLowerCase()
    
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

    credentials: 'include'

  }

  const fetchPage = async ( page ) => {

    // console.log( page );

    if ( page === currentPage.value ) return;

    isLoadingRequests.value = true;

    const response = await fetch( `${process.env.SERVER_URL}/requests?page=${page}&limit=${REQUESTS_PER_PAGE}`, options );

    if ( response.ok ) {

      const data = await response.json();

      requests.value = data.requests;

      currentPage.value = data.page;

      totalPages.value = data.total;

    }
      
    isLoadingRequests.value = false;

  }

  onBeforeMount( async () => {

    const response = await fetch( `${process.env.SERVER_URL}/requests?page=1&limit=${REQUESTS_PER_PAGE}`, options );

    if ( response.ok ) {

      const data = await response.json();

      requests.value = data.requests;

      currentPage.value = data.page;

      totalPages.value = data.total;

    }
      
    isLoadingRequests.value = false;

  } )

</script>

<template>

  <Header />

  <main class="relative min-h-[calc(100vh-60px)] px-5 py-14 sm:py-28 lg:px-0">

    <div class="max-w-4xl mx-auto">

      <div class="mb-5 text-right">

        <button 
        
          class="px-4 py-2 rounded-md bg-purple-900 text-white" 
          
          type="button" 
          
          @click="onReleaseButtonClicked">
          
          Email Requesters
        
        </button>

      </div>

      <form class="flex justify-between mb-20">

        <fieldset class="w-1/2">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingRequests">

        </fieldset>

        <fieldset class="flex flex-col">

          <label for="sort"><span class="sr-only">Sort By</span></label>

          <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingRequests">

            <option value="" disabled>Sort by</option>

            <option value="date-asc">Date Asc</option>

            <option value="date-desc">Date Desc</option>
            
            <option value="likes-asc">Likes Asc</option>

            <option value="likes-desc">Likes Desc</option>

          </select>

        </fieldset>

      </form>

      <div v-if="isLoadingRequests" class="mb-7">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! requests.length" class="text-center">
        
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

              <span class="text-left text-xs text-neutral-600 sm:text-right">
                
                {{ formatDate( request.createdAt ) }}
              
              </span>

              <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">
                
                {{ request.title }}
              
              </span>

              <div class="text-right">

                <span class="text-sm">{{ request.users.length - 1 }}</span>

              </div>

              <div class="flex gap-x-2 justify-self-end">

                <UpdateButton @update-button-clicked="()=> onUpdateButtonClicked( request )" />

                <DeleteButton @delete-button-clicked="()=> onDeleteButtonClicked( request )" />

                <NotifyButton 
                
                  :released="requestsReleaseListIds.includes( request._id )"
                  
                  @notify-button-clicked="() => toggleIdFromRequestList( request._id, request.title )" 
                  
                />

                <!-- <NotifyButton :release="requestsReleaseListIds.includes( id )"

                  :disable="! released || ! url"
                  
                  @notify-button-clicked="() => toggleIdFromRequestList( id, title )" 
                  
                /> -->

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

      v-if="requests?.length" 
      
      :disabled="isLoadingRequests"
    
      :current="currentPage" 
      
      :total="totalPages" 
      
      @change-page="( page ) => fetchPage( page )" />

  </main>

</template>