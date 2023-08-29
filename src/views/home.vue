
<script setup>

  import Header from '../components/header.vue';

  import { HeartIcon } from '@heroicons/vue/24/solid';

  import { formatDate } from "../utils/utils";

  import requests from '../data/requests.json';

</script>

<template>

  <Header />

  <main class="max-w-5xl mx-auto py-10">

    <fieldset class="flex flex-col items-end">

      <label for="sort"></label>

      <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort">

        <option value="" disabled selected>Sort by</option>

        <option value="date">Date</option>

        <option value="most-likes">Most liked</option>

      </select>

    </fieldset>

    <ul class="max-w-2xl mx-auto">

      <li class="flex justify-between items-center py-2" v-for="{ date, name, votes } in requests">
      
        <div class="">

          <span class="mr-5 text-sm text-neutral-500">{{ formatDate( date ) }}</span>

          <span class="font-semibold">{{ name }}</span>

        </div>

        <button type="button">

          <HeartIcon class="h-8 w-8 text-red-600" />

        </button>
        
      </li>

    </ul>

  </main>

</template>
