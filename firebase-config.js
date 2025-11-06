// firebase-config.js
// Import Firestore modules (bukan Realtime Database)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6FwbqZLH_wPJSZ3s9E9qYlJzG-zhb7sM",
  authDomain: "inputnilaimahasiswa-2cae8.firebaseapp.com",
  projectId: "inputnilaimahasiswa-2cae8",
  storageBucket: "inputnilaimahasiswa-2cae8.firebasestorage.app",
  messagingSenderId: "724952004989",
  appId: "1:724952004989:web:89c43954812278a0be7414",
  measurementId: "G-BNDMBHG6M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (BUKAN getDatabase!)
const db = getFirestore(app);

// Export database untuk digunakan di file lain
export { db };