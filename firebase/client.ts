// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl_kzZQn4t8XCMWENzGUSKuc8Nl1vVuR8",
  authDomain: "bitprep-6b8fb.firebaseapp.com",
  projectId: "bitprep-6b8fb",
  storageBucket: "bitprep-6b8fb.firebasestorage.app",
  messagingSenderId: "930243486784",
  appId: "1:930243486784:web:7ef2f2d0b17185e343eba5",
  measurementId: "G-1M8DK5EEGD"
}

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();

export const auth=getAuth(app);
export const db=getFirestore(app);