import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const app = firebase.initializeApp({
  apiKey: "AIzaSyDyQTfqumVGwox7xj6NfWbOeNo82JQIx2Q",
  authDomain: "poetic-archway-310017.firebaseapp.com",
  projectId: "poetic-archway-310017",
  storageBucket: "poetic-archway-310017.appspot.com",
  messagingSenderId: "874681059063",
  appId: "1:874681059063:web:a99af73259900841a675f2",
  measurementId: "G-1PC6XXPP8W",
});

export const auth = app.auth();
export default app;
export const db = firebase.firestore();
