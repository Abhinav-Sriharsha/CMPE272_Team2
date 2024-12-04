// firebaseConfig.js (Firebase v9+ Modular SDK)
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCPPUyZAAk4aJkeSYIkQCWtQmJVvZrFfU",
  authDomain: "project-360b5.firebaseapp.com",
  projectId: "project-360b5",
  storageBucket: "project-360b5.firebasestorage.app",
  messagingSenderId: "217193084942",
  appId: "1:217193084942:web:097888dd3e094490d6245f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
