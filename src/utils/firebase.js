// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';

import { ref } from 'vue';

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider  
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID

};

const app = initializeApp( firebaseConfig );

const analytics = getAnalytics( app );

const auth = getAuth( app );

export let isAuthenticated = ref(false);

export const signUpWithEmailAndPassword = ( email, password ) => createUserWithEmailAndPassword( auth, email, password )
  .then( userCredential => {

    console.log(userCredential);
    //Signed in
    const user = userCredential.user;

  } )
  .catch( error => {

    console.log(error)
    console.log(error.code)

    const errorCode = error.code;

    const errorMessage = error.message;

  } );

export const logInWithEmailAndPassword = ( email, password ) => signInWithEmailAndPassword( auth, email, password )
  .then( userCredential => {

    console.log(userCredential)

    console.log(userCredential.user)

    const user = userCredential.user;

  } )
  .catch( ( error ) => {

    console.log(error)

    console.log(error.code)

    const errorCode = error.code;

    const errorMessage = error.message;
    
  } );

const authenticate = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    
    console.log(user);
    if ( !isAuthenticated.value ) isAuthenticated.value = true;

    console.log(isAuthenticated.value, "checking authentication IF")
    // email = user.email;
    // displayName = user.displayName;
    // ...
  } else {
    // User is signed out
    // ...
    console.log(user)
    if ( isAuthenticated.value ) isAuthenticated.value = false;
    console.log('user is signed out');

    console.log(isAuthenticated.value, "checking authentication ELSE")

  }
});