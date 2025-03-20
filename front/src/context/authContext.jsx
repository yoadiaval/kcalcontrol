import {createContext, useState} from 'react';

import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({children}){
const [currentUser, setCurrentUser] = useState(null);

const login = async (email, password)=>{
    const loginInfo =  await signInWithEmailAndPassword(auth,email, password);
    setCurrentUser(loginInfo.user);
}
const logout = () => {
  return signOut(auth);
};

const valuesToShare = {
  currentUser,login,
  logout,
};

return(
    <AuthContext.Provider value={valuesToShare}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContext;
export {AuthProvider}