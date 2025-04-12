// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZkjk8NTif1Q0ur6k2ErDIdHsxZd9ZAzA",
  authDomain: "anti-resume-app.firebaseapp.com",
  projectId: "anti-resume-app",
  storageBucket: "anti-resume-app.appspot.com",
  messagingSenderId: "468312968259",
  appId: "1:468312968259:web:3d75d45178aa6d276c98f6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
