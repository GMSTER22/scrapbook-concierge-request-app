
<script setup>

  import { state } from './store/state';

  import Modal from './components/modal.vue';

  import Alerts from './components/alerts.vue';

</script>

<template>

  <div :aria-hidden="! state.open">
    
    <Modal />
    
  </div>

  <Alerts />

  <router-view></router-view>
  
</template>