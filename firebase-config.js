// Firebase configuration for LAXMAN TELECOM website
// SAFE TO PUBLIC: This key is secured using Google Cloud website restrictions.

const firebaseConfig = {
  apiKey: "AIzaSyC_usX7bipM4WqLk6m-_XFWkoHyHYLbV3E",
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
