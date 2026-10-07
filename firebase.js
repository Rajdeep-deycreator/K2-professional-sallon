// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWIYNI3ttneqI-aixCmM2LI7ASvqo9Pxc",
  authDomain: "k2-professional-sallon.firebaseapp.com",
  projectId: "k2-professional-sallon",
  storageBucket: "k2-professional-sallon.firebasestorage.app",
  messagingSenderId: "502467861652",
  appId: "1:502467861652:web:ee7762ea4f005afcc3e881",
  measurementId: "G-H552XWDGCT"
};

firebase.initializeApp(firebaseConfig)
const db=firebase.firestore()
const auth=firebase.auth()
const analytics= firebase.analytics()
