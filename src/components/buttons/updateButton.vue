
<script setup>

  import { PencilIcon } from '@heroicons/vue/24/solid';

  const props = defineProps( {

    isDisabled: Boolean
  
  } );

  const emits = defineEmits( [ 'updateButtonClicked' ] );

  const emitUpdateButtonClicked = () => emits( 'updateButtonClicked' );

</script>

<template>

  <button 
  
    class="group px-[2px] py-[2px] hover:pointer hover:scale-110 focus:scale-110 transition-transform duration-150 border border-green-800 rounded disabled:opacity-50 disabled:scale-100" 
    
    type="button" 
    
    aria-label="update request" 

    :disabled="isDisabled" 
    
    @click="emitUpdateButtonClicked">

    <PencilIcon class="h-8 w-8 fill-green-800" />

  </button>

</template>