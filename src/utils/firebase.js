// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

export const signUpWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword( auth, email, password )
  .then( userCredential => {
    console.log(userCredential);
    //Signed in
    const user = userCredential.user;

    console.log(user);

  } )
  .catch( error => {
    console.log('error happened')

    console.log(error)
    const errorCode = error.code;

    const errorMessage = error.message;

  } )