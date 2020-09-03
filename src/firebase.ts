import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDumwPrOtxynHbDGPrdxRm3HR5-3AeP_Jw',
  authDomain: 'recipe-site-v2.firebaseapp.com',
  databaseURL: 'https://recipe-site-v2.firebaseio.com',
  projectId: 'recipe-site-v2',
  storageBucket: 'recipe-site-v2.appspot.com',
  messagingSenderId: '445354328804',
  appId: '1:445354328804:web:e61a32a404cc293dbfa2f1',
  measurementId: 'G-CYETGCF81C'
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const firestore = firebase.firestore;
export const storage = firebase.storage;
