import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCCGAFwp_lHP6f-LVGRiBL0Dc_MP523_-Y",
  authDomain: "auth-61940.firebaseapp.com",
  projectId: "auth-61940",
  storageBucket: "auth-61940.appspot.com",
  messagingSenderId: "661465894225",
  appId: "1:661465894225:web:b9d437420ba5d941ce1770",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};