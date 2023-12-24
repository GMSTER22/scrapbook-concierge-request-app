
<script setup>

  import { ref } from 'vue';

  import Modal from './modal.vue';

  import { Bars3Icon } from '@heroicons/vue/24/solid';

  import { state, openModal, currentModalComponent, MODAL_COMPONENTS, setCurrentModalComponent, isAdmin } from '../store/state';

  const isNavOpen = ref( false );

  const onMenuButtonClick = () => isNavOpen.value = ! isNavOpen.value;

  const onMakeRequestButtonClick = () => {

    if ( currentModalComponent.component !== MODAL_COMPONENTS.MAKE_REQUEST ) setCurrentModalComponent( MODAL_COMPONENTS.MAKE_REQUEST );

    openModal();

  }

</script>

<template>

  <header class="bg-purple-300">

    <div class="max-w-5xl mx-auto flex justify-between items-center px-5 py-4">

      <div class="font-bold text-xl">

        <router-link to="/">SCR</router-link>

      </div>

      <nav :class="['absolute top-[60px] left-0 flex flex-col items-center gap-x-8 gap-y-5 w-full h-0 text-ellipsis overflow-hidden bg-neutral-200 text-purple-900 font-semibold sm:relative sm:top-auto sm:left-auto sm:flex-row sm:w-auto sm:h-auto sm:bg-transparent transition-[height_padding] duration-300', { 'h-[168px] py-5': isNavOpen }]" aria-labelledby="menu-button">

        <router-link to="/my-requests">My requests</router-link>

        <router-link v-show="isAdmin" to="/admin">Admin</router-link>

        <div v-show="state.user.admin">

          <button type="button" class="px-4 py-2 rounded font-semibold bg-purple-900 text-white" @click="onMakeRequestButtonClick">Make request</button>

          <div :aria-hidden="! state.open">

            <Modal />

          </div>

        </div>

        <div>

          Hi, {{ state.user?.username ?? 'scrapbooker' }}

        </div>

      </nav>

      <button class="sm:hidden" type="button" id="menu-button" aria-label="Menu" :aria-expanded="isNavOpen" @click="onMenuButtonClick">

        <Bars3Icon class="h-6 w-6" />

      </button>

    </div>

  </header>

</template>