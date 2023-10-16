
<script setup>

  import Modal from './modal.vue';

  import { state, openModal } from '../store/state';

</script>

<template>

  <header class="bg-purple-300">

    <div class="max-w-5xl mx-auto flex justify-between items-center py-4">

      <div class="font-bold text-xl">

        <router-link to="/">SCR</router-link>

      </div>

      <nav class="flex items-center text-purple-900 font-semibold gap-x-8">

        <router-link to="/my-requests">My requests</router-link>

        <router-link to="/admin">Admin</router-link>

        <div>

          <button type="button" class="px-4 py-2 rounded font-semibold bg-purple-900 text-white" @click="openModal">Make request</button>

          <div :aria-hidden="! state.open">

            <Modal />

          </div>

        </div>

      </nav>

    </div>

  </header>

</template>