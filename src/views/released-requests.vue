
<script setup>

  import { ref, computed, onBeforeMount, watch } from 'vue'; 

  import { useRouter } from 'vue-router';

  import Header from '../components/header.vue';

  import Pagination from '../components/pagination.vue';

  import Spinner from '../components/spinner.vue';

  import Footer from '../components/footer.vue';

  import { formatDate, getToken } from '../utils/utils';

  import { logUserOut, state } from '../store/state';

  const router = useRouter();

  const REQUESTS_PER_PAGE = 20;

  const isLoadingReleasedRequests = ref( true );

  // const releasedRequests = ref( null );

  const currentPage = ref( 0 );

  const totalPages = ref( 1 );

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( 'releaseDate-asc' );

  const filteredRequests = computed( () => {

    return state.requests
    
      ?.filter( request => request.title.toLocaleLowerCase()
      
      .includes( searchRequestValue.value.toLocaleLowerCase() ) ? request : '' );

  } );

  const options = {

    method: "GET",

    headers: {

      'Authorization': `Bearer ${ getToken( 'token' ) }`,

    }

  }

  const fetchPage = async ( page ) => {

    try {

      const sortingValues = sortRequestValue.value.split( '-' );
      
      // if ( page === currentPage.value ) return;
  
      isLoadingReleasedRequests.value = true;
  
      const response = await fetch( `${process.env.SERVER_URL}/requests?page=${page}&limit=${REQUESTS_PER_PAGE}&released=true&sort_by=${sortingValues[0]}&order_by=${sortingValues[1]}`, options );
  
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

        pushAlert( 'failure', result.message );

      }
        
      isLoadingReleasedRequests.value = false;

    } catch ( error ) {
      
      console.warn( error );

      pushAlert( 'failure', 'An Error occurred while retrieving the requests. Try again later.' );

    }

  }

  onBeforeMount( () => fetchPage( 1 ) );

  watch( sortRequestValue, fetchPage );

</script>

<template>

  <Header />

  <main class="min-h-[calc(100vh-70px-96px)] py-14 px-5 sm:min-h-[calc(100vh-60px-96px)] sm:py-28 lg:px-0">

    <div class="max-w-3xl mx-auto mb-14">

      <form class="flex flex-col-reverse justify-between gap-5 mb-20 sm:flex-row">
  
        <fieldset class="sm:w-1/2">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingReleasedRequests">

        </fieldset>

        <fieldset class="self-end">

          <label for="sort"><span class="sr-only">Sort By</span></label>

          <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingReleasedRequests">

            <option value="" disabled>Sort by</option>

            <option value="releaseDate-asc">Released Date Asc</option>

            <option value="releaseDate-desc">Released Date Desc</option>
            
            <!-- <option value="usersLength-asc">Likes Asc</option>

            <option value="usersLength-desc">Likes Desc</option> -->

          </select>

        </fieldset>

      </form>

      <div v-if="isLoadingReleasedRequests" class="mb-7">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! state.requests?.length" class="text-center">
        
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

      v-if="state.requests?.length"
    
      :current="currentPage" 
      
      :total="totalPages" 

      :disabled="isLoadingReleasedRequests"
      
      @change-page="( page ) => fetchPage( page )" />

  </main>

  <Footer />

</template>