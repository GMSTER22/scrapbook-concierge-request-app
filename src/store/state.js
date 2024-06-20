
import { ref, computed, reactive, markRaw } from "vue";

import { fetchRequests } from "../utils/utils";

import MakeRequest from '../components/make-request.vue';

import UpdateRequest from '../components/update-request.vue';

import DeleteRequest from '../components/delete-request.vue';

import ReleaseRequest from '../components/release-request.vue';

export const MODAL_COMPONENTS = {

  MAKE_REQUEST : MakeRequest,

  UPDATE_REQUEST: UpdateRequest,

  DELETE_REQUEST: DeleteRequest,

  RELEASE_REQUEST: ReleaseRequest

};

export const currentModalComponent = markRaw( {

  id: null,

  component: MODAL_COMPONENTS.MAKE_REQUEST

} );

export const state = reactive( {

  isModalOpen: false,

  user: null,
  
  requests: null,

  requestsReleaseList: []

} );

// functions interacting with state

export const onLikeButtonClicked = async ( request ) => {

  const { id } = request;

  const options = {

    method: 'PATCH',

    // headers: {

    //   'Content-Type': 'application/json'
      
    // },

    credentials: 'include'

  }

  try {

    const response = await fetch( `${process.env.SERVER_URL}/user-requests/${ id }/users/${ state.user.id }`, options );

    if ( response.ok ) {

      console.log( response, 'successfully added/removed user request' );
      
      const result = await response.text();

      console.log( result );

    }
    
  } catch ( error ) {
    
    console.log( error );

  };

}

export const onUpdateButtonClicked = request => {

  setCurrentModalComponent( MODAL_COMPONENTS.UPDATE_REQUEST, request );

  openModal();

}

export const onDeleteButtonClicked = request => {

  setCurrentModalComponent( MODAL_COMPONENTS.DELETE_REQUEST, request );

  openModal();

}

export const onReleaseButtonClicked = () => {

  setCurrentModalComponent( MODAL_COMPONENTS.RELEASE_REQUEST );

  openModal();

}

export const openModal = () => {

  if ( ! state.isModalOpen ) state.isModalOpen = true;

}

export const closeModal = () => {

  if ( state.isModalOpen ) state.isModalOpen = false;

}

export const setCurrentModalComponent = ( component, request = null ) => {

  currentModalComponent.component = component;

  currentModalComponent.request = request;

}

function getCookie( name ) {

  const cookies = document.cookie.split(';');

  for ( let i = 0; i < cookies.length; i++ ) {

    const cookie = cookies[i].trim();

    if (cookie.startsWith(name + '=')) {

      return cookie.substring(name.length + 1);

    }

  }
  
  return null;
}

export const isAuthenticated = () => {

  const encodedCookieValue = getCookie( 'scr-user' );

  if ( ! encodedCookieValue ) return false;

  const decodedCookieValue = decodeURIComponent( encodedCookieValue );

  const parsedData = JSON.parse( decodedCookieValue );

  console.log(parsedData, "user data")

  state.user = parsedData;

  return true;

};

export const isAdmin = computed( () => state.user?.admin );
