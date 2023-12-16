
<script setup>

  import { HeartIcon } from '@heroicons/vue/24/solid';

  const props = defineProps( {
    
    isLiked: Boolean
  
  } );

  const emits = defineEmits( [ 'likeButtonClicked' ] );

  const emitLikeButtonClicked = () => emits( 'likeButtonClicked' );

</script>

<template>

  <button class="mr-1 group hover:pointer" :class="{ 'is-liked': props.isLiked }" type="button" @click="emitLikeButtonClicked">

    <HeartIcon class="h-6 w-6 stroke-neutral-500 fill-black group-[.is-liked]:fill-red-500 group-[.is-liked]:stroke-transparent transition-colors duration-150" />

  </button>

</template>