
<script setup>

  import { PaperAirplaneIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/solid';

  const props = defineProps( {

    release: Boolean,

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
    
    :release="release" 
    
    :disabled="disable">

    <MinusCircleIcon v-if="release" class="h-7 w-7 fill-red-700" />

    <PlusCircleIcon v-else class="h-7 w-7 fill-green-700" />

    <!-- <PlusCircleIcon aria-label="Add Request to the Request List" class="h-7 w-7 fill-green-700" /> -->

  </button>

</template>