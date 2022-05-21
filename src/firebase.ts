// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD6ccffQ2PlZledsPGwcNc9CRXRW2A5eg",
  authDomain: "food-tracker-350916.firebaseapp.com",
  databaseURL:
    "https://food-tracker-350916-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "food-tracker-350916",
  storageBucket: "food-tracker-350916.appspot.com",
  messagingSenderId: "604597126913",
  appId: "1:604597126913:web:f0d74bd46f1aa4ca95bd00",
  measurementId: "G-W591FQVWH1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const signInWithGoogle = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, provider);
};
