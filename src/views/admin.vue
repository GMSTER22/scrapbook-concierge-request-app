
<script setup>

  import { ref } from 'vue';

  import { state } from '../store/state'; 

  import Header from '../components/header.vue';

  import { formatDate } from '../utils/utils';

  const sortBy = ref( '' );

</script>

<template>

  <Header />

  <main class="py-20">

    <div class="max-w-3xl mx-auto justify-between flex mb-20">

      <form class="w-1/2" action="">

        <label for="search"></label>

        <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request...">

      </form>

      <fieldset class="flex flex-col">

        <label for="sort"><span class="sr-only">Sort By</span></label>

        <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortBy">

          <option value="" disabled>Sort by</option>

          <option value="date">Date</option>

          <option value="released">Released</option>
          
          <option value="most-likes">Most liked</option>

        </select>

      </fieldset>

    </div>

    <ul class="max-w-4xl mx-auto">

      <li class="w-full flex justify-between items-center py-2 shadow-sm odd:bg-purple-100" v-for="({ date, name, votes, liked }, index) in state.requests" :key="index">
        
        <div class="basis-96 flex items-center gap-x-3">

          <span class="basis-16 shrink-0 text-right text-xs text-neutral-600">{{ formatDate( date ) }}</span>

          <span class="basis-auto font-semibold">{{ name }}</span>

        </div>

        <div class="basis-14 text-right">

          <span class="text-sm">{{ votes }}</span>

        </div>

        <div class="basis-auto flex gap-x-2">
          
          <button class="text-xs px-4 py-1 rounded font-bold text-green-900 bg-green-300" type="button">Release</button>
          
          <button class="text-xs px-4 py-1 rounded font-bold text-red-900 bg-red-300" type="button">Delete</button>

        </div>
        
      </li>

    </ul>

  </main>

</template>