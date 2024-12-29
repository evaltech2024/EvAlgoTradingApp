import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTDxI2sr-EAL_lyBTY4N64ZPx7xvNvceQ",
  authDomain: "evalgotradingproj.firebaseapp.com",
  projectId: "evalgotradingproj",
  storageBucket: "evalgotradingproj.firebasestorage.app",
  messagingSenderId: "703086075500",
  appId: "1:703086075500:web:4c9edfba06fee83a950249"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



// signInAnonymously(auth)
//   .then(() => {
//     console.log("Signed in for testing");
//   })
//   .catch((error) => {
//     console.error("Error signing in for testing:", error);
//   });

export { db, auth, provider };
