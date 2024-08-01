
<script setup>

  import { ref, computed, onBeforeMount, watch } from 'vue';

  import { useRouter } from 'vue-router';

  import Header from '../components/header.vue';

  import Footer from '../components/footer.vue';

  import Spinner from '../components/spinner.vue';

  import Pagination from '../components/pagination.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import { formatDate, getToken } from "../utils/utils";

  import { state, onMakeRequestButtonClick, onLikeButtonClicked, logUserOut, pushAlert } from '../store/state';

  const router = useRouter();

  const REQUESTS_PER_PAGE = 20;

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

  const logUserOutAndRedirectHome = () => {

    logUserOut();

    router.push( { name: 'login' } );

  }

  const options = {

    method: "GET",

    headers: {

      'Authorization': `Bearer ${ getToken( 'token' ) }`,

    }

  }

  const fetchPage = async ( page=currentPage.value ) => {

    try {

      const sortingValues = sortRequestValue.value.split( '-' );
      
      // if ( page === currentPage.value ) return;
  
      isLoadingRequests.value = true;
  
      const response = await fetch( `${process.env.SERVER_URL}/requests?page=${page}&limit=${REQUESTS_PER_PAGE}&released=false&sort_by=${sortingValues[0]}&order_by=${sortingValues[1]}`, options );
  
      const data = await response.json();
      
      if ( response.ok ) {
  
        state.requests = data.requests;
  
        currentPage.value = data.page;
  
        totalPages.value = data.total;
  
      } else if ( response.status === 401 ) {

        pushAlert( 'failure', 'You\'re not logged in.' );

        logUserOutAndRedirectHome();

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

</script>

<template>

  <Header />

  <main class="min-h-[calc(100vh-70px)] px-5 py-14 sm:min-h-[calc(100vh-60px)] sm:py-28 lg:px-0">

    <div class="max-w-3xl mx-auto mb-14">

      <form class="flex flex-col-reverse justify-between gap-5 mb-20 sm:flex-row">

        <fieldset class="sm:w-1/2">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingRequests">

        </fieldset>

        <fieldset class="self-end">

          <label for="sort">
            
            <span class="sr-only">Sort By</span>
          
          </label>

          <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingRequests">

            <option value="" disabled>Sort by</option>

            <!-- <option value="release">Released</option> -->
            
            <option value="createdAt-asc">Date Asc</option>

            <option value="createdAt-desc">Date Desc</option>
            
            <option value="usersLength-asc">Likes Asc</option>

            <option value="usersLength-desc">Likes Desc</option>

          </select>

        </fieldset>

      </form>

      <div v-if="isLoadingRequests" class="mb-7">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! state.requests?.length" class="text-center">
        
          <p class="mb-8 text-2xl">

            No requests made

          </p>

          <button type="button" class="px-4 py-2 rounded font-semibold bg-purple-900 text-white" @click="() => onMakeRequestButtonClick( () => fetchPage( currentPage ) )">
              
            Make A Request

          </button>
        
        </div>

        <div v-else>

          <ul v-if="filteredRequests.length">

            <li class="grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="request in filteredRequests" :key="request._id">
            <!-- ({ _id: id, createdAt, title, users }) -->
              
              <span class="text-left sm:text-right text-xs text-neutral-600">
                
                {{ formatDate( request.createdAt ) }}
              
              </span>

              <span class="px-5 mb-3 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:mb-0 sm:text-base sm:text-left">

                {{ request.title }}

              </span>

              <div class="flex gap-x-1 items-center justify-self-end">

                <span>

                  {{ request.users.length - 1 }}

                </span>

                <LikeButton 
                  
                  :id="request._id" 
                  
                  :is-liked="request.users.includes( state.user?.id )" 
                  
                  :likes="request.users.length - 1" 
                  
                  :is-disabled="request.users[0] === state.user?.id" 
                  
                  @like-button-clicked="() => onLikeButtonClicked( request, () => fetchPage( currentPage ), logUserOutAndRedirectHome )"
                  
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

  <Footer />

</template>
