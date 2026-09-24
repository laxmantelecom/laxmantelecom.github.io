// Firebase configuration for LAXMAN TELECOM website
// This is safe to be public — your data is protected by Firebase Security Rules, not by hiding this file.

const firebaseConfig = {
  apiKey: "AIzaSyC2bhnG8gKF1bVfgtSWOimc3h-SR7bvIHw",
  authDomain: "laxman-telecom.firebaseapp.com",
  databaseURL: "https://laxman-telecom-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "laxman-telecom",
  storageBucket: "laxman-telecom.firebasestorage.app",
  messagingSenderId: "1000712882598",
  appId: "1:1000712882598:web:0b1356907831cf3181e767"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

// This email is the ADMIN account. Whoever logs in with this email
// gets redirected to the admin dashboard instead of the normal user dashboard.
const ADMIN_EMAIL = "laxmantelecom.help@gmail.com";
