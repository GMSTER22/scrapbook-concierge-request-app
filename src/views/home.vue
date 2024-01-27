
<script setup>

  import { ref, computed, onBeforeMount } from 'vue';

  import Header from '../components/header.vue';

  import Modal from '../components/modal.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import { formatDate, fetchRequests } from "../utils/utils";

  import { state, onLikeButtonClicked } from '../store/state';

  const sortBy = ref( '' );

  const sortByChanged = computed(() => console.log(sortBy.value, 'sort by value') );

  const requests = computed( () => state.requests.filter( request => request.users[ 0 ] !== state.user.id ) );

  console.log(requests.value)

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

    <div class="max-w-5xl mx-auto">

      <div class="max-w-3xl mx-auto justify-between flex mb-20">

        <form class="w-1/2" action="">

          <label for="search"></label>

          <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request...">

        </form>

        <fieldset class="flex flex-col">
    
          <label for="sort">
            
            <span class="sr-only">Sort By</span>
          
          </label>
    
          <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortBy">
    
            <option value="" disabled>Sort by</option>
    
            <option value="date">Date</option>
    
            <option value="released">Released</option>
            
            <option value="most-likes">Most liked</option>
    
          </select>
    
        </fieldset>

      </div>

      <ul class="max-w-3xl mx-auto">

        <li class="grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent sm:odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ _id: id, createdAt, title, users }) in requests" :key="id">
          
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

            <LikeButton :id="id" :is-liked="users.includes(state.user.id)"  :likes="users.length - 1" :is-disabled="users[0] === state.user.id" @like-button-clicked="() => onLikeButtonClicked( id )" />

          </div>

        </li>

      </ul>

    </div>

  </main>

</template>
