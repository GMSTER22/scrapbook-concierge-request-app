
<script setup>

  import { ref, computed } from 'vue'; 

  import Header from '../components/header.vue';

  import RequestList from '../components/request-list.vue';

  import { state, onLikeButtonClicked } from '../store/state';

  const myRequestList = computed( () => state.requests.filter( ({ liked }) => !! liked ) );

  const sortBy = ref( '' );

  const sortByChanged = computed(() => console.log(sortBy.value, 'sort by value') );

</script>

<template>

  <Header />

  <main class="py-14">

    <div class="max-w-2xl mx-auto justify-between flex mb-10">

      <form class="w-1/2" action="">

        <label for="search"></label>

        <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request...">

      </form>

      <fieldset class="flex flex-col">

        <label for="sort"><span class="sr-only">Sort By</span></label>

        <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortBy">

          <option value="" disabled>Sort by</option>

          <option value="date">Date</option>

          <option value="released">Released</option>
          
          <option value="most-likes">Most liked</option>

        </select>

      </fieldset>

    </div>

    <RequestList :requests="myRequestList" @likeButtonClicked="onLikeButtonClicked" />

  </main>

</template>