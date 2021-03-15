import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  //for login authentication 
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  //for logout 
  function logout(){
      return auth.signOut();
  }
  //for reset password
  function resetPassword(email){
      return auth.sendPasswordResetEmail(email);

  }
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
