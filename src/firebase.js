import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwB_4Ex2ZvpOB9RLcz6rSTofU_Ef_R5K8",
  authDomain: "aisecurity-arena.firebaseapp.com",
  projectId: "aisecurity-arena",
  storageBucket: "aisecurity-arena.firebasestorage.app",
  messagingSenderId: "110624645672",
  appId: "1:110624645672:web:92785319a6596903d90b1d",
  measurementId: "G-HTG6P352L6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
