import { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContex";
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

    if (Object.prototype.hasOwnProperty.call(data, 'nombre')) {
      dataToSend.nombre = data.nombre
    }
    if (Object.prototype.hasOwnProperty.call(data, 'apellidos')) {
      dataToSend.apellidos = data.apellidos
    }
    if (Object.prototype.hasOwnProperty.call(data, 'edad')) {
      dataToSend.edad = data.edad
    }
    if (Object.prototype.hasOwnProperty.call(data, 'genero')) {
      dataToSend.sexo = data.genero
    }
    if (Object.prototype.hasOwnProperty.call(data, 'altura')) {
      dataToSend.altura = data.altura
    }
    if (Object.prototype.hasOwnProperty.call(data, 'objetivo')) {
      dataToSend.objetivo = data.objetivo
    }
    if (Object.prototype.hasOwnProperty.call(data, 'peso')) {
      dataToSend.peso = data.peso
    }
    if (Object.prototype.hasOwnProperty.call(data, 'calorias')) {
      dataToSend.obj_calorias = data.calorias
    }
    if (Object.prototype.hasOwnProperty.call(data, 'proteinas')) {
      dataToSend.obj_proteinas = data.proteinas
    }
    if (Object.prototype.hasOwnProperty.call(data, 'carbohidratos')) {
      dataToSend.obj_carbohidratos = data.carbohidratos
    }
    if (Object.prototype.hasOwnProperty.call(data, 'grasas')) {
      dataToSend.obj_grasas = data.grasas
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
