
<script setup>

  import { ref, computed } from 'vue';

  import { XMarkIcon } from '@heroicons/vue/24/solid';

  import { state } from '../store/state';
  
  const requestValue = ref( null );

  const numberOfCharactersLeft = computed( () => {

    return requestValue.value ? 
    
      100 - requestValue.value.length

      :

      100

  } );

  const toggleModal = () => state.open = ! state.open;

  const onModalBackgroundClicked = e => {

    if ( event.target.id === 'backdrop' ) toggleModal();

  };

</script>

<template>

  <Teleport to="body">

    <div id="backdrop" class="fixed top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-gradient-to-br from-[#000000b2] to-[#000000b2]" v-if="state.open" @click="onModalBackgroundClicked">

      <form class="relative w-full max-w-sm px-5 py-8 border shadow rounded bg-white" action="">

        <button class="absolute top-2 right-2" type="button" @click="toggleModal">

          <XMarkIcon class="h-6 w-6 text-black" />

        </button>

        <fieldset class="mb-3">

          <legend class="mb-4 text-xl text-center font-bold">Make a request</legend>

          <div class="w-full">

            <label for="request"></label>

            <textarea class="w-full rounded" name="request" id="request" maxlength="100" v-model="requestValue"></textarea>
            

          </div>

          <p class="text-xs text-right">

            {{ numberOfCharactersLeft }} characters left.

          </p>

        </fieldset>

        <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="button">

          Request Kit

        </button>

      </form>

    </div>

  </Teleport>

</template>