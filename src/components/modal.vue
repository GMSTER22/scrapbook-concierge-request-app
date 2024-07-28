
<script setup>

  import { state, closeModal, currentModalComponent, setCurrentModalComponent, MODAL_COMPONENTS } from '../store/state';

  const onModalBackgroundClicked = event => {

    if ( event.target.id === 'backdrop' ) closeModal();

  };

</script>

<template>

  <Teleport to="body">

    <div 
    
      role="dialog"

      id="backdrop"
      
      class="fixed top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-gradient-to-br from-[#000000b2] to-[#000000b2]" 
      
      v-if="state.isModalOpen" @click="onModalBackgroundClicked"
      
    >
    
      <component :is="currentModalComponent.component"></component>

    </div>

  </Teleport>

</template>
