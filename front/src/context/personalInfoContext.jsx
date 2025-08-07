import { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import { SERVER_HOST } from "../config";


const PersonalInfoContext = createContext();

function PersonalInfoProvider({ children }) {
  const [userData, setUserData] = useState();

  const { currentUser } = useAuthContext();

  const getPersonalInfo = async () => {
    if (!currentUser) return false;
    try {
      const response = await axios.get(
        `${SERVER_HOST}/api/usuarios/${currentUser.uid}`
      );
      console.log(currentUser.uid); 
      console.log(`${SERVER_HOST}/api/usuarios/${currentUser.uid}`)
      setUserData(response.data);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
    
  };

  const setPersonalInfo = async (data) => {
    if (!currentUser) return false;

    const dataToSend = {}

    const keyMap = {
      nombre: "nombre",
      apellidos: "apellidos",
      edad: "edad",
      genero: "sexo",
      altura: "altura",
      objetivo: "objetivo",
      peso: "peso",
      actividad: "nivel_actividad",
      calorias: "obj_calorias",
      proteinas: "obj_proteinas",
      carbohidratos: "obj_carbohidratos",
      grasas: "obj_grasas",
    };

    for (const key in keyMap) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        dataToSend[keyMap[key]] = data[key];
      }
    }

    console.log(dataToSend)

    try {
      await axios.patch(
        `${SERVER_HOST}/api/usuarios/${currentUser.uid}`, dataToSend
      );
      await getPersonalInfo();
    } catch (e) {
      console.error(e);
      return false;
    }

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
