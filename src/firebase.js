// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf-UiUfKbrAOP8P1ZWi7_-Km-gQkCNo0w",
  authDomain: "trust-yoav.firebaseapp.com",
  projectId: "trust-yoav",
  storageBucket: "trust-yoav.appspot.com",
  messagingSenderId: "406200167098",
  appId: "1:406200167098:web:5e694a8449feb0cb1ab083"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();