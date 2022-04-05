import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5Utq0iOYnGfifwEQ1QB3N49IqlJE_YV4",
  authDomain: "fyp-techmall-register.firebaseapp.com",
  projectId: "fyp-techmall-register",
  storageBucket: "fyp-techmall-register.appspot.com",
  messagingSenderId: "454500090229",
  appId: "1:454500090229:web:79db885b31a486692dd33c",
  measurementId: "G-BJE4FXX73F"
};



firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider =
  new firebase.auth.GoogleAuthProvider();
//  new firebase.auth.googleAuthProvider();

//export { auth, googleAuthProvider };
