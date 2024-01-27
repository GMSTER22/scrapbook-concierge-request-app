
<script setup>

  import { TrashIcon } from '@heroicons/vue/24/solid';

  // const props = defineProps( {

  //   id: Number
  
  // } );

  const emits = defineEmits( [ 'deleteButtonClicked' ] );

  const emitDeleteButtonClicked = () => emits( 'deleteButtonClicked' );

</script>

<template>

  <button class="mr-1 px-[2px] py-[2px] hover:pointer hover:scale-110 focus:scale-110 transition-transform duration-150 border border-black rounded" aria-label="delete request" type="button" @click="emitDeleteButtonClicked">

    <TrashIcon class="h-5 w-5 fill-black" />

  </button>

</template>