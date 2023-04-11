import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase.config";


const AuthContext = React.createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children } : any) {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminType, setAdminType] = useState(null);

  function signup(email : string, password : string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email : string, password : string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email : string) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email : string) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password : string) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    adminType,
    setAdminType,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
