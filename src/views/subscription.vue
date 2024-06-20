
<script setup>

  import { ref } from 'vue';

  import { useRoute } from 'vue-router';

  // import { state } from 'vue';

  import Header from '../components/header.vue';

  const route = useRoute();

  const emailOptInValue = ref( route.query.email_opt_in ); 
  
  async function onFormSubmit( event ) {
    
    event.preventDefault();

    const options = {
  
      method: "PATCH",

      body: JSON.stringify( {

        email: route.query.email,

        emailOptIn: emailOptInValue.value

      } ),

      headers: {

        'Content-Type': 'application/json',

      }
  
    }

    console.log( route.query.email, emailOptInValue.value, "here" ); 

    // ?email=${ route.query.email }&email_optin=${ emailOptInValue }
    // console.log( emailOptInValue.value );

    const response = await fetch( `${process.env.SERVER_URL}/notifications/subscriptions`, options );

    if ( response.ok ) {

      const data = response.json();

      console.log( data.emailOptIn );

      if ( data.emailOptIn ) alert( data.emailOptIn );

      else alert( data.emailOptIn );

    }

  }

</script>

<template>

  <Header />

  <main class="min-h-[calc(100vh-60px)] px-5 py-14 sm:py-20 lg:px-0">

    <div class="max-w-3xl mx-auto mb-14">

      <form @submit="onFormSubmit">

        <h2 class="mb-5 text-xl font-bold sm:text-2xl">I want to receive:</h2>

        <fieldset class="p-4 mb-5 flex border border-purple-800 sm:mb-8">
          
          <input class="w-5 h-5 mr-3 text-purple-800 ring-purple-800 active:ring-purple-800 focus:ring-purple-800" type="checkbox" id="emailOptIn" v-model="emailOptInValue">

          <label for="emailOptIn">
            
            <span class="block mb-1 text-lg font-semibold">
              
              Email me when requests I'm interested in are released.
            
            </span>

            <span>
              
              If this box is checked, please note that you'll continue to receive emails containing the list of the scrapbook kits that you either requested or liked whenever they are released. 
            
            </span>
          
          </label>

        </fieldset>

        <button 
        
          class="px-5 py-2 bg-purple-800 text-white font-bold rounded" 
          
          type="submit">
          
          Save
        
        </button>

      </form>

    </div>

  </main>

</template>
