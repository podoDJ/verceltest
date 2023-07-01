// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBbAoEw79xaqB67xMYqrSfsyIVsuNELQ7Q",
  authDomain: "honcooknewhome.firebaseapp.com",
  projectId: "honcooknewhome",
  storageBucket: "honcooknewhome.appspot.com",
  messagingSenderId: "951230277951",
  appId: "1:951230277951:web:001aef3c37671353bdcb8a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
