import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forgotEmail, setForgotEmail] = useState("");
  const [updateimgname, setUpdateImgname] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);


  const [dataFetching,setDataFetching] = useState(true);


  // useEffect(() => {
  //   console.log("Redirect Path Updated:", redirectPath);
  // }, [redirectPath]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  function ForgotPassword(email) {
    setForgotEmail(email.current.value);
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
    
  };

  const signInGoogle = (email, password) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [updateimgname]);

  const authInfo = {
    updateimgname,
    setUpdateImgname,
    user,
    loading,
    auth,
    createUser,
    signInGoogle,
    ForgotPassword,
    signIn,
    forgotEmail,
    logOut,
    redirectPath,
    setRedirectPath,
    
    dataFetching,setDataFetching
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
