
<script setup>

  import { PaperAirplaneIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/solid';

  const props = defineProps( {

    released: Boolean,

    disable: Boolean
  
  } );

  const emits = defineEmits( [ 'notifyButtonClicked' ] );

  const emitNotifyButtonClicked = () => emits( 'notifyButtonClicked' );

</script>

<template>

  <button 
  
    class="hover:pointer hover:scale-110 focus:scale-110 transition-transform duration-150 disabled:hover:scale-100 disabled:opacity-70" 
    
    type="button" 
    
    aria-label="Toggle request from requests list" 
    
    @click="emitNotifyButtonClicked" 
    
    :disabled="disable">

    <MinusCircleIcon v-if="released" class="h-8 w-8 fill-red-700" />

    <PlusCircleIcon v-else class="h-8 w-8 fill-green-700" />

  </button>

</template>