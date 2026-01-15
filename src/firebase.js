// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh9H1AESxnhpwWklgtNpYq4qtQcdYLhj8",
  authDomain: "vueassignment-ddf66.firebaseapp.com",
  projectId: "vueassignment-ddf66",
  storageBucket: "vueassignment-ddf66.firebasestorage.app",
  messagingSenderId: "144822152098",
  appId: "1:144822152098:web:0068f788aad9068bca20fb",
  measurementId: "G-PN4057K3TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);