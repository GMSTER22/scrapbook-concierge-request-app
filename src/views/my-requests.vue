
<script setup>

  import { ref, computed, onBeforeMount } from 'vue'; 

  import Header from '../components/header.vue';

  import Modal from '../components/modal.vue';

  import LikeButton from '../components/buttons/likeButton.vue';

  import Pagination from '../components/pagination.vue';

  import Spinner from '../components/spinner.vue';

  import UpdateButton from '../components/buttons/updateButton.vue';
  
  import DeleteButton from '../components/buttons/deleteButton.vue';

  import { formatDate, fetchRequests } from '../utils/utils';

  import { state, openModal, currentModalComponent, MODAL_COMPONENTS, setCurrentModalComponent, onUpdateButtonClicked, onDeleteButtonClicked } from '../store/state';

  const REQUESTS_PER_PAGE = 15;

  const isLoadingUserRequests = ref( true );

  const userRequests = ref( null );

  const currentPage = ref( 1 );

  const totalPages = ref( 1 );
  
  const searchRequestValue = ref( '' );
  
  const sortRequestValue = ref( '' );

  const filteredRequests = computed( () => {

    return userRequests.value?.sort( ( a, b ) => {

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

  const options = {

    method: "GET",

    credentials: 'include'

  }

  const onMakeRequestButtonClick = () => {

    if ( currentModalComponent.component !== MODAL_COMPONENTS.MAKE_REQUEST ) setCurrentModalComponent( MODAL_COMPONENTS.MAKE_REQUEST );

    openModal();

  }

  const fetchPage = async ( page ) => {

    if ( page === currentPage.value ) return;

    isLoadingUserRequests.value = true;

    const response = await fetch( `http://localhost:3000/requests/users/${ state.user.id }?page=${page}&limit=${REQUESTS_PER_PAGE}`, options );

    if ( response.ok ) {

      const data = await response.json();

      userRequests.value = data.requests;

      currentPage.value = data.page;

      totalPages.value = data.total;

    }
      
    isLoadingUserRequests.value = false;

  }

  onBeforeMount( async () => {

    const response = await fetch( `http://localhost:3000/requests/users/${ state.user.id }?page=1&limit=${REQUESTS_PER_PAGE}`, options );

    if ( response.ok ) {

      const data = await response.json();

      userRequests.value = data.requests;

      currentPage.value = data.page;

      totalPages.value = data.total;

    }
      
    isLoadingUserRequests.value = false;

  } )

</script>

<template>

  <Header />

  <main class="min-h-[calc(100vh-60px)] py-14 px-5 sm:py-28 lg:px-0">

    <div class="max-w-3xl mx-auto">

      <div v-if="isLoadingUserRequests">

        <Spinner />

      </div>

      <div v-else>

        <div v-if="! userRequests.length" class="text-center">
        
          <p class="mb-8 text-2xl">

            You haven't made any requests yet

          </p>

          <button type="button" class="px-4 py-2 rounded font-semibold bg-purple-900 text-white" @click="onMakeRequestButtonClick">
              
            Make A Request

          </button>
        
        </div>

        <div v-else>

          <div class="my-5 text-right">

            <button type="button" class="px-4 py-2 rounded font-semibold bg-purple-900 text-white" @click="onMakeRequestButtonClick">
              
              Make A Request

            </button>

          </div>

          <form class="flex justify-between mb-20">

            <fieldset class="w-1/2">

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

            <li class="relative grid gap-x-3 gap-y-4 mb-10 p-2 rounded shadow-[0_0_3px_rgb(0,0,0)] sm:grid-cols-[64px_1fr_auto] sm:items-center sm:bg-transparent odd:bg-purple-100 sm:shadow-[0_0_2px_rgb(0,0,0)]" v-for="({ _id: id, createdAt, title, users, released, url }) in filteredRequests" :key="id">

              <span v-show="released && url" class="absolute left-0 -top-5 px-3 py-[2px] text-xs font-medium rounded bg-green-500 empty:hidden">

                released

              </span>
              
              <span class="text-left sm:text-right text-xs text-neutral-600">
                
                {{ formatDate( createdAt ) }}
              
              </span>

              <span class="px-5 text-lg font-bold text-center sm:pr-20 sm:pl-0 sm:text-base sm:text-left">

                {{ title }}

              </span>

              <div class="flex gap-x-1 items-center justify-self-end">

                <span class="px-3">

                  {{ users.length - 1 }}

                </span>

                <UpdateButton @update-button-clicked="()=> onUpdateButtonClicked( id )" />
                  
                <DeleteButton @delete-button-clicked="()=> onDeleteButtonClicked( id )" />

                <a v-show="released && url" class="bg-red-600 text-white px-1 rounded-md" :href="url">Buy Now</a>

                <!-- <LikeButton :is-liked="users.includes(state.user.id)" @like-button-clicked="()=> onLikeButtonClicked( id )" /> -->

              </div>

            </li>

          </ul>

          <p v-else class="text-2xl text-center">
            
            No result found...
          
          </p>

        </div>

      </div>

    </div>

    <Pagination 
      
      :current="currentPage" 
      
      :total="totalPages" 
      
      @change-page="( page ) => fetchPage( page )" />

  </main>

</template>