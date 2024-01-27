
<script setup>

  import { ref, computed } from 'vue';

  import { useRouter } from 'vue-router';

  import { state, currentModalComponent, closeModal, onNotifyButtonClicked } from '../store/state';
  
  import { XMarkIcon } from '@heroicons/vue/24/solid';

  const router = useRouter();

  const request = state.requests.find( request => request._id === currentModalComponent.id );

  const requestValue = ref( request.title );

  // const onNotifyButtonClicked = async () => {

  //   return 2;

  // }

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

        <textarea class="w-full rounded" name="request" id="request" maxlength="100" v-model="requestValue" disabled></textarea>        

      </div>

    </fieldset>

    <button class="block px-4 py-2 mx-auto bg-purple-800 text-white rounded" type="button" @click="">

      Notify

    </button>

  </form>

</template>