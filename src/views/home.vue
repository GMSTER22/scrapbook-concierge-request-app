
<script setup>

  import { reactive, ref, computed } from 'vue';

  import Header from '../components/header.vue';

  import MakeRequestModal from '../components/make-request-modal.vue';

  import { HeartIcon } from '@heroicons/vue/24/solid';

  import { formatDate } from "../utils/utils";

  import requestsData from '../data/requests.json';

  const requests = reactive( requestsData );

  const sortBy = ref( '' );

  const sortByChanged = computed(() => console.log(sortBy.value, 'sort by value') );

  console.log(requests)

  const onLikedClicked = index => {
    
    if ( requests[ index ].liked ) requests[ index ].votes -= 1;
    
    else requests[ index ].votes += 1;
    
    requests[ index ].liked = ! requests[ index ].liked;

  }

</script>

<template>

  <Header />

  <main class="max-w-5xl mx-auto py-20">

    <MakeRequestModal />

    <div class="max-w-2xl mx-auto justify-between flex mb-10">

      <form class="" action="">

        <label for="search"></label>

        <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request...">

      </form>

      <!-- <fieldset class="max-w-2xl mx-auto flex flex-col items-end mb-10"> -->
      <fieldset class="">
  
        <label for="sort"></label>
  
        <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortBy">
  
          <option value="" disabled>Sort by</option>
  
          <option value="date">Date</option>
  
          <option value="most-likes">Most liked</option>
  
        </select>
  
      </fieldset>

    </div>

    <ul class="max-w-2xl mx-auto">

      <li class="w-full flex items-center gap-x-3 py-2 shadow-sm" v-for="({ date, name, votes, liked }, index) in requests" :key="index">
        
        <span class="basis-20 text-right text-sm text-neutral-500">{{ formatDate( date ) }}</span>

        <span class="basis-3/4 font-semibold">{{ name }}</span>

        <div class="basis-auto flex items-center">

          <button class="mr-1 group hover:pointer" :class="{ 'is-liked': liked }" type="button" @click="()=> onLikedClicked( index )">
  
            <HeartIcon class="h-6 w-6 stroke-neutral-500 fill-transparent group-[.is-liked]:fill-red-500 group-[.is-liked]:stroke-transparent transition-colors duration-150" />
  
          </button>
  
          <span class="text-sm">{{ votes }}</span>

        </div>
        
      </li>

    </ul>

    <div>{{sortByChanged}}</div>

  </main>

</template>
