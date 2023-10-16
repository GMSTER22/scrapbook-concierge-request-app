
<script setup>

  // import { ref, computed } from 'vue';

  // import { XMarkIcon } from '@heroicons/vue/24/solid';

  import MakeRequest from './make-request.vue';

  import UpdateRequest from './udpate-request.vue';

  import DeleteRequest from './delete-request.vue';

  import { state, openModal, closeModal } from '../store/state';

  const onModalBackgroundClicked = e => {

    if ( event.target.id === 'backdrop' ) closeModal();

  };

</script>

<template>

  <Teleport to="body">

    <div 

      id="backdrop" 
      
      class="fixed top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-gradient-to-br from-[#000000b2] to-[#000000b2]" 
      
      v-if="state.isModalOpen" @click="onModalBackgroundClicked"
      
    >
    
      <component :is="MakeRequest"></component>

    </div>

  </Teleport>

</template>
