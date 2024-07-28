
<script setup>

  import { state, pushAlert } from '../store/state';

  // setTimeout( () => pushAlert( 'failure', '1. Failed test', 2000 ), 2000 );

  // setTimeout( () => pushAlert( 'failure', '2. Failed test', 4000 ), 5000 );

  // setTimeout( () => pushAlert( 'success', '3. Failed test', 6000 ), 8000 );

</script>

<template>

  <Teleport to="body">

    <div class="fixed right-0 bottom-0 p-2 space-y-2">

      <div v-for="alert in state.alerts" 
      
        :key="alert.id" 
      
        role="alert" 
        
        :class="[ 'p-2 rounded-md', `${ alert.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white' }` ]"
        
      >

        <span>{{ alert.message }}</span>

      </div>

    </div>

  </Teleport>

</template>
