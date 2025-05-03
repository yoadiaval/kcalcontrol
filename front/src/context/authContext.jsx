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
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import { SERVER_HOST } from "../config";

const AuthContext = createContext();

function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const onAuthChange = onAuthStateChanged(auth, (user) => {
      const usuario = user ? user : null;
      setCurrentUser(usuario);

    });
    return () => onAuthChange();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);

  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const registro = async (name, surname, email, password) => {

    // Crear usuario en Firebase
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredentials.user.uid;

    // Enviar datos a la API de Laravel
    console.log(`${import.meta.env.VITE_SERVER_HOST}/api/usuarios`)
    await axios.post(`${SERVER_HOST}/api/usuarios`, {
      id: userId,
      nombre: name,
      apellidos: surname,
    });


  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };
  const valuesToShare = {
    currentUser,
    login,
    logout,
    registro,
    loginWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={valuesToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
