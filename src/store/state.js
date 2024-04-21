
import { ref, computed, reactive, markRaw } from "vue";

import MakeRequest from '../components/make-request.vue';

import UpdateRequest from '../components/update-request.vue';

import DeleteRequest from '../components/delete-request.vue';

import NotifyRequesters from '../components/notify-requesters.vue';

export const MODAL_COMPONENTS = {

  MAKE_REQUEST : MakeRequest,

  UPDATE_REQUEST: UpdateRequest,

  DELETE_REQUEST: DeleteRequest,

  NOTIFY_REQUESTERS: NotifyRequesters

};

export const currentModalComponent = markRaw( {

  id: null,

  component: MODAL_COMPONENTS.MAKE_REQUEST

} );

export const state = reactive( {

  isModalOpen: false,

  user: null,
  
  requests: null

} );

// functions interacting with state

export const onLikeButtonClicked = async ( id ) => {

  const options = {

    method: 'PATCH',

    // headers: {

    //   'Content-Type': 'application/json'
      
    // },

    credentials: 'include'

  }

  try {

    const response = await fetch( `http://localhost:3000/user-requests/${ id }/users/${ state.user.id }`, options );

    if ( response.ok ) {

      console.log( response, 'successfully added/removed user request' )
      
      const result = await response.text();

      console.log( result );

      const requestIndex = state.requests.findIndex( request => request._id === id );

      const request = state.requests[ requestIndex ];

      if ( requestIndex === -1 ) return;

      if ( request.users.includes( state.user.id ) ) request.users = request.users.filter( userId => userId !== state.user.id );

      else request.users.push( state.user.id );

    }
    
  } catch ( error ) {
    
    console.log( error );

  }
    
  // const request = state.requests.find( request => request._id === id );

  // if ( request.liked ) request.votes -= 1;
  
  // else request.votes += 1;

  // request.liked = ! request.liked;

}

export const onUpdateButtonClicked = id => {
    
  // const request = state.requests.find( request => request._id === id );

  setCurrentModalComponent( MODAL_COMPONENTS.UPDATE_REQUEST, id );

  openModal();

}

export const onDeleteButtonClicked = id => {
    
  // const request = state.requests.find( request => request._id === id );

  setCurrentModalComponent( MODAL_COMPONENTS.DELETE_REQUEST, id );

  openModal();

}

export const onNotifyButtonClicked = id => {
    
  // const request = state.requests.find( request => request._id === id );

  setCurrentModalComponent( MODAL_COMPONENTS.NOTIFY_REQUESTERS, id );

  openModal();

}

export const openModal = () => {

  if ( ! state.isModalOpen ) state.isModalOpen = true;

}

export const closeModal = () => {

  if ( state.isModalOpen ) state.isModalOpen = false;

}

export const setCurrentModalComponent = ( component, id = null ) => {

  currentModalComponent.component = component;

  currentModalComponent.id = id;

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