import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN6ZQrC1PLJRvuJekx5vOOXI7vdAgOUio",
  authDomain: "the-clear-quran.firebaseapp.com",
  databaseURL: "https://the-clear-quran.firebaseio.com",
  projectId: "the-clear-quran",
  storageBucket: "the-clear-quran.appspot.com",
  messagingSenderId: "513382340628",
  appId: "1:513382340628:web:1fd8840668bf857e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// var storage = firebase.storage();

export { app };
