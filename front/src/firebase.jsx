// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyC0JZLcdIK7oWaAftXoSzTzSBXjnHIq7Yw",
  authDomain: "kcalcontrol-e1f98.firebaseapp.com",
  projectId: "kcalcontrol-e1f98",
  storageBucket: "kcalcontrol-e1f98.appspot.com",
  messagingSenderId: "262899057121",
  appId: "1:262899057121:web:cb54c5c9da3beb0d9b12a0",
};*/
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
