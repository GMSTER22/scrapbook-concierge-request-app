
<script setup>



</script>

<template>

  <header class="flex justify-between items-center py-4">

    <div class="font-bold text-xl">

      <router-link to="/">SCR</router-link>

    </div>

    <form action="">

      <label for="search"></label>

      <input class="border-0 border-b-2 focus:border-b-purple-800 focus:ring-0" type="search" name="search" id="search" placeholder="search request...">

    </form>

    <nav class="flex gap-x-4">

      <router-link to="/requests">requests</router-link>

      <router-link to="/make-request">make request</router-link>

      <!-- <router-link to="/profile">profile</router-link> -->

    </nav>

  </header>

</template>