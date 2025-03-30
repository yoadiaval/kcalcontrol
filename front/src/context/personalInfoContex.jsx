import { createContext } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContex";

const PersonalInfoContext = createContext();

function PersonalInfoProvider({ children }) {

  const { currentUser } = useAuthContext();

  const getPersonalInfo = async () => {
    if (!currentUser) return;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/usuarios/${currentUser.uid}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };


  const valuesToShare = {
    getPersonalInfo
  };
  
  return (
    <PersonalInfoContext.Provider value={valuesToShare}>
      {children}
    </PersonalInfoContext.Provider>
  );
}

export default PersonalInfoContext;
export { PersonalInfoProvider };
