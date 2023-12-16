
<script setup>

  import { TrashIcon } from '@heroicons/vue/24/solid';

  // const props = defineProps( {

  //   id: Number
  
  // } );

  const emits = defineEmits( [ 'deleteButtonClicked' ] );

  const emitDeleteButtonClicked = () => emits( 'deleteButtonClicked' );

</script>

<template>

  <button class="mr-1 px-[2px] py-[2px] hover:pointer border border-black rounded" type="button" @click="emitDeleteButtonClicked">

    <TrashIcon class="h-4 w-4 fill-black" />

  </button>

</template>