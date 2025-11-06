// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6FwbqZLH_wPJSZ3s9E9qYlJzG-zhb7sM",
  authDomain: "inputnilaimahasiswa-2cae8.firebaseapp.com",
  projectId: "inputnilaimahasiswa-2cae8",
  storageBucket: "inputnilaimahasiswa-2cae8.firebasestorage.app",
  messagingSenderId: "724952004989",
  appId: "1:724952004989:web:89c43954812278a0be7414",
  measurementId: "G-BNDMBHG6M9"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);

export { db };
