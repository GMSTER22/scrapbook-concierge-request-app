
<script setup>

  import { PencilIcon } from '@heroicons/vue/24/solid';

  // const props = defineProps( {

  //   id: Number
  
  // } );

  const emits = defineEmits( [ 'updateButtonClicked' ] );

  const emitUpdateButtonClicked = () => emits( 'updateButtonClicked' );

</script>

<template>

  <button class="mr-1 px-[2px] py-[2px] hover:pointer hover:scale-110 focus:scale-110 transition-transform duration-150 border border-black rounded" type="button" aria-label="update request" @click="emitUpdateButtonClicked">

    <PencilIcon class="h-5 w-5 fill-black" />

  </button>

</template>