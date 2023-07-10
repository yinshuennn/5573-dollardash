import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyCkF5HnzoHw48U5dKfRwdWOaYDCDGMFVos",
  authDomain: "dollardash-4491f.firebaseapp.com",
  projectId: "dollardash-4491f",
  storageBucket: "dollardash-4491f.appspot.com",
  messagingSenderId: "54139144467",
  appId: "1:54139144467:web:a4651b76e684f432a2f2e6"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db, firebase };