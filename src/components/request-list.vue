
<script setup>

  import { HeartIcon } from '@heroicons/vue/24/solid';

  import { formatDate } from "../utils/utils";

  const emit = defineEmits( [ 'likeButtonClicked' ] );

  const props = defineProps( { 
    
    requests: Array 
  
  } );

  const emitLikeButtonClicked = id => emit( 'likeButtonClicked', id );

</script>

<template>

  <ul class="max-w-2xl mx-auto">

    <li class="w-full flex items-center gap-x-3 py-2 shadow-sm odd:bg-purple-100" v-for="({ id, date, name, votes, liked }, index) in requests" :key="id">
      
      <span class="basis-16 text-right text-xs text-neutral-600">{{ formatDate( date ) }}</span>

      <span class="basis-3/4 font-semibold">{{ name }}</span>

      <div class="basis-24 flex items-center">
        

        <button class="mr-1 group hover:pointer" :class="{ 'is-liked': liked }" type="button" @click="() => emitLikeButtonClicked( id )">

          <HeartIcon class="h-6 w-6 stroke-neutral-500 fill-transparent group-[.is-liked]:fill-red-500 group-[.is-liked]:stroke-transparent transition-colors duration-150" />

        </button>

        <span class="text-sm">{{ votes }}</span>

      </div>
      
    </li>

  </ul>

</template>