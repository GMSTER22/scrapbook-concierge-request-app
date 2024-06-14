
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

  const REQUESTS_PER_PAGE = 15;

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

  const options = {

    method: "GET",

    credentials: 'include'

  }

  const fetchPage = async ( page ) => {

    console.log( page );

    if ( page === currentPage.value ) return;

    isLoadingReleasedRequests.value = true;

    const response = await fetch( `http://localhost:3000/requests?page=${page}&limit=${REQUESTS_PER_PAGE}&released=true`, options );

    if ( response.ok ) {

      const data = await response.json();

      releasedRequests.value = data.requests;

      currentPage.value = data.page;

      totalPages.value = data.total;

    }
      
    isLoadingReleasedRequests.value = false;

  }

  onBeforeMount( async () => {

    const response = await fetch( `http://localhost:3000/requests?page=1&limit=${REQUESTS_PER_PAGE}&released=true`, options );

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

      <div v-if="isLoadingReleasedRequests">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! releasedRequests.length" class="text-center">
        
          <p class="mb-8 text-2xl">

            No requests have been released yet.

          </p>
        
        </div>

        <div v-else>
        
          <form class="flex justify-between mb-20">
  
            <fieldset class="w-1/2">
  
              <label for="search"></label>
  
              <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue">
  
            </fieldset>
  
            <fieldset class="flex flex-col">
  
              <label for="sort"><span class="sr-only">Sort By</span></label>
  
              <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue">
  
                <option value="" disabled>Sort by</option>
  
                <option value="date-asc">Date Asc</option>
  
                <option value="date-desc">Date Desc</option>
                
                <option value="likes-asc">Likes Asc</option>
  
                <option value="likes-desc">Likes Desc</option>
  
              </select>
  
            </fieldset>
  
          </form>

          <ul v-if="filteredRequests.length">

            <li class="grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ _id: id, createdAt, title, released, url }) in filteredRequests" :key="id">
              
              <span class="text-left sm:text-right text-xs text-neutral-600">
                
                {{ formatDate( createdAt ) }}
              
              </span>

              <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">

                {{ title }}

              </span>

              <a
                
                class="justify-self-center px-2 py-1 text-sm text-center bg-green-800 text-white rounded-md" 
                
                target="_blank" 
                
                :href="url">
                
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

      v-if="releasedRequests.length"
    
      :current="currentPage" 
      
      :total="totalPages" 
      
      @change-page="( page ) => fetchPage( page )" />

  </main>

</template>