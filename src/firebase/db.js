import firebase from 'firebase';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPENp31Fe4I4jTD1v1BDYphjE2KcCCUfM",
  authDomain: "to-do-list-563b5.firebaseapp.com",
  projectId: "to-do-list-563b5",
  storageBucket: "to-do-list-563b5.firebasestorage.app",
  messagingSenderId: "564182145796",
  appId: "1:564182145796:web:4f053e6b5824fe319c8e51"
};



  // Initialize Firebase
  export const db = initializeApp(firebaseConfig).firestore();