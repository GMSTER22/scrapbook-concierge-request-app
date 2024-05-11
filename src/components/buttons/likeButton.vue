
<script setup>

  import { HeartIcon } from '@heroicons/vue/24/solid';

  const props = defineProps( {
    
    isLiked: Boolean,

    isDisabled: Boolean
  
  } );

  const emits = defineEmits( [ 'likeButtonClicked' ] );

  const emitLikeButtonClicked = () => emits( 'likeButtonClicked' );

</script>

<template>

  <button class="group hover:pointer focus:scale-110" :class="{ 'is-liked': props.isLiked, 'is-disabled': props.isDisabled }" type="button" aria-label="like request" @click="emitLikeButtonClicked" :disabled="props.isDisabled">

    <HeartIcon class="h-8 w-8 stroke-neutral-500 fill-black hover:scale-110 group-[.is-liked]:fill-red-500 group-[.is-disabled]:opacity-50 group-[.is-disabled]:hover:scale-100 group-[.is-liked]:stroke-transparent transition-all duration-150" />

  </button>

</template>