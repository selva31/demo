// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0n-BGZLqu2XoeEe-nT387nV0qy-wh1H0",
  authDomain: "chatbot-f5e5d.firebaseapp.com",
  projectId: "chatbot-f5e5d",
  storageBucket: "chatbot-f5e5d.firebasestorage.app",
  messagingSenderId: "65899357261",
  appId: "1:65899357261:web:9b2b18d88a68bd53c02804",
  measurementId: "G-HXBXSP0BP7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // Success: Retrieve user profiles and authentication tokens
    const user = result.user;
    console.log("Logged in user details:", user);
  } catch (error) {
    // Handle failures or interface closures
    console.error("Authentication Error:", error.message);
  }
};

const githubprovider = new GithubAuthProvider();

export const handlegithublogin = async () => {
  try {
    const result = await signInWithPopup(auth, githubprovider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
      })

      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.customData.email;

        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  } catch (error) {
    console.error(error);
  }
};
