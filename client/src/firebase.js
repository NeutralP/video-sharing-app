// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMTfTcf9Fvl8-RFBgt1LRhbOnbuTBD3l4",
    authDomain: "videoweb-2a762.firebaseapp.com",
    projectId: "videoweb-2a762",
    storageBucket: "videoweb-2a762.appspot.com",
    messagingSenderId: "273262596763",
    appId: "1:273262596763:web:8a58a34626558df72b2c3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Pass the Firebase app instance to getAuth()
const provider = new GoogleAuthProvider();

export { auth, provider };
export default app;