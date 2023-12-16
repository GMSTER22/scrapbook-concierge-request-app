
<script setup>

  import { ref, computed } from 'vue';

  import Header from '../components/header.vue';

  import Modal from '../components/modal.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import { HeartIcon } from '@heroicons/vue/24/solid';

  import { formatDate } from "../utils/utils";

  import { state, onLikeButtonClicked } from '../store/state';

  const sortBy = ref( '' );

  const sortByChanged = computed(() => console.log(sortBy.value, 'sort by value') );

  // function onButtonClicked( id ) {

  //   onLikeButtonClicked( id );
    
  //   return;

  //   const options = {

  //     method: 'post',

  //     body: JSON.stringify({

  //       user_id: '6355314dfs4564',

  //       request_id: '896784dfsfa5545'

  //     }),

  //     headers: {

  //       'Content-Type': 'application/json',

  //       // 'Host': 'http://127.0.0.1:3000'

  //     },

  //     credentials: 'include'

  //   }

  //   fetch( 'http://localhost:3000/request', options )

  //     .then( res => res.json() )

  //     .then( data => console.log( data ) )

  //     .catch( error => alert( error.message ) )

  // }

</script>

<template>

  <Header />

  <main class="max-w-5xl mx-auto py-14 px-5 lg:px-0">

    <div class="max-w-2xl mx-auto justify-between flex mb-20">

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

      <li class="grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent sm:odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ id, date, name, votes, liked }, index) in state.requests" :key="id">
        
        <span class="text-left sm:text-right text-xs text-neutral-600">
          
          {{ formatDate( date ) }}
        
        </span>

        <span class="px-5 mb-3 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:mb-0 sm:text-base sm:text-left">

          {{ name }}

        </span>

        <div class="flex gap-x-1 items-center justify-self-end">

          <span>

            {{ votes }}

          </span>

          <LikeButton :id="id" :is-liked="liked" @like-button-clicked="() => onLikeButtonClicked( id )" />

        </div>

      </li>

    </ul>

  </main>

</template>
