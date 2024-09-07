
<script setup>

  import { ref, computed, onMounted, onBeforeMount, onBeforeUnmount, watch } from 'vue'; 

  import { useRouter } from 'vue-router';

  import Header from '../components/header.vue';

  import Pagination from '../components/pagination.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import Spinner from '../components/spinner.vue';

  import Footer from '../components/footer.vue';

  import { formatDate, getToken } from '../utils/utils';

  import { state, onLikeButtonClicked, logUserOut, pushAlert } from '../store/state';

  const REQUESTS_PER_PAGE = 20;
  
  const router = useRouter();

  const loadMoreElement = ref( null );

  const isLoadingReleasedRequests = ref( false );

  const currentPage = ref( 0 );

  const totalPages = ref( 1 );

  const isLoadingSearchRequest = ref( false );

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( 'releaseDate-asc' );

  let intersectionObserver;

  const options = {

    method: "GET",

    headers: {

      'Authorization': `Bearer ${ getToken( 'token' ) }`,

    }

  }

  const fetchRequestsByTitle = async () => {

    try {

      const sortingValues = sortRequestValue.value.split( '-' );

      isLoadingSearchRequest.value = true;

      const response = await fetch( `${process.env.SERVER_URL}/requests/search?title=${ searchRequestValue.value }&sort_by=${sortingValues[0]}&order_by=${sortingValues[1]}`, options );

      const data = await response.json();

      if ( response.ok ) {

        state.searchRequestResult = data.requests;

      } else if ( response.status === 401 ) {

        pushAlert( 'failure', 'You\'re not logged in.' );

        logUserOutAndRedirectHome();

      } else {

        pushAlert( 'failure', data?.message );

      }

    } catch ( error ) {

      console.error( error );

      pushAlert( 'failure', 'An Error occurred while searching. Try again later.' );

    } finally {

      isLoadingSearchRequest.value = false;

    }

  }

  const onFormSubmit = event => {

    event.preventDefault();

    if ( ! searchRequestValue.value ) return;

    fetchRequestsByTitle();

  }

  const fetchPage = async ( page ) => {

    try {

      const sortingValues = sortRequestValue.value.split( '-' );
      
      // if ( page === currentPage.value ) return;
  
      isLoadingReleasedRequests.value = true;
  
      const response = await fetch( `${process.env.SERVER_URL}/requests?page=${page}&limit=${REQUESTS_PER_PAGE}&released=true&sort_by=${sortingValues[0]}&order_by=${sortingValues[1]}`, options );
  
      const data = await response.json();
      
      if ( response.ok ) {
  
        if ( page > 1 ) state.requests.push( ...data.requests );
        
        else state.requests = data.requests;
  
        currentPage.value = data.page;
  
        totalPages.value = data.total;
  
      } else if ( response.status === 401 ) {

        pushAlert( 'failure', 'You\'re not logged in.' );
  
        logUserOut();

        router.push( { name: 'login' } );
  
      } else {

        pushAlert( 'failure', result.message );

      }

    } catch ( error ) {
      
      console.warn( error );

      pushAlert( 'failure', 'An Error occurred while retrieving the requests. Try again later.' );

    } finally {

      isLoadingReleasedRequests.value = false;

    }

  }

  const intersectionObserverCallback = ( entries, observer ) => {

    entries.forEach( entry => {

      const nextPage = currentPage.value + 1;

      if ( isLoadingReleasedRequests.value || nextPage > totalPages.value ) return;

      if ( entry.isIntersecting ) fetchPage( nextPage );

    } );

  }

  // onBeforeMount( () => fetchPage( 1 ) );

  onBeforeMount( () => {

    if ( !! state.searchRequestResult ) state.searchRequestResult = null;

  } );

  onMounted( () => {

    intersectionObserver = new IntersectionObserver( intersectionObserverCallback, {

      root: null,
      
      rootMargin: '0px',
      
      threshold: 0
      
    } );

    intersectionObserver.observe( loadMoreElement.value );

  } );

  onBeforeUnmount( () => intersectionObserver.unobserve( loadMoreElement.value ) );

  watch( sortRequestValue, () => {

    currentPage.value = 0;

    state.requests = null;

    fetchPage();

  } );

  watch( searchRequestValue, ( newValue, oldValue ) => {

    if ( ! newValue ) state.searchRequestResult = null;

  } );

</script>

<template>

  <Header />

  <main class="min-h-[calc(100vh-70px-144px)] pt-14 pb-4 px-5 sm:min-h-[calc(100vh-60px-144px)] sm:pt-28 lg:px-0">

    <div class="max-w-3xl mx-auto mb-14">

      <form class="flex flex-col-reverse justify-between gap-5 mb-20 sm:flex-row" @submit="onFormSubmit">
  
        <fieldset class="sm:w-1/2">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingReleasedRequests">

        </fieldset>

        <fieldset class="self-end">

          <label for="sort"><span class="sr-only">Sort By</span></label>

          <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingReleasedRequests || !! searchRequestValue">

            <option value="" disabled>Sort by</option>

            <option value="releaseDate-asc">Released Date Asc</option>

            <option value="releaseDate-desc">Released Date Desc</option>
            
            <!-- <option value="usersLength-asc">Likes Asc</option>

            <option value="usersLength-desc">Likes Desc</option> -->

          </select>

        </fieldset>

      </form>

      <div v-if="currentPage > 0">

        <p v-if="isLoadingSearchRequest" class="text-center">
          
          Searching...
        
        </p>

        <div v-else-if="state.searchRequestResult">

          <ul v-if="!! state.searchRequestResult.length" class="space-y-10">

            <li class="relative grid gap-x-3 gap-y-4 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="request in state.searchRequestResult" :key="request._id">

              <span v-show="request.released && request.url" 
            
                class="absolute left-0 -top-5 px-3 py-[2px] text-xs font-medium rounded bg-green-500 empty:hidden">

                released

              </span>
              
              <span class="text-left sm:text-right text-xs text-neutral-600">
                
                {{ formatDate( request.createdAt ) }}
              
              </span>

              <span class="px-5 mb-3 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:mb-0 sm:text-base sm:text-left">

                {{ request.title }}

              </span>

              <div v-if="! request.released" class="flex gap-x-1 items-center justify-self-end">

                <span>

                  {{ request.users.length - 1 }}

                </span>

                <LikeButton 
                  
                  :id="request._id" 
                  
                  :is-liked="request.users.includes( state.user?.id )" 
                  
                  :likes="request.users.length - 1" 
                  
                  :is-disabled="request.users[0] === state.user?.id" 
                  
                  @like-button-clicked="() => {
                    
                    onLikeButtonClicked( 
                      
                      [ 
                      
                        request, 
                        
                        state.requests.find( ( { _id } ) => _id === request._id ) 
                    
                      ], 
                    
                      logUserOutAndRedirectHome 
                    
                    ) 
                    
                  }"
                  
                />

              </div>

              <a v-else 
              
                class="px-2 py-1 text-sm text-center bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors duration-200" 

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

        <div v-else>

          <div v-if="! state.requests?.length" class="text-center">
          
            <p class="mb-8 text-2xl">

              No requests have been released yet.

            </p>
          
          </div>

          <ul v-else class="space-y-10">

            <li class="grid gap-x-3 gap-y-4 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="request in state.requests" :key="request._id">
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

        </div>

      </div>

      <div v-show="! searchRequestValue && currentPage !== totalPages && !! totalPages"  
      
        ref="loadMoreElement">

        <div v-if="isLoadingReleasedRequests" class="mt-7">

          <Spinner />

        </div>

        <button v-else 
        
          class="block mx-auto mt-5 px-4 py-2 rounded-md bg-green-700 text-white"
        
          @click="fetchPage( currentPage + 1 )" 
          
          type="submit">
          
          Load More
        
        </button>

      </div>

    </div>

  </main>

  <Footer />

</template>