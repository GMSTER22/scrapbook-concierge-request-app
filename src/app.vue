
<script setup>

  import { state } from './store/state';

  import Modal from './components/modal.vue';

</script>

<template>

  <div :aria-hidden="! state.open">
    
    <Modal />
    
  </div>

  <router-view></router-view>
  
</template>