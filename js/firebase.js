import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCogzoDlsHB_vHKkRPorDWx0W6xCExq7rg",
  authDomain: "soulmate-prank.firebaseapp.com",
  projectId: "soulmate-prank",
  storageBucket: "soulmate-prank.firebasestorage.app",
  messagingSenderId: "425375379388",
  appId: "1:425375379388:web:ff8b13392ffe0fd4bf05b9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function saveUser(name, age) {
  return addDoc(collection(db, "users"), {
    name,
    age,
    createdAt: serverTimestamp()
  });
}

export function saveFeedback(name, age, feedback, rating) {
  return addDoc(collection(db, "feedback"), {
    name,
    age,
    feedback,
    rating,
    createdAt: serverTimestamp()
  });
}
