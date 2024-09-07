
<script setup>

  import { ref, computed, onMounted, watch, onBeforeUnmount, onBeforeMount } from 'vue';

  import { useRouter } from 'vue-router';

  import Header from '../components/header.vue';

  import Footer from '../components/footer.vue';

  import { formatDate, getToken } from "../utils/utils";

  import { state, onMakeRequestButtonClick, onLikeButtonClicked, logUserOut, pushAlert } from '../store/state';
  
  const router = useRouter();

</script>

<template>

  <Header />

  <!-- <main class="min-h-[calc(100vh-70px-96px)] px-5 pt-14 pb-4 sm:min-h-[calc(100vh-60px-96px)] sm:pt-28 lg:px-0"> -->
  <main>

    <div class="mx-auto bg-[linear-gradient(90deg,rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('/src/assets/images/hero.jpg')] bg-center bg-cover">

      <div class="max-w-5xl mx-auto px-10 py-16 text-white text-center sm:px-24 sm:py-24 lg:py-44">

        <h1 class="mb-10 text-4xl sm:text-5xl lg:text-6xl font-bold">
          
          Influence the Next Collection of Scrapbook Kits
        
        </h1>

        <p class="text-xl sm:text-2xl">

          Your ideas, your votes—let your voice be heard! Submit your requests and vote for the kits you'd love to see next.

        </p>

      </div>

    </div>

    <div class="max-w-5xl mx-auto my-14 px-4 space-y-10 sm:space-y-24 md:mb-28">

      <div class="flex flex-col-reverse items-center md:flex-row">

        <div class="basis-3/5">

          <img src="../assets/images/all-requests.png" alt="">

        </div>

        <div class="basis-2/5 text-center py-8 text-purple-900 md:px-6 md:py-10 lg:px-12">

          <h2 class="mb-6 text-3xl font-bold lg:text-4xl">
            
            Vote for Your Favorite Kits
          
          </h2>

          <p>

            Make your mark on our next collection by voting for the kits you love. Simply click the black heart button next to the kit title—watch it turn red as your vote is counted. Your vote helps us decide which kits to create next!

          </p>

        </div>

      </div>

      <div class="flex flex-col-reverse items-center md:flex-row-reverse">

        <div class="basis-3/5">

          <img src="../assets/images/my-requests.png" alt="">

        </div>

        <div class="basis-2/5 text-center py-8 text-purple-900 md:px-6 md:py-10 lg:px-12">

          <h2 class="mb-6 text-3xl font-bold lg:text-4xl">
            
            Submit and Manage Your Requests
          
          </h2>

          <p>

            Have a brilliant idea for a scrapbook kit? Head over to the "My Requests" page. Before submitting your request, use the search bar to verify that your idea haven't been already requested, then submit your request. After submitting, you can always update or delete your request as long as it hasn't gained any likes yet. Your creativity drives our next projects!

          </p>

        </div>

      </div>

      <div class="flex flex-col-reverse items-center md:flex-row">

        <div class="basis-3/5">

          <img src="../assets/images/released-requests.png" alt="">

        </div>

        <div class="basis-2/5 text-center py-8 text-purple-900 md:px-6 md:py-10 lg:px-12">

          <h2 class="mb-6 text-3xl font-bold lg:text-4xl">
            
            Explore Recently Released Kits
          
          </h2>

          <p>

            Discover the latest scrapbook kits brought to life by your requests! On the "Released Requests" page, you can browse all the kits that have recently been released. See something you love? Click the "Buy Now" button to be taken directly to the product page, where you can place your order and start creating. Your ideas, our creations—now available to you!

          </p>

        </div>

      </div>

    </div>

  </main>

  <Footer />

</template>
