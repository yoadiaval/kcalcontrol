import { createContext } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";
import useComputoContext from "../hooks/useComputoContext";
import useAlimentosContext from "../hooks/useAlimentosContext";
import useRegistrosContext from "../hooks/useRegistrosComidaContext";

const CentralContext = createContext();

function CentralProvider({ children }) {

  const { getPersonalInfo, setPersonalInfo, userData } = usePersonalInfoContext();
  const { nutriMacros, setNutriMacros, computar } = useComputoContext();
  const { alimentos, getAlimentos, insertarAlimento, editarAlimento, eliminarAlimento, transaccionCrearRegistrarComida } = useAlimentosContext();

  const { registros,
    getRegistros,
    insertarRegistro,
    editarRegistro,
    eliminarRegistro,
    obtenerFechaActual }= useRegistrosContext();

  const valuesToShare = {
    userData,
    getPersonalInfo,
    setPersonalInfo,
    nutriMacros,
    setNutriMacros,
    computar,
    alimentos,
    getAlimentos,
    insertarAlimento,
    editarAlimento,
    eliminarAlimento,
    registros,
    getRegistros,
    insertarRegistro,
    editarRegistro,
    eliminarRegistro,
    transaccionCrearRegistrarComida,
    obtenerFechaActual
  }
  return (
    <CentralContext.Provider value={valuesToShare}>
      {children}
    </CentralContext.Provider>
  );
}
export { CentralProvider };
export default CentralContext;