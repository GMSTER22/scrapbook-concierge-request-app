
<script setup>

  const SERVER_URL = process.env.SERVER_URL;

  const year = new Date().getFullYear();

</script>

<template>

  <footer class="px-5 py-4 bg-purple-300 text-purple-900">

    <div class="max-w-5xl mx-auto text-center font-bold">

      <p>
        
        &copy;{{ year }} Scrapbook Concierge Requests.
      
      </p>

      <p>

        <!-- Built with &#128515; by Souleymane Gael Nongnogo -->

        <!-- <router-link to="`http://localhost:1234/subscription?email=gaeln92@yahoo.fr&email_opt_in=false`">subscription</router-link> -->

      </p>

    </div>

  </footer>

</template>