import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyD1vXl4d0WHvcogL6Ij0mFHgSQ1qFJDo-M",
  authDomain: "jj-web-ed26d.firebaseapp.com",
  projectId: "jj-web-ed26d",
  storageBucket: "jj-web-ed26d.appspot.com",
  messagingSenderId: "940235794742",
  appId: "1:940235794742:web:68419b3d76b31e46c86b97",
  measurementId: "G-HV4P46ZSPP",
});

export const auth = app.auth();
export default app;
