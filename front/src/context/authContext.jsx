import { createContext, useState } from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  /*Importante, previene efectos no deseados de asincronismo, de no ponerlo
  aun cuando el usuario está logueado al recargar no reconoce que lo esté*/
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onAuthChange = onAuthStateChanged(auth, (user) => {
      const usuario = user ? user : null;

      setCurrentUser(usuario);
      setLoading(false);
    });
    return () => onAuthChange();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      
  };
  const logout = () => {
    return signOut(auth);
  };

  const registro = async (name, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  const valuesToShare = {
    currentUser,
    login,
    logout,
    registro,
    loginWithGoogle,
    loading,
  };

  return (
    <AuthContext.Provider value={valuesToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
