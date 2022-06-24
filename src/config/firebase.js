import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCb9dE-s02A6OSzOI9x93xY4k499Wnw8So",
  authDomain: "the-clear-quran-9bda9.firebaseapp.com",
  projectId: "the-clear-quran-9bda9",
  storageBucket: "the-clear-quran-9bda9.appspot.com",
  messagingSenderId: "644807100732",
  appId: "1:644807100732:web:27c6eae2503dc67f2cf639",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export { firebase, storage };
