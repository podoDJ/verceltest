// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmWscw3_16OkQCsVeNlvxMkn3bjqhI_hI",
  authDomain: "honcook-1b672.firebaseapp.com",
  projectId: "honcook-1b672",
  storageBucket: "honcook-1b672.appspot.com",
  messagingSenderId: "922316113305",
  appId: "1:922316113305:web:5aff5724fb2ed8d907bf08",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
