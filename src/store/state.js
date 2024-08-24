
import { ref, computed, reactive, markRaw } from "vue";

import { v4 as uuidv4 } from 'uuid';

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

  searchRequestResult: null,

  requestsReleaseList: [],

  alerts: []

} );

export const pushAlert = ( type, message, expiration=3000 ) => {

  const alertId = uuidv4();

  state.alerts.push( {

    id: alertId, 
    
    type, 
    
    message

  } );

  setTimeout( () => {
    
    state.alerts = state.alerts.filter( alert => alert.id !== alertId );

  }, expiration );

}

export const onLikeButtonClicked = async ( requests, logUserOutAndRedirectHomeFn ) => {

  try {
  
    const options = {
      
      method: 'PATCH',
      
      headers: {
        
        'Authorization': `Bearer ${ getToken( 'token' ) }`,
        
      }
      
    }
    
    const { _id: id } = requests[ 0 ];

    const response = await fetch( `${process.env.SERVER_URL}/user-requests/${ id }/users/${ state.user.id }`, options );

    const result = await response.json();
    
    if ( response.ok ) {
      
      requests.forEach( request => {

        if ( ! request ) return;
        
        const isLiked = request.users.includes( state.user.id );
  
        if ( isLiked ) request.users = request.users.filter( userId => userId !== state.user.id );
  
        else request.users.push( state.user.id );

      } );

    } else if ( response.status === 401 ) {

      pushAlert( 'failure', 'You\'re not logged in' );

      logUserOutAndRedirectHomeFn();

    } else if ( response.status === 404 ) {

      // alert( result.message );

      pushAlert( 'failure', result.message );

      // setTimeout( () => fetchPageCallbackFn(), 2000 );

    } else {

      pushAlert( 'failure', result.message );

    }
    
  } catch ( error ) {
    
    console.error( error );

  };

}

export const onMakeRequestButtonClick = () => {
    
  setCurrentModalComponent( MODAL_COMPONENTS.MAKE_REQUEST, null );

  openModal();

}

export const onUpdateButtonClicked = ( request ) => {

  setCurrentModalComponent( MODAL_COMPONENTS.UPDATE_REQUEST, request );

  openModal();

}

export const onDeleteButtonClicked = ( request ) => {

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
    
    return false;

  }

};

export const isAdmin = computed( () => state.user?.admin ?? false );

export const logUserOut = () => {

  state.user = null;
  
  removeToken( 'token' );

}
