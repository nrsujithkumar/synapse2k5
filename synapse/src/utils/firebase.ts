// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8_-0yeSabYTkIJ2Y597BPKvM-PGvGm88",
  authDomain: "synapse2k5-a36ec.firebaseapp.com",
  projectId: "synapse2k5-a36ec",
  storageBucket: "synapse2k5-a36ec.firebasestorage.app",
  messagingSenderId: "680351777669",
  appId: "1:680351777669:web:f39e89ff4bc7ffb8e23aec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you'll use
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Add and export storage