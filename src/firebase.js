// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { POSTS_COLLECTION_NAME } from "./constants";

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
const auth = getAuth(app);
const db = getFirestore(app);

export const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert(`Registered with user ${userCredential.user.email}`);
    })
    .catch((error) => {
      alert(error.code);
    });
};

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
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

export const getCurrentTimestamp = () => {
  return serverTimestamp();
};

export const addToResponses = async (data) => {
  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION_NAME), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllResponses = async () => {
  const q = query(collection(db, POSTS_COLLECTION_NAME), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  const queryResponse = [];
  querySnapshot.forEach((doc) => {
    queryResponse.push(doc.data());
  });
  return queryResponse;
};
