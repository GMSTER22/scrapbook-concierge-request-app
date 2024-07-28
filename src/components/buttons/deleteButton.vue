
<script setup>

  import { TrashIcon } from '@heroicons/vue/24/solid';

  const props = defineProps( {

    isDisabled: Boolean

  } );

  const emits = defineEmits( [ 'deleteButtonClicked' ] );

  const emitDeleteButtonClicked = () => emits( 'deleteButtonClicked' );

</script>

<template>

  <button 
  
    class="px-[2px] py-[2px] hover:pointer hover:scale-110 focus:scale-110 transition-transform duration-150 border border-red-800 rounded disabled:opacity-50 disabled:scale-100" 
    
    aria-label="delete request" 
    
    :disabled="props.isDisabled"
    
    type="button" 
    
    @click="emitDeleteButtonClicked">

    <TrashIcon class="h-8 w-8 fill-red-800" />

  </button>

</template>