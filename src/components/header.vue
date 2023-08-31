
<script setup>



</script>

<template>

  <header class="max-w-5xl mx-auto flex justify-between items-center py-4">

    <div class="font-bold text-xl">

      <router-link to="/">SCR</router-link>

    </div>

    <nav class="flex items-center gap-x-8">

      <router-link to="/requests">My requests</router-link>

      <button type="button" class="bg-purple-800 text-white px-4 py-1 rounded">Make request</button>

      <!-- <router-link to="/profile">profile</router-link> -->

    </nav>

  </header>

</template>