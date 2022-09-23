// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyQ5IX1derr6dJFmoGk1MM1_m5OY1qM14",
  authDomain: "socialmediaapp-6f2ce.firebaseapp.com",
  projectId: "socialmediaapp-6f2ce",
  storageBucket: "socialmediaapp-6f2ce.appspot.com",
  messagingSenderId: "1020998043890",
  appId: "1:1020998043890:web:18338e2d2130b81ec9686b",
  measurementId: "G-9CHC3ZQ6NT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert(`Registered with user ${userCredential.user.email}`);
    })
    .catch((error) => {
      alert(error.code);
    });
};

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert(`Logged in with user ${userCredential.user.email}`);
    })
    .catch((error) => {
      alert(error.code);
    });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      alert("Signed out");
    })
    .catch((error) => {
      alert(error.code);
    });
};
