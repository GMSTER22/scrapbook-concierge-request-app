
import { computed, reactive, markRaw } from "vue";

import MakeRequest from '../components/make-request.vue';

import UpdateRequest from '../components/update-request.vue';

import DeleteRequest from '../components/delete-request.vue';

import ReleaseRequest from '../components/release-request.vue';

import { decodeJWT, getToken, removeToken } from "../utils/utils";

export const MODAL_COMPONENTS = {

  MAKE_REQUEST : MakeRequest,

  UPDATE_REQUEST: UpdateRequest,

  DELETE_REQUEST: DeleteRequest,

  RELEASE_REQUEST: ReleaseRequest

};

export const currentModalComponent = markRaw( {

  request: null,

  callbackFunction: () => null,

  component: MODAL_COMPONENTS.MAKE_REQUEST

} );

export const state = reactive( {

  isModalOpen: false,

  user: null,
  
  requests: null,

  requestsReleaseList: []

} );

export const onLikeButtonClicked = async ( request, callbackFn ) => {

  const { _id: id } = request;

  // console.log( request, 'request' );

  const options = {

    method: 'PATCH',

    headers: {

      'Authorization': `Bearer ${ getToken( 'token' ) }`,

    }

  }

  try {

    const response = await fetch( `${process.env.SERVER_URL}/user-requests/${ id }/users/${ state.user.id }`, options );

    if ( response.ok ) {

      callbackFn();

      console.log( response, 'successfully added/removed user request' );
      
      const result = await response.text();

      console.log( result );

    }
    
  } catch ( error ) {
    
    console.log( error );

  };

}

export const onMakeRequestButtonClick = ( callbackFn ) => {
    
  setCurrentModalComponent( MODAL_COMPONENTS.MAKE_REQUEST, null, callbackFn );

  openModal();

}

export const onUpdateButtonClicked = ( request, callbackFn ) => {

  setCurrentModalComponent( MODAL_COMPONENTS.UPDATE_REQUEST, request, callbackFn );

  openModal();

}

export const onDeleteButtonClicked = ( request, callbackFn ) => {

  setCurrentModalComponent( MODAL_COMPONENTS.DELETE_REQUEST, request, callbackFn );

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

export const setCurrentModalComponent = ( component, request=null, callbackFn ) => {

  currentModalComponent.component = component;

  currentModalComponent.request = request;

  currentModalComponent.callbackFunction = callbackFn;

}

export const isAuthenticated = () => {

  if ( state.user ) return true;

  try {
    
    const token = getToken( 'token' );

    const decodedToken = decodeJWT( token );

    if ( ! token || ! decodedToken ) return false;

    state.user = decodedToken.payload;

    return true;

  } catch ( error ) {
    
    console.warn( error );
    
    return false;

  }

};

// export const isAuthenticated = () => {

//   const encodedCookieValue = getToken( 'scr-user' );

//   if ( ! encodedCookieValue ) return false;

//   const decodedCookieValue = decodeURIComponent( encodedCookieValue );

//   const parsedData = JSON.parse( decodedCookieValue );

//   console.log(parsedData, "user data")

//   state.user = parsedData;

//   return true;

// };

export const isAdmin = computed( () => state.user?.admin ?? false );

export const logUserOut = () => {

  state.user = null;
  
  removeToken( 'token' );

}
