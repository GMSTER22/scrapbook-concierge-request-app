
<script setup>

  import { ref } from 'vue';

  import { state, onUpdateButtonClicked, onDeleteButtonClicked, onSendButtonClicked } from '../store/state'; 

  import Header from '../components/header.vue';

  import { formatDate } from '../utils/utils';

  import { HeartIcon, PencilIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/vue/24/solid';

  const sortBy = ref( '' );

</script>

<template>

  <Header />

  <main class="py-14 px-5 lg:px-0">

    <div class="flex justify-between max-w-3xl mx-auto mb-20">

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

      <li class="grid grid-rows-3 grid-cols-1 justify-between items-center gap-y-2 mb-10 p-2 rounded odd:bg-purple-100 sm:grid-rows-1 sm:grid-cols-[64px_1fr_auto_auto] sm:gap-x-5 shadow-[0_0_3px_rgb(0,0,0)] sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ id, date, name, votes, liked }, index) in state.requests" :key="index">
        
        <!-- <div class="flex items-center gap-x-3"> -->

          <span class="text-left text-xs text-neutral-600 sm:text-right">
            
            {{ formatDate( date ) }}
          
          </span>

          <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">
            
            {{ name }}
          
          </span>

        <!-- </div> -->

        <div class="text-right">

          <span class="text-sm">{{ votes }}</span>

        </div>

        <div class="flex gap-x-2 justify-self-end">
          
          <!-- <button class="text-xs px-4 py-1 rounded font-bold text-green-900 bg-green-300" type="button">Release</button>
          
          <button class="text-xs px-4 py-1 rounded font-bold text-red-900 bg-red-300" type="button">Delete</button> -->

          <button class="mr-1 px-[2px] py-[2px] hover:pointer border border-black rounded" type="button" @click="() => onUpdateButtonClicked( id )">

            <PencilIcon class="h-4 w-4 fill-black" />

          </button>

          <button class="mr-1 px-[2px] py-[2px] hover:pointer border border-black rounded" type="button" @click="() => onDeleteButtonClicked( id )">

            <TrashIcon class="h-4 w-4 fill-black" />

          </button>

          <!-- <button class="mr-1 group hover:pointer" :class="{ 'is-liked': liked }" type="button" @click="() => emitLikeButtonClicked( id )">

            <HeartIcon class="h-6 w-6 stroke-neutral-500 fill-black group-[.is-liked]:fill-red-500 group-[.is-liked]:stroke-transparent transition-colors duration-150" />

          </button> -->

          <button class="mr-1 px-[2px] py-[2px] hover:pointer border border-green-700 rounded" type="button" @click="() => onSendButtonClicked( id )">

            <PaperAirplaneIcon class="h-4 w-4 fill-green-700" />

          </button>

        </div>
        
      </li>

    </ul>

  </main>

</template>