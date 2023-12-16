
<script setup>

  import { ref, computed } from 'vue';

  import { XMarkIcon } from '@heroicons/vue/24/solid';

  import { state, currentModalComponent, closeModal } from '../store/state';

  const request = state.requests.find( request => request.id === currentModalComponent.id );

  const requestValue = ref( request.name );

</script>

<template>

  <form class="relative w-full max-w-sm px-5 py-8 border shadow rounded bg-white" action="">

    <button class="absolute top-2 right-2" type="button" @click="closeModal">

      <XMarkIcon class="h-6 w-6 text-black" />

    </button>

    <fieldset class="mb-3">

      <legend class="mb-4 text-xl text-center font-bold">Notify Requesters</legend>

      <div class="w-full">

        <label for="request"></label>

        <textarea class="w-full rounded" name="request" id="request" maxlength="100" v-model="requestValue"></textarea>
        

      </div>

      <!-- <p class="text-xs text-right">

        {{ numberOfCharactersLeft }} characters left.

      </p> -->

    </fieldset>

    <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="button">

      Confirm

    </button>

  </form>

</template>