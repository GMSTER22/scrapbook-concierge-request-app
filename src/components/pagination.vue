
<script setup>

  // import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid';

  import { computed, ref } from 'vue';

  const props = defineProps( {

    current: Number,

    total: Number,

    disabled: Boolean

  } );

  // const current = ref( props.current );

  const firstButton = ref( 1 );

  const secondButton = computed( () => {

    return props.current <= 5 ? 
    
      2 
      
      : 
      
      '&CenterDot;&CenterDot;&CenterDot;';

  } );

  const thirdButton = computed( () => {

    return props.current > 4 && props.total > 6 ? 
      
      props.total - props.current > 3 ? props.current - 1 : props.total - 4
      
      : 
      
      3;

  } );

  const fourthButton = computed( () => {

    return props.current > 4 && props.total > 6 ? 
      
      props.total - props.current > 3 ? props.current : props.total - 3 
      
      : 
      
      4;

  } );

  const fifthButton = computed( () => {

    return props.current > 4 && props.total > 6 ? 
    
      props.total - props.current > 3 ? props.current + 1 : props.total - 2 
      
      : 
      
      5;

  } );

  const sixthButton = computed( () => {

    return props.total - props.current < 3 ? 
    
      props.total > 6 ? props.total - 1 : 6 
      
      : 
      
      '&CenterDot;&CenterDot;&CenterDot;';

  } );

  const seventhButton = ref( props.total );

  // function onPageButtonClick( event ) {



  // }

</script>

<template>

  <div class="flex gap-x-1 w-min mx-auto text-sm sm:text-base sm:gap-x-2">
    
    <button 
    
      :aria-selected="props.current === firstButton" 

      :hidden="props.total < props.current" 
      
      :disabled="props.disabled || props.current === firstButton"
      
      class="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 aria-selected:border" 
      
      type="button" 
      
      @click="$emit( 'changePage', firstButton )"
      
    >
      
      {{ firstButton }}
    
    </button>
    
    <button 
    
      :aria-selected="props.current === secondButton" 
      
      :disabled="typeof secondButton == 'string' || props.disabled || props.current === secondButton" 
      
      :aria-hidden="props.total < 2"
      
      class="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 aria-selected:border aria-selected:bg-gray-100 aria-hidden:hidden" 
      
      type="button"  
      
      @click="$emit( 'changePage', secondButton )"
      
    >
      
      {{ typeof secondButton === 'number' ? secondButton : '&CenterDot;&CenterDot;&CenterDot;' }}
    
    </button>
    
    <button 
    
      :aria-selected="props.current === thirdButton" 
      
      :aria-hidden="props.total < 3" 
      
      :disabled="props.disabled || props.current === thirdButton"
      
      class="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 aria-selected:border aria-selected:bg-gray-100 aria-hidden:hidden" 
      
      type="button" 
      
      @click="$emit( 'changePage', thirdButton )"
      
    >
      
      {{ thirdButton }}
    
    </button>

    <button 
    
      :aria-selected="props.current === fourthButton" 
      
      :aria-hidden="props.total < 4" 
      
      :disabled="props.disabled || props.current === fourthButton"
      
      class="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 aria-selected:border aria-selected:bg-gray-100 aria-hidden:hidden" 
      
      type="button" 
      
      @click="$emit( 'changePage', fourthButton )"
      
    >
      
      {{ fourthButton }}
    
    </button>

    <button 
    
      :aria-selected="props.current === fifthButton" 

      :aria-hidden="props.total < 5" 
      
      :disabled="props.disabled || props.current === fifthButton"
      
      class="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 aria-selected:border aria-selected:bg-gray-100 aria-hidden:hidden" 
      
      type="button" 
      
      @click="$emit( 'changePage', fifthButton )"
      
    >
      
      {{ fifthButton }}
    
    </button>

    <button 
    
      :aria-selected="props.current === sixthButton" 
      
      :disabled="typeof sixthButton == 'string' || props.disabled || props.current === sixthButton" 
      
      :aria-hidden="props.total < 6"
      
      class="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 aria-selected:border aria-hidden:hidden" 
      
      type="button" 
      
      @click="$emit( 'changePage', sixthButton )">
      
      {{  typeof sixthButton === 'number' ? sixthButton : '&CenterDot;&CenterDot;&CenterDot;' }}
    
    </button>

    <button 
    
      :aria-selected="props.current === seventhButton" 
      
      :aria-hidden="props.total <= 6" 
      
      :disabled="props.disabled || props.current === seventhButton"
      
      class="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 aria-selected:border aria-hidden:hidden" 
      
      type="button"  
      
      @click="$emit( 'changePage', seventhButton )"
      
    >
      
      {{ seventhButton }}
    
    </button>

  </div>

</template>