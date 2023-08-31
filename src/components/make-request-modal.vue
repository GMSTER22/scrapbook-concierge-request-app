
<script setup>

  import { ref } from 'vue';

  import { XMarkIcon } from '@heroicons/vue/24/solid';

  const open = ref( true );

  const toggleModal = () => open.value = ! open.value;

</script>

<template>

  <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white z-10" v-if="open">

    <form class="relative p-10 border shadow rounded bg-neutral-200" action="">

      <button class="absolute top-2 left-2" type="button" @click="toggleModal">

        <XMarkIcon class="h-6 w-6 text-white" />

      </button>

      <fieldset>

        <legend class="text-xl mb-5">Make a request</legend>

        <div class="w-full">

          <label for="request"></label>

          <textarea name="request" id="request"></textarea>

        </div>

      </fieldset>

      <button class="px-4 py-2 bg-purple-800 text-white rounded" type="button">

        Request Kit

      </button>

    </form>

  </div>

</template>