
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC2FI2Yd8KNccKaRk5351kgCunNI7ylnCk",
  authDomain: "instagram-project-e2003.firebaseapp.com",
  projectId: "instagram-project-e2003",
  storageBucket: "instagram-project-e2003.appspot.com",
  messagingSenderId: "15220163304",
  appId: "1:15220163304:web:70142ceac105da76dabf5d",
  measurementId: "G-W849VET84F"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider()
const auth = getAuth()

// Explicit export with multiple components

export { app, db, storage, provider, auth}
