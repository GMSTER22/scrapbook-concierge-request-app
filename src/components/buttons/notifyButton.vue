
<script setup>

  import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';

  // const props = defineProps( {

  //   id: Number
  
  // } );

  const emits = defineEmits( [ 'notifyButtonClicked' ] );

  const emitNotifyButtonClicked = () => emits( 'notifyButtonClicked' );

</script>

<template>

  <button class="mr-1 px-[2px] py-[2px] hover:pointer border border-green-700 rounded" type="button" @click="emitNotifyButtonClicked">

    <PaperAirplaneIcon class="h-4 w-4 fill-green-700" />

  </button>

</template>