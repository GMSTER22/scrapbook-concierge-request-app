
<script setup>

  import { ref } from 'vue';

  import { useRoute, useRouter } from 'vue-router';

  import { Bars3Icon } from '@heroicons/vue/24/solid';

  import { state, isAdmin } from '../store/state';

  import { logUserOut } from '../store/state';

  const router = useRouter();

  const route = useRoute();

  const navHTMLElement = ref( null );

  const isNavOpen = ref( false );

  const onMenuButtonClick = () => isNavOpen.value = ! isNavOpen.value;

  const onLogoutButtonClick = () => {

    logUserOut();

    router.push( { name: 'home' } );

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

          ref="navHTMLElement"
        
          :class="['absolute top-[70px] left-0 flex flex-col items-center gap-x-6 gap-y-5 w-full h-0 z-50 text-ellipsis overflow-hidden text-purple-900 bg-neutral-200 font-semibold md:relative md:top-auto md:left-auto md:flex-row md:w-auto md:h-auto md:bg-transparent transition-[height_padding] duration-300', { [ isAdmin ? 'h-[240px] py-5' : 'h-[196px] py-5' ]: isNavOpen } ]" 
          
          aria-labelledby="menu-button"
          
        >

          <router-link to="/requests">Requests</router-link>

          <router-link to="/my-requests">My requests</router-link>

          <router-link to="/released-requests">Released Requests</router-link>

          <router-link v-if="isAdmin" to="/admin">Admin</router-link>

          <div>

            <button type="button"
            
              v-if="!! state.user"  
              
              @click="onLogoutButtonClick">
              
              Logout
            
            </button>

            <router-link v-else 
              
              to="/login">
              
              Login
            
            </router-link>

          </div>

        </nav>

        <button 
        
          class="md:hidden" 
          
          type="button" 
          
          id="menu-button" 
          
          aria-label="Menu" 
          
          :aria-expanded="isNavOpen" 
          
          @click="onMenuButtonClick">

          <Bars3Icon class="h-8 w-8" />

        </button>

      </div>

    </div>

  </header>

</template>