
<script setup>

  import { ref, computed, onMounted, onBeforeMount, onBeforeUnmount, watch } from 'vue';

  import { useRouter } from 'vue-router';

  import Header from '../components/header.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import UpdateButton from '../components/buttons/updateButton.vue';
  
  import DeleteButton from '../components/buttons/deleteButton.vue';

  import NotifyButton from '../components/buttons/notifyButton.vue';

  import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/vue/24/solid';

  import Footer from '../components/footer.vue';

  import Spinner from '../components/spinner.vue';

  import Pagination from '../components/pagination.vue';
  
  import { state, onUpdateButtonClicked, onDeleteButtonClicked, onReleaseButtonClicked, pushAlert, logUserOut } from '../store/state';

  import { formatDate, getToken } from '../utils/utils';

  const REQUESTS_PER_PAGE = 10;
  
  const router = useRouter();

  const showReleased = ref( false );

  const loadMoreElement = ref( null );

  const isLoadingRequests = ref( false );

  const currentPage = ref( 0 );

  const totalPages = ref( 1 );

  const isLoadingSearchRequest = ref( false );

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( 'usersLength-desc' );

  let intersectionObserver;

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
  
      isLoadingRequests.value = true;
  
      const response = await fetch( `${process.env.SERVER_URL}/requests?page=${page}&limit=${REQUESTS_PER_PAGE}&released=${showReleased.value}&sort_by=${sortingValues[0]}&order_by=${sortingValues[1]}`, options );
      
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

        pushAlert( 'failure', data?.message );

      }
      
    } catch ( error ) {

      console.error( error );

      pushAlert( 'failure', 'An Error occurred while retrieving the requests. Try again later.' );

    } finally {

      isLoadingRequests.value = false;

    }

  }

  const intersectionObserverCallback = ( entries, observer ) => {

    entries.forEach( entry => {

      const nextPage = currentPage.value + 1;

      if ( isLoadingRequests.value || nextPage > totalPages.value ) return;

      if ( entry.isIntersecting ) fetchPage( nextPage );

    } );

  }

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

  watch( showReleased, () => {

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

  <main class="relative min-h-[calc(100vh-70px-104px)] px-5 pt-14 pb-4 sm:min-h-[calc(100vh-60px-104px)] sm:pt-28 lg:px-0">

    <div class="max-w-4xl mx-auto mb-14">

      <div class="sticky top-10 z-10 mb-5 text-right">

        <button 
        
          class="px-4 py-2 rounded-md bg-purple-900 text-white" 
          
          type="button" 
          
          @click="onReleaseButtonClicked">
          
          Email Requesters
        
        </button>

      </div>

      <form class="flex flex-col-reverse justify-between gap-5 mb-20 sm:flex-row" @submit="onFormSubmit">

        <fieldset class="sm:self-end sm:w-1/2">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingRequests">

        </fieldset>

        <div class="self-end">

          <fieldset class="mb-5 flex justify-between">

            <label for="released" class="select-none hover:cursor-pointer"><strong>{{ showReleased ? 'Hide' : 'Show' }}</strong> released</label>

            <div class="relative grid grid-cols-1 w-16 p-1 bg-gray-300 rounded-full has-[:checked]:bg-purple-900 transition-colors">
              
              <input id="released" class="w-full peer row-start-1 col-start-1 ring-0 border-0 opacity-0 focus:ring-0" type="checkbox" v-model="showReleased" :disabled="!! searchRequestValue">
              
              <span class="pointer-events-none row-start-1 col-start-1 w-5 h-5 rounded-full bg-white peer-checked:translate-x-9 transition-transform"></span>

            </div>

          </fieldset>

          <fieldset>

            <label for="sort"><span class="sr-only">Sort By</span></label>

            <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingRequests || !! searchRequestValue">

              <option value="" disabled>Sort by</option>
              
              <option value="usersLength-asc">
                
                Likes Asc
                <!-- Likes <ArrowLongUpIcon class="h-5 w-1 text-black"/> -->
              
              </option>

              <option value="usersLength-desc">Likes Desc</option>

              <option value="releaseDate-asc">Released Date Asc</option>

              <option value="releaseDate-desc">Released Date Desc</option>

            </select>

          </fieldset>

        </div>

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

              <div class="flex gap-x-2 justify-self-end">

                <UpdateButton 

                  :is-disabled="! state.user?.admin" 
                  
                  @update-button-clicked="() => onUpdateButtonClicked( request )" />

                <DeleteButton 

                  :is-disabled="! state.user?.admin" 
                  
                  @delete-button-clicked="() => onDeleteButtonClicked( request )" />

              </div>

            </li>

          </ul>

          <p v-else class="text-2xl text-center">
            
            No result found...

          </p>

        </div>

        <div v-else>

          <div v-if="! state.requests?.length" class="text-center">
          
            <p class="mb-8 text-2xl">

              No requests made

            </p>
          
          </div>

          <ul v-else class="space-y-10">

            <li class="relative grid grid-rows-3 grid-cols-1 justify-between items-center gap-y-2 p-2 rounded odd:bg-purple-100 sm:grid-rows-1 sm:grid-cols-[64px_1fr_auto_auto] sm:gap-x-5 shadow-[0_0_3px_rgb(0,0,0)] sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="request in state.requests" :key="request._id">
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
                  
                  @update-button-clicked="() => onUpdateButtonClicked( request )" />

                <DeleteButton 
                
                  :is-disabled="! state.user?.admin" 
                  
                  @delete-button-clicked="() => onDeleteButtonClicked( request )" />

                <NotifyButton 
                
                  :released="requestsReleaseListIds.includes( request._id )" 
                  
                  @notify-button-clicked="() => toggleIdFromRequestList( request._id, request.title )" 
                  
                />

              </div>
              
            </li>

          </ul>

        </div>
        
      </div>

      <div v-show="! searchRequestValue && currentPage !== totalPages && !! totalPages"  
      
        ref="loadMoreElement">

        <div v-if="isLoadingRequests" class="mt-7">

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