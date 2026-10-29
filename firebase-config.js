// Firebase configuration for LAXMAN TELECOM.
// Loaded by every page after the Firebase SDK scripts.
const firebaseConfig = {
  apiKey: "AIzaSyC2bhnG8gKF1bVfgtSWOimc3h-SR7bvIHw",
  authDomain: "laxman-telecom.firebaseapp.com",
  databaseURL: "https://laxman-telecom-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "laxman-telecom",
  storageBucket: "laxman-telecom.firebasestorage.app",
  messagingSenderId: "1000712882598",
  appId: "1:1000712882598:web:0b1356907831cf3181e767",
  measurementId: "G-S2686ZFNYE"
};

// Start Firebase only once, even if this file is loaded twice
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();

// The one account that is allowed to open the admin pages
const ADMIN_EMAIL = "laxmantelecom.help@gmail.com";
