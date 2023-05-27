// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkF5HnzoHw48U5dKfRwdWOaYDCDGMFVos",
  authDomain: "dollardash-4491f.firebaseapp.com",
  projectId: "dollardash-4491f",
  storageBucket: "dollardash-4491f.appspot.com",
  messagingSenderId: "54139144467",
  appId: "1:54139144467:web:a4651b76e684f432a2f2e6"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };