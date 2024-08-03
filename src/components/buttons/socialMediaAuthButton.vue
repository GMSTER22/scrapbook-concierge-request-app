
<script setup>

  const props = defineProps( {

    callToAction: String,

    ariaLabel: String

  } );

</script>

<template>

  <button 
    
    type="submit" 
    
    class="flex justify-center items-center gap-x-2 w-full border border-neutral-300 px-4 py-2 rounded" 

    :aria-label="props.ariaLabel" 
    
    :title="props.ariaLabel"
    
  >

    <slot />
  
    {{ callToAction }}
  
  </button>

</template>