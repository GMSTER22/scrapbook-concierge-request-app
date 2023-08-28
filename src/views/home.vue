
<script setup>

  import Header from '../components/header.vue';

</script>

<template>

  <Header />

  <main class="py-14">

    <fieldset class="flex flex-col items-end">

      <label for="sort">Sort</label>

      <select name="sort" id="sort">

        <option value="date">date</option>

        <option value="most-likes">most liked</option>

        <!-- <option value="alphabetical">alphabetical order</option> -->

      </select>

    </fieldset>

  </main>

</template>
