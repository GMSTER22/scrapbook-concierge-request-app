
<script setup>

  import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';

  // const props = defineProps( {

  //   id: Number
  
  // } );

  const emits = defineEmits( [ 'notifyButtonClicked' ] );

  const emitNotifyButtonClicked = () => emits( 'notifyButtonClicked' );

</script>

<template>

  <button class="mr-1 px-[2px] py-[2px] hover:pointer hover:scale-110 focus:scale-110 transition-transform duration-150 border border-green-700 rounded" type="button" aria-label="email requesters" @click="emitNotifyButtonClicked">

    <PaperAirplaneIcon class="h-5 w-5 fill-green-700" />

  </button>

</template>