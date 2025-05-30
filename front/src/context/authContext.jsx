import { createContext, useState, useEffect } from "react";
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

  // Configura el interceptor solo una vez cuando el usuario esté autenticado
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Limpiar interceptor al desmontar
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ?? null);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const registro = async (name, surname, email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredentials.user.uid;

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
