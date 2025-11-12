// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlhnY_HN_IseShXEbfyylUrYVilbrQ538",
  authDomain: "assignment-10-85d85.firebaseapp.com",
  projectId: "assignment-10-85d85",
  storageBucket: "assignment-10-85d85.firebasestorage.app",
  messagingSenderId: "508585132590",
  appId: "1:508585132590:web:875f1c7c1f2cd54f5155bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);