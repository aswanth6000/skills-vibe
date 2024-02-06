import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBcPKL1EiLP0xiiBjBOc8JFBkhCJuOtLsY",
  authDomain: "skill-vibe.firebaseapp.com",
  projectId: "skill-vibe",
  storageBucket: "skill-vibe.appspot.com",
  messagingSenderId: "220841987968",
  appId: "1:220841987968:web:bcd1d6d72afb88ee1f3b65",
  measurementId: "G-N1MQSC95S2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}