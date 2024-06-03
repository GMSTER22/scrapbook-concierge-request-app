
<script setup>

  import { ref, computed } from 'vue';

  import Header from '../components/header.vue';

  import UpdateButton from '../components/buttons/updateButton.vue';
  
  import DeleteButton from '../components/buttons/deleteButton.vue';

  import NotifyButton from '../components/buttons/notifyButton.vue';
  
  import { state, onUpdateButtonClicked, onDeleteButtonClicked, onReleaseButtonClicked } from '../store/state';

  import { formatDate } from '../utils/utils';

  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( '' );

  // const releaseStatus = ref( state.requests.map( request => request.released ) );

  // const test = ref( 'false' );

  // function onTest() { test.value = ! test.value }

  const filteredRequests = computed( () => {

    return state.requests.sort( ( a, b ) => {

      console.log( 'COMPUTEDDDD' );

      switch ( sortRequestValue.value ) {

        case 'date-asc':
          return new Date( a.createdAt ).valueOf() - new Date( b.createdAt ).valueOf();

        case 'date-desc':
          return new Date( b.createdAt ).valueOf() - new Date( a.createdAt ).valueOf();

        case 'likes-asc':
          return a.users.length - b.users.length;

        case 'likes-desc':
          return b.users.length - a.users.length;
      
        default:
          return 0;

      }
      
    } )
    
    .filter( request => request.title.toLocaleLowerCase()
    
      .includes( searchRequestValue.value.toLocaleLowerCase() ) ? request : '' );

  } );

  const requestsReleaseListIds = computed( () => state.requestsReleaseList.map( request => request.id ) );

  function toggleIdFromRequestList( id, title ) {

    const index = state.requestsReleaseList.findIndex( request => request.id === id );

    if ( index != -1 ) state.requestsReleaseList.splice( index, 1 );

    else state.requestsReleaseList.push( { id, title } );

  }

</script>

<template>

  <Header />

  <main class="py-14 px-5 min-h-[calc(100vh-60px)] sm:py-28 sm:min-h-[calc(100vh-72px)] lg:px-0">

    <!-- py-14 px-5 sm:py-28 sm:min-h-[calc(100vh-72px)] lg:px-0 min-h-[calc(100vh-60px)] -->

    <!-- <h1 class="text-3xl sm:text-4xl font-bold text-center mb-20">
      
      Admin
    
    </h1> -->

    <div class="max-w-4xl mx-auto">

      <p v-if="! state.requests.length">No requests have been made</p>

      <div v-else>

        <form class="flex justify-between mb-20">

          <fieldset class="w-1/2" action="">

            <label for="search"></label>

            <input class="w-full border-0 border-b-2 focus:border-b-purple-800 focus:ring-transparent" type="search" name="search" id="search" placeholder="search request..." v-model="searchRequestValue">

          </fieldset>

          <fieldset class="flex flex-col">

            <label for="sort"><span class="sr-only">Sort By</span></label>

            <select class="rounded focus:ring-purple-800 focus:border-purple-800" name="sort" id="sort" v-model="sortRequestValue">

              <option value="" disabled>Sort by</option>

              <option value="date-asc">Date Asc</option>

              <option value="date-desc">Date Desc</option>
              
              <option value="likes-asc">Likes Asc</option>

              <option value="likes-desc">Likes Desc</option>

            </select>

          </fieldset>

        </form>

        <ul v-if="filteredRequests.length">

          <li class="relative grid grid-rows-3 grid-cols-1 justify-between items-center gap-y-2 mb-10 p-2 rounded odd:bg-purple-100 sm:grid-rows-1 sm:grid-cols-[64px_1fr_auto_auto] sm:gap-x-5 shadow-[0_0_3px_rgb(0,0,0)] sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ _id: id, createdAt, title, users, released, url }, index) in filteredRequests" :key="id">
            
            <!-- <div class="flex items-center gap-x-3"> -->

              <span v-show="released" class="absolute left-0 -top-5 px-3 py-[2px] text-xs font-medium rounded bg-green-500 empty:hidden">

                Released

              </span>

              <span class="text-left text-xs text-neutral-600 sm:text-right">
                
                {{ formatDate( createdAt ) }}
              
              </span>

              <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">
                
                {{ title }}
              
              </span>

            <!-- </div> -->

            <div class="text-right">

              <span class="text-sm">{{ users.length - 1 }}</span>

            </div>

            <div class="flex gap-x-2 justify-self-end">

              <UpdateButton @update-button-clicked="()=> onUpdateButtonClicked( id )" />

              <DeleteButton @delete-button-clicked="()=> onDeleteButtonClicked( id )" />

              <NotifyButton 
              
                :release="requestsReleaseListIds.includes( id )"
                
                @notify-button-clicked="() => toggleIdFromRequestList( id, title )" 
                
              />

              <!-- <NotifyButton :release="requestsReleaseListIds.includes( id )"

                :disable="! released || ! url"
                
                @notify-button-clicked="() => toggleIdFromRequestList( id, title )" 
                
              /> -->

            </div>
            
          </li>

        </ul>

        <p v-else class="text-2xl text-center">No result found...</p>
        
      </div>

      <button 
      
        class="absolute bottom-5 right-5 px-4 py-2 rounded-md bg-purple-700 text-white" 
        
        type="button" 
        
        @click="onReleaseButtonClicked">
        
        Email Requesters
      
      </button>
      
    </div>

  </main>

</template>