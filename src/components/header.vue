
<script setup>

  import { ref } from 'vue';

  import { useRoute, useRouter } from 'vue-router';

  import { Bars3Icon } from '@heroicons/vue/24/solid';

  import { state, isAdmin } from '../store/state';
import { logUserOut } from '../store/state';

  const router = useRouter();

  const route = useRoute();

  const isNavOpen = ref( false );

  const onMenuButtonClick = () => isNavOpen.value = ! isNavOpen.value;

  const onLogoutButtonClick = async () => {

    // const options = {

    //   method: 'GET',

    //   headers: {

    //     'Authorization': `Bearer ${getToken}`,
        
    //   }

    // }

    // const response = await fetch( `${process.env.SERVER_URL}/logout`, options );

    // if ( response.ok ) router.push( { name: 'login' } );

    logUserOut();

    router.push( { name: 'login' } );

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