import { createContext } from "react";
import { useEffect, useState } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";
import useComputoContext from "../hooks/useComputoContext";
import useAlimentosContext from "../hooks/useAlimentosContext";
import useRegistrosContext from "../hooks/useRegistrosComidaContext";
import useAuthContext from "../hooks/useAuthContext";

const CentralContext = createContext();

function CentralProvider({ children }) {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [simplificarAside, setSimplificarAside] = useState(false);

  const { currentUser,
    login,
    logout,
    registro,
    loginWithGoogle,
    resetPassword, } = useAuthContext();
  const { getPersonalInfo, setPersonalInfo, userData } = usePersonalInfoContext();
  const { nutriMacros, setNutriMacros, computar } = useComputoContext();
  const { alimentos, getAlimentos, insertarAlimento, editarAlimento, eliminarAlimento, transaccionCrearRegistrarComida } = useAlimentosContext();

  const { registros,
    getRegistros,
    insertarRegistro,
    editarRegistro,
    eliminarRegistro,
    obtenerFechaActual,
    getRegistrosPorRangoFechas,
    registrosPorPeriodo } = useRegistrosContext();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      }
      if (window.innerWidth > 768) {
        setIsMobile(false)
      }
      if (window.innerWidth <= 1024) {
        setSimplificarAside(true);

      }
      if (window.innerWidth > 1024) {
        setSimplificarAside(false);
      }

    };

    // Ejecutar al montar
    handleResize();

    // Escuchar cambios
    window.addEventListener('resize', handleResize);

    // Limpiar evento al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);






  const valuesToShare = {
    currentUser,
    login,
    logout,
    registro,
    loginWithGoogle,
    resetPassword,


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
    obtenerFechaActual,
    isMobile,
    setIsMobile,
    simplificarAside,
    setSimplificarAside,
    getRegistrosPorRangoFechas,
    registrosPorPeriodo
  }
  return (
    <CentralContext.Provider value={valuesToShare}>
      {children}
    </CentralContext.Provider>
  );
}
export { CentralProvider };
export default CentralContext;