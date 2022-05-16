import React, { useEffect, useState } from "react";
import { auth, db, googleAuthProvider } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { addDoc, collection,  getDocs, query, setDoc, where } from "firebase/firestore";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  // subscribe the activeUser on mount;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setActiveUser(user);
      setIsAuthLoading(false);
    });
    return () => { unsubscribe();}
  }, []);

  async function handleLoginWithEmail(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);

    navigate("/home");
  }

  async function handleLoginWithGoogle() {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;
    if (!user.displayName) {
      user.displayName = "anonymous user";
    }
    // check if "users" database has this google account, if  no, add "user"(maybe try set(),exist)
    const querySnapshot = await getDocs(collection(db, "users"));
    const check = querySnapshot.docs.find(
      (doc) => doc.data().userId === user.uid
    );
    if (!check) {
      AddNewUserToCollection(user, user.displayName);
      }
      navigate("/home");
    }

    async function handleSignUpWithEmail(email, password, name) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (!name) { name = "anonymous user"; }
      await updateProfile(user, { displayName: name });
      AddNewUserToCollection(user, name);
      navigate("/home");
    }

    async function AddNewUserToCollection(user, name) {
      const newUserObj = {
        userId: user.uid,
        userName: name,
      };
      console.log(newUserObj);
      try {
        const docRef = await addDoc(collection(db, "users"), newUserObj);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    async function handleUpdateDisplayName(user, updatedName) {
      // update current user's displayName:
      await updateProfile(user, { displayName: updatedName });
      // update "user" collection userName:
      const q = query(collection(db, 'users'), where("userId", "==", user.uid))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setDoc(doc.ref, { userName: updatedName }, { merge: true });
      });
    }


    async function handleLogout() {
      try {
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
    }
    
    return (
      <AuthContext.Provider
        value={{
          activeUser,
          onLoginWithEmail: handleLoginWithEmail,
          onLoginWithGoogle: handleLoginWithGoogle,
          onLogout: handleLogout,
          onSignUpWithEmail: handleSignUpWithEmail,
          onUpdateDisplayName: handleUpdateDisplayName,
        }}
      >
        {!isAuthLoading && children}
      </AuthContext.Provider>
    );
    
  }
export default AuthProvider;
