
<script setup>

  import { TrashIcon } from '@heroicons/vue/24/solid';

  const emits = defineEmits( [ 'deleteButtonClicked' ] );

  const emitDeleteButtonClicked = () => emits( 'deleteButtonClicked' );

</script>

<template>

  <button 
  
    class="px-[2px] py-[2px] hover:pointer hover:scale-110 focus:scale-110 transition-transform duration-150 border border-black rounded" 
    
    aria-label="delete request" 
    
    type="button" 
    
    @click="emitDeleteButtonClicked">

    <TrashIcon class="h-5 w-5 fill-black" />

  </button>

</template>