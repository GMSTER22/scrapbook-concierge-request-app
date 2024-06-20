
<script setup>

  import { ref } from 'vue';

  import Modal from './modal.vue';

  import { Bars3Icon } from '@heroicons/vue/24/solid';

  import { state, isAdmin } from '../store/state';

  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();

  const route = useRoute();

  console.log(route.path, route.fullPath, route.name)

  const isNavOpen = ref( false );

  const onMenuButtonClick = () => isNavOpen.value = ! isNavOpen.value;

  // const onMakeRequestButtonClick = () => {

  //   if ( currentModalComponent.component !== MODAL_COMPONENTS.MAKE_REQUEST ) setCurrentModalComponent( MODAL_COMPONENTS.MAKE_REQUEST );

  //   openModal();

  // }

  const onLogoutButtonClick = async () => {

    const options = {

      method: 'GET',

      // headers: {

      //   'Content-Type': 'application/json',

      //   // 'Host': 'http://127.0.0.1:3000',

      //   // 'Accept': 'application/json',

      //   // 'Cache': 'no-cache'
        
      // },

      credentials: 'include'

    }

    const response = await fetch( `${process.env.SERVER_URL}/logout`, options );

    if ( response.ok ) router.push( { name: 'login' } );

  }

</script>

<template>

  <header class="bg-purple-300">

    <div class="max-w-5xl mx-auto flex justify-between items-center px-5 py-4">

      <div class="font-bold text-xl">

        <router-link to="/">SCR</router-link>

      </div>

      <div v-if="route.name !== 'subscription'">

        <nav 
        
          :class="['absolute top-[60px] left-0 flex flex-col items-center gap-x-8 gap-y-5 w-full h-0 z-10 text-ellipsis overflow-hidden text-purple-900 bg-neutral-200 font-semibold md:relative md:top-auto md:left-auto md:flex-row md:w-auto md:h-auto md:bg-transparent transition-[height_padding] duration-300', { 'h-[212px] py-5': isNavOpen }]" 
          
          aria-labelledby="menu-button">

          <router-link to="/my-requests">My requests</router-link>

          <router-link to="/released-requests">Released Requests</router-link>

          <router-link v-show="isAdmin" to="/admin">Admin</router-link>

          <div v-show="state.user?.username">

            <!-- Hi, {{ state.user?.username ?? 'scrapbooker' }} -->

            <button type="button" @click="onLogoutButtonClick">Logout</button>

          </div>

        </nav>

        <button 
        
          class="md:hidden" 
          
          type="button" 
          
          id="menu-button" 
          
          aria-label="Menu" 
          
          :aria-expanded="isNavOpen" 
          
          @click="onMenuButtonClick">

          <Bars3Icon class="h-6 w-6" />

        </button>

      </div>

    </div>

  </header>

</template>