import { createContext } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";
import useComputoContext from "../hooks/useComputoContext";

const CentralContext = createContext();

function CentralProvider({children}){
  
    const { getPersonalInfo, setPersonalInfo, userData } = usePersonalInfoContext();
  const { nutriMacros, computar } = useComputoContext();

    const valuesToShare={
        userData,
        getPersonalInfo,
      setPersonalInfo,
        nutriMacros, 
        computar
    }
     return (
       <CentralContext.Provider value={valuesToShare}>
         {children}
       </CentralContext.Provider>
     );
}
export { CentralProvider };
export default CentralContext;