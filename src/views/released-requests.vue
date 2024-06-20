
<script setup>

  import { ref, computed, onBeforeMount } from 'vue'; 

  import Header from '../components/header.vue';

  // import Modal from '../components/modal.vue';

  // import LikeButton from '../components/buttons/likeButton.vue';

  // import UpdateButton from '../components/buttons/updateButton.vue';
  
  // import DeleteButton from '../components/buttons/deleteButton.vue';

  import Pagination from '../components/pagination.vue';

  import Spinner from '../components/spinner.vue';

  import { formatDate, fetchRequests } from '../utils/utils';

  // import { state } from '../store/state';

  const REQUESTS_PER_PAGE = 20;

  const isLoadingReleasedRequests = ref( true );

  const releasedRequests = ref( null );

  const currentPage = ref( 1 );

  const totalPages = ref( 1 );

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( '' );
  
  // const releasedRequests = computed( () => state.requests.filter( ( { released, url } ) => released ) );

  const filteredRequests = computed( () => {

    return releasedRequests.value?.sort( ( a, b ) => {

      switch ( sortRequestValue.value ) {

        case 'released-date-asc':
          return new Date( a.releaseDate ).valueOf() - new Date( b.releaseDate ).valueOf();

        case 'released-date-desc':
          return new Date( b.releaseDate ).valueOf() - new Date( a.releaseDate ).valueOf();

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

  const options = {

    method: "GET",

    credentials: 'include'

  }

  const fetchPage = async ( page ) => {

    console.log( page );

    if ( page === currentPage.value ) return;

    isLoadingReleasedRequests.value = true;

    const response = await fetch( `${process.env.SERVER_URL}/requests?page=${page}&limit=${REQUESTS_PER_PAGE}&released=true`, options );

    if ( response.ok ) {

      const data = await response.json();

      releasedRequests.value = data.requests;

      currentPage.value = data.page;

      totalPages.value = data.total;

    }
      
    isLoadingReleasedRequests.value = false;

  }

  onBeforeMount( async () => {

    const response = await fetch( `${process.env.SERVER_URL}/requests?page=1&limit=${REQUESTS_PER_PAGE}&released=true`, options );

    if ( response.ok ) {

      const data = await response.json();

      releasedRequests.value = data.requests;

      currentPage.value = data.page;

      totalPages.value = data.total;

    }
      
    isLoadingReleasedRequests.value = false;

  } )

</script>

<template>

  <Header />

  <main class="min-h-[calc(100vh-60px)] py-14 px-5 sm:py-28 lg:px-0">

    <div class="max-w-3xl mx-auto">

      <form class="flex justify-between mb-20">
  
        <fieldset class="w-1/2">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingReleasedRequests">

        </fieldset>

        <fieldset class="flex flex-col">

          <label for="sort"><span class="sr-only">Sort By</span></label>

          <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingReleasedRequests">

            <option value="" disabled>Sort by</option>

            <option value="released-date-asc">Released Date Asc</option>

            <option value="released-date-desc">Released Date Desc</option>
            
            <option value="likes-asc">Likes Asc</option>

            <option value="likes-desc">Likes Desc</option>

          </select>

        </fieldset>

      </form>

      <div v-if="isLoadingReleasedRequests" class="mb-7">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! releasedRequests.length" class="text-center">
        
          <p class="mb-8 text-2xl">

            No requests have been released yet.

          </p>
        
        </div>

        <div v-else>

          <ul v-if="filteredRequests.length">

            <li class="grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="request in filteredRequests" :key="request._id">
              <!-- ({ _id: id, createdAt, title, released, url }) -->
              
              <span class="text-left sm:text-right text-xs text-neutral-600">
                
                {{ formatDate( request.releaseDate ) }}
              
              </span>

              <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">

                {{ request.title }}

              </span>

              <a
                
                class="justify-self-center px-2 py-1 text-sm text-center bg-green-700 text-white rounded-md hover:scale-105 transition-all" 
                
                target="_blank" 
                
                :href="request.url">
                
                Buy Now
              
              </a>

            </li>

          </ul>

          <p v-else class="text-2xl text-center">
            
            No result found...
          
          </p>

        </div>

      </div>

    </div>

    <Pagination 

      v-if="releasedRequests?.length"
    
      :current="currentPage" 
      
      :total="totalPages" 

      :disabled="isLoadingReleasedRequests"
      
      @change-page="( page ) => fetchPage( page )" />

  </main>

</template>