// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , connectFirestoreEmulator } from "firebase/firestore";
import { getAuth , connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6RwCnGZg22PgHgJDXityAEqQ-8bHGlxk",
  authDomain: "e-commerce-ong.firebaseapp.com",
  databaseURL: "https://e-commerce-ong-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce-ong",
  storageBucket: "e-commerce-ong.firebasestorage.app",
  messagingSenderId: "213145189159",
  appId: "1:213145189159:web:87bdf6a34b1a5e4af5c702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
connectFirestoreEmulator(db , '127.0.0.1' , 8008)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

export { db , auth };