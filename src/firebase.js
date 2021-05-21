import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const app = firebase.initializeApp({
//   apiKey: "AIzaSyD1vXl4d0WHvcogL6Ij0mFHgSQ1qFJDo-M",
//   authDomain: "jj-web-ed26d.firebaseapp.com",
//   projectId: "jj-web-ed26d",
//   storageBucket: "jj-web-ed26d.appspot.com",
//   messagingSenderId: "940235794742",
//   appId: "1:940235794742:web:68419b3d76b31e46c86b97",
//   measurementId: "G-HV4P46ZSPP",
// });
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
