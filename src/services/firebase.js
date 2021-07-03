import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA4LTfT2DKIeUDqeEFEPfmdkFnZJ--1wPM",
    authDomain: "chatty-d3c7d.firebaseapp.com",
    projectId: "chatty-d3c7d",
    storageBucket: "chatty-d3c7d.appspot.com",
    messagingSenderId: "796046514244",
    appId: "1:796046514244:web:8203c24b934e326b098411"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();

