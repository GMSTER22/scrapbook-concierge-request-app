
<script setup>

  import { ref, computed, onBeforeMount, watch } from 'vue'; 

  import { useRouter } from 'vue-router';

  import Header from '../components/header.vue';

  import Pagination from '../components/pagination.vue';

  import Spinner from '../components/spinner.vue';

  import UpdateButton from '../components/buttons/updateButton.vue';
  
  import DeleteButton from '../components/buttons/deleteButton.vue';

  import { formatDate, getToken } from '../utils/utils';

  import { state, onMakeRequestButtonClick, onUpdateButtonClicked, onDeleteButtonClicked, logUserOut, pushAlert } from '../store/state';

  const router = useRouter();

  const REQUESTS_PER_PAGE = 20;

  const isLoadingUserRequests = ref( true );

  // const userRequests = ref( null );

  const currentPage = ref( 0 );

  const totalPages = ref( 1 );
  
  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( 'createdAt-asc' );

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

  const fetchPage = async ( page=currentPage.value ) => {

    try {

      const sortingValues = sortRequestValue.value.split( '-' );
  
      isLoadingUserRequests.value = true;
  
      const response = await fetch( `${process.env.SERVER_URL}/requests?id=${ state.user.id }&page=${page}&limit=${REQUESTS_PER_PAGE}&sort_by=${sortingValues[0]}&order_by=${sortingValues[1]}`, options );
  
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

        pushAlert( 'failure', data.message );

      }
        
      isLoadingUserRequests.value = false;

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

      <div>

        <div class="mb-5 text-right">

          <button type="button" class="px-4 py-2 rounded font-semibold bg-purple-900 text-white" @click="() => onMakeRequestButtonClick( () => fetchPage( currentPage ) )">
            
            Make A Request

          </button>

        </div>

        <form class="flex flex-col-reverse justify-between gap-5 mb-20 sm:flex-row">

          <fieldset class="sm:w-1/2">

            <label for="search"></label>

            <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue" :disabled="isLoadingUserRequests">

          </fieldset>

          <fieldset class="self-end">

            <label for="sort"><span class="sr-only">Sort By</span></label>

            <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue" :disabled="isLoadingUserRequests">

              <option value="" disabled>Sort by</option>

              <option value="createdAt-asc">Date Asc</option>

              <option value="createdAt-desc">Date Desc</option>
              
              <option value="usersLength-asc">Likes Asc</option>

              <option value="usersLength-desc">Likes Desc</option>

            </select>

          </fieldset>

        </form>

      </div>

      <div v-if="isLoadingUserRequests" class="mb-7">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! state.requests.length" class="text-center">
        
          <p class="mb-8 text-2xl">

            You haven't made any requests yet

          </p>

          <!-- <button type="button" class="px-4 py-2 rounded font-semibold bg-purple-900 text-white" @click="onMakeRequestButtonClick">
              
            Make A Request

          </button> -->
        
        </div>

        <div v-else>

          <ul v-if="filteredRequests.length">

            <li class="relative grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="request in filteredRequests" :key="request._id">
            <!-- ({ _id: id, createdAt, title, users, released, url }) -->

              <span v-show="request.released && request.url" 
              
                class="absolute left-0 -top-5 px-3 py-[2px] text-xs font-medium rounded bg-green-500 empty:hidden">

                released

              </span>
              
              <span class="text-left sm:text-right text-xs text-neutral-600">
                
                {{ formatDate( request.createdAt ) }}
              
              </span>

              <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">

                {{ request.title }}

              </span>

              <div class="flex gap-x-1 items-center justify-self-end">

                <span class="px-3">

                  {{ request.users.length - 1 }}

                </span>

                <UpdateButton 
                
                  v-if="! request.released" 
                  
                  :is-disabled="! state.user.admin && request.users.length > 1" 
                  
                  @update-button-clicked="() => onUpdateButtonClicked( request, () => fetchPage( currentPage ) )" 
                  
                />
                  
                <DeleteButton 
                
                  v-if="! request.released" 

                  :is-disabled="! state.user.admin && request.users.length > 1" 
                  
                  @delete-button-clicked="() => onDeleteButtonClicked( request, () => fetchPage( currentPage ) )" 
                  
                />

                <a v-if="request.released && request.url" 
                
                  class="px-2 py-1 text-sm text-center bg-green-700 text-white rounded-md hover:scale-105 transition-all" 

                  target="_blank"
                  
                  :href="request.url">
                  
                  Buy Now
                
                </a>

                <!-- <LikeButton :is-liked="users.includes(state.user.id)" @like-button-clicked="()=> onLikeButtonClicked( id )" /> -->

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
      
      :disabled="isLoadingUserRequests"
      
      :current="currentPage" 
      
      :total="totalPages" 
      
      @change-page="( page ) => fetchPage( page )" />

  </main>

</template>