// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// import { firebase } from "firebase";
// import {firebaseui } from 'firebaseui'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApCxLAFSzizC8ZLkR-58KMNPEYtxpcbsg",
  authDomain: "microblogging-project-8a9b2.firebaseapp.com",
  projectId: "microblogging-project-8a9b2",
  storageBucket: "microblogging-project-8a9b2.appspot.com",
  messagingSenderId: "886215506347",
  appId: "1:886215506347:web:271b7d577c677dff17baee",
  measurementId: "G-E8VDZPFH74",
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize the FirebaseUI Widget using Firebase.
// export const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export async function getData(collectionName, db, setStateCb, unsubscribe, order) {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy(order, "desc"));
    await getDocs(q);
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setStateCb(data);
    });
  } catch (err) {
    console.log("error :>> ", err);
  }
}