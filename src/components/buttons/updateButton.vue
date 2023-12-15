
<script setup>

  import { PencilIcon } from '@heroicons/vue/24/solid';

  const props = defineProps( {

    id: Number
  
  } );

  const emits = defineEmits( [ 'updateButtonClicked' ] );

  const emitUpdateButtonClicked = () => emits( 'updateButtonClicked', props.id );

</script>

<template>

  <button class="mr-1 px-[2px] py-[2px] hover:pointer border border-black rounded" type="button" @click="() => emitUpdateButtonClicked()">

    <PencilIcon class="h-4 w-4 fill-black" />

  </button>

</template>