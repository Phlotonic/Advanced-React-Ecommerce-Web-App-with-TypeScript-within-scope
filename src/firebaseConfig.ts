// Import the functions we need from the SDKs we need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that we want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6wcVe4lDMkJUuxU1WW_ymVfN_sxxIDEQ",
  authDomain: "react-app-d4b6d.firebaseapp.com",
  projectId: "react-app-d4b6d",
  storageBucket: "react-app-d4b6d.firebasestorage.app",
  messagingSenderId: "626548898433",
  appId: "1:626548898433:web:954cb8533baaac3cf96b80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Creates and initializes a Firebase app instance using the provided firebaseConfig
const auth: Auth = getAuth(app);
// Retrieves the Authentication service for the initialized Firebase app

export { auth };