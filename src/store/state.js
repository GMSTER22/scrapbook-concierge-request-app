
import { ref, computed, reactive } from "vue";

import requests from '../data/requests.json';

export const state = reactive( {

  requests,

  open: false

} );

export const onLikeButtonClicked = id => {
    
  const request = state.requests.find( request => request.id === id );

  if ( request.liked ) request.votes -= 1;
  
  else request.votes += 1;

  request.liked = ! request.liked;

}
