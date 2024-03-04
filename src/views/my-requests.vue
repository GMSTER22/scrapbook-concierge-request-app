
<script setup>

  import { ref, computed, onBeforeMount } from 'vue'; 

  import Header from '../components/header.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import UpdateButton from '../components/buttons/updateButton.vue';
  
  import DeleteButton from '../components/buttons/deleteButton.vue';

  import { formatDate, fetchRequests } from '../utils/utils';

  import { state, onLikeButtonClicked, onUpdateButtonClicked, onDeleteButtonClicked } from '../store/state';

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( '' );
  
  const userRequestList = computed( () => state.requests.filter( ( { users } ) => users[0] === state.user.id ) );

  const filteredRequests = computed( () => {

    return userRequestList.value.sort( ( a, b ) => {

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
    
    .filter( request => request.title.toLocaleLowerCase().includes( searchRequestValue.value.toLocaleLowerCase() ) ? request : '' );

  } );

  console.log( filteredRequests.value );

  onBeforeMount( async () => {

    if ( state.requests ) return;

    const fetchedRequests = await fetchRequests();
      
    state.requests = fetchedRequests;

  } );

</script>

<template>

  <Header />

  <main class="py-14 px-5 lg:px-0 min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-72px)]">

    <h1 class="text-3xl sm:text-4xl font-bold text-center mb-20">
      
      My Requests
    
    </h1>

    <div class="max-w-3xl mx-auto">

      <p v-if="! userRequestList.length">No requests have been made</p>

      <div v-else>

        <div class="flex justify-between mb-20">

          <form class="w-1/2" action="">

            <label for="search"></label>

            <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue">

          </form>

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

        </div>

        <ul v-if="filteredRequests.length">

          <li class="grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ _id: id, createdAt, title, users }) in filteredRequests" :key="id">
            
            <span class="text-left sm:text-right text-xs text-neutral-600">
              
              {{ formatDate( createdAt ) }}
            
            </span>

            <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">

              {{ title }}

            </span>

            <div class="flex gap-x-1 items-center justify-self-end">

              <span class="px-3">

                {{ users.length - 1 }}

              </span>

              <UpdateButton @update-button-clicked="()=> onUpdateButtonClicked( id )" />
                
              <DeleteButton @delete-button-clicked="()=> onDeleteButtonClicked( id )" />

              <!-- <LikeButton :is-liked="users.includes(state.user.id)" @like-button-clicked="()=> onLikeButtonClicked( id )" /> -->

            </div>

          </li>

        </ul>

        <p v-else class="text-2xl text-center">No result found...</p>

      </div>

    </div>

  </main>

</template>