
import { ref, computed, reactive } from "vue";

import requests from '../data/requests.json';

export const state = reactive( {

  requests,

  isModalOpen: false,

  requestToUpdateID: null

} );

export const onLikeButtonClicked = id => {
    
  const request = state.requests.find( request => request.id === id );

  if ( request.liked ) request.votes -= 1;
  
  else request.votes += 1;

  request.liked = ! request.liked;

}

export const openModal = () => {

  if ( ! state.isModalOpen ) state.isModalOpen = true;

}

export const closeModal = () => {

  if ( state.isModalOpen ) state.isModalOpen = false;

}