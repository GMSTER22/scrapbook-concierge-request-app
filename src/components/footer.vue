
<script setup>

  import { RouterLink } from 'vue-router';

  const SERVER_URL = process.env.SERVER_URL;

  const year = new Date().getFullYear();

</script>

<template>

  <footer class="px-5 py-4 bg-purple-300 text-purple-900">

    <div class="max-w-5xl mx-auto text-center">

      <p class="mb-2 font-bold">
        
        &copy;{{ year }} Scrapbook Concierge Requests
      
      </p>

      <div class="flex justify-between flex-wrap gap-4 items-center">

        <div class="text-sm text-left">
  
          <a class="hover:underline" href="mailto:scrapbookconcierge@gmail.com">Contact Us</a>

          <br>

          <a class="hover:underline" href="https://www.scrapbookconciergelayouts.com/">Scrapbook Concierge</a>

          <br>

          <router-link class="hover:underline" to="/privacy-policy">Privacy Policy</router-link>
          
          <br>
          
          <router-link class="hover:underline" to="/terms">Terms and conditions</router-link>
  
        </div>

        <div class="flex gap-x-2">

          <a class="block w-8 h-8 rounded-md bg-[#3b5998]" href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/ScrapbookConcierge/" target="_blank">

            <img src="../assets/images/facebook.png" alt="facebook icon">

          </a>

          <a class="block w-8 h-8 rounded-md" href="https://www.instagram.com/scrapbookconcierge/?hl=en" target="_blank">

            <img src="../assets/images/instagram.png" alt="instagram icon">

          </a>

          <a class="block w-8 h-8 rounded-md bg-[#bd081c]" href="https://pinterest.com/pin/create/button/?url=https://www.etsy.com/shop/ScrapbookConciergeCO&media=&description=">

            <img src="../assets/images/pinterest.png" alt="pinterest icon">

          </a>

        </div>

      </div>

    </div>

  </footer>

</template>