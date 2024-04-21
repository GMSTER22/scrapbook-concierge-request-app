
<script setup>

  const props = defineProps( {

    callToAction: String

  } );

</script>

<template>

  <button 
    
    type="submit" 
    
    class="w-full border border-neutral-300 px-4 py-2 rounded"
    
  >
  
    {{ callToAction }}
  
  </button>

</template>