
import { ref, computed, reactive, markRaw } from "vue";

import MakeRequest from '../components/make-request.vue';

import UpdateRequest from '../components/update-request.vue';

import DeleteRequest from '../components/delete-request.vue';

import NotifyRequesters from '../components/notify-requesters.vue';

import requests from '../data/requests.json';

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
  
  requests

} );

// functions interacting with state

export const onLikeButtonClicked = id => {
    
  const request = state.requests.find( request => request.id === id );

  if ( request.liked ) request.votes -= 1;
  
  else request.votes += 1;

  request.liked = ! request.liked;

}

export const onUpdateButtonClicked = id => {
    
  // const request = state.requests.find( request => request.id === id );

  setCurrentModalComponent( MODAL_COMPONENTS.UPDATE_REQUEST, id );

  openModal();

}

export const onDeleteButtonClicked = id => {
    
  // const request = state.requests.find( request => request.id === id );

  setCurrentModalComponent( MODAL_COMPONENTS.DELETE_REQUEST, id );

  openModal();

}

export const onSendButtonClicked = id => {
    
  // const request = state.requests.find( request => request.id === id );

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