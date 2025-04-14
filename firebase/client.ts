import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcShVk5FQHbNgs6iZiOK9HmDrAnEUWD2o",
  authDomain: "faiztalk-12fe7.firebaseapp.com",
  projectId: "faiztalk-12fe7",
  storageBucket: "faiztalk-12fe7.firebasestorage.app",
  messagingSenderId: "670543120048",
  appId: "1:670543120048:web:ce8a27155b3ecf0b54dd75",
  measurementId: "G-GL76CKJ7D6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);