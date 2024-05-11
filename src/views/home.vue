
<script setup>

  import { ref, computed, onBeforeMount, onMounted } from 'vue';

  import Header from '../components/header.vue';

  import Modal from '../components/modal.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import { formatDate, fetchRequests } from "../utils/utils";

  import { state, onLikeButtonClicked } from '../store/state';

  // onMounted( () => state.value.user );

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( '' );

  const filteredRequests = computed( () => {

    return state.requests.sort( ( a, b ) => {

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

  console.log( filteredRequests.value );

  // onBeforeMount( async () => {

  //   if ( state.requests ) return;

  //   const fetchedRequests = await fetchRequests();
      
  //   state.requests = fetchedRequests;

  // } );

</script>

<template>

  <Header />

  <main class="py-14 px-5 lg:px-0 min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-72px)]">

    <h1 class="text-3xl sm:text-4xl font-bold text-center mb-20">
      
      Requests
    
    </h1>

    <div class="max-w-3xl mx-auto">

      <p class="text-center" v-if="! state.requests.length">No requests have been made</p>

      <div v-else>

        <div class="justify-between flex mb-20">

          <form class="w-1/2" action="">

            <label for="search"></label>

            <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue">

          </form>

          <fieldset class="flex flex-col">

            <label for="sort">
              
              <span class="sr-only">Sort By</span>
            
            </label>

            <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue">

              <option value="" disabled>Sort by</option>

              <!-- <option value="release">Released</option> -->
              
              <option value="date-asc">Date Asc</option>

              <option value="date-desc">Date Desc</option>
              
              <option value="likes-asc">Likes Asc</option>

              <option value="likes-desc">Likes Desc</option>

            </select>

          </fieldset>

        </div>

        <ul v-if="filteredRequests.length">

          <li class="grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ _id: id, createdAt, title, users }) in filteredRequests" :key="id">
            
            <span class="text-left sm:text-right text-xs text-neutral-600">
              
              {{ formatDate( createdAt ) }}
            
            </span>

            <span class="px-5 mb-3 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:mb-0 sm:text-base sm:text-left">

              {{ title }}

            </span>

            <div class="flex gap-x-1 items-center justify-self-end">

              <span>

                {{ users.length - 1 }}

              </span>

              <LikeButton 
                
                :id="id" 
                
                :is-liked="users.includes( state.user?.id )" 
                
                :likes="users.length - 1" 
                
                :is-disabled="users[0] === state.user?.id" 
                
                @like-button-clicked="() => onLikeButtonClicked( id )" 
                
              />

            </div>

          </li>

        </ul>

        <p v-else class="text-2xl text-center">No result found...</p>

      </div>

    </div>

  </main>

</template>
