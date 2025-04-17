import { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContex";

const PersonalInfoContext = createContext();

function PersonalInfoProvider({ children }) {
  const [userData, setUserData] = useState();

  const { currentUser } = useAuthContext();

  const getPersonalInfo = async () => {
    if (!currentUser) return false;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/usuarios/${currentUser.uid}`
      );
       setUserData(response.data);
      return true;
    } catch (e) {
      console.error(e);
    }
  };

  const setPersonalInfo=(data)=>{
    if (!currentUser) return false;
    

  }

  const valuesToShare = {
    userData,
    getPersonalInfo,
    setPersonalInfo
  };

  return (
    <PersonalInfoContext.Provider value={valuesToShare}>
      {children}
    </PersonalInfoContext.Provider>
  );
}

export default PersonalInfoContext;
export { PersonalInfoProvider };
