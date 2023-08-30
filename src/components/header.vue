
<script setup>



</script>

<template>

  <header class="max-w-5xl mx-auto flex justify-between items-center py-4">

    <div class="font-bold text-xl">

      <router-link to="/">SCR</router-link>

    </div>

    <form class="basis-5/12" action="">

      <label for="search"></label>

      <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request...">

    </form>

    <nav class="flex gap-x-4">

      <router-link to="/requests">Requests</router-link>

      <router-link to="/make-request">Make request</router-link>

      <!-- <router-link to="/profile">profile</router-link> -->

    </nav>

  </header>

</template>