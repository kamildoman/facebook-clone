import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-b6JzNvVXFg29NdH62Y1-7CVauDfdlbY",
  authDomain: "facebook-clone-b54ff.firebaseapp.com",
  projectId: "facebook-clone-b54ff",
  storageBucket: "facebook-clone-b54ff.appspot.com",
  messagingSenderId: "361086269639",
  appId: "1:361086269639:web:c320b5f709eb828f8026e2",
  measurementId: "G-PTCME1M1LC",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
