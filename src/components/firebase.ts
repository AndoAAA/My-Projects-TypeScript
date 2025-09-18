
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADMSDT2SJYllkbys8x_09IqaVPvmKWUjk",
  authDomain: "spectra-2e65a.firebaseapp.com",
  projectId: "spectra-2e65a",
  storageBucket: "spectra-2e65a.firebasestorage.app",
  messagingSenderId: "1051644534099",
  appId: "1:1051644534099:web:6571d0d119231b5f5d95a6",
  measurementId: "G-SGD593DJQD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


