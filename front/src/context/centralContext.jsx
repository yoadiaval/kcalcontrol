import { createContext } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";

const CentralContext = createContext();

function CentralProvider({children}){
  
    const { getPersonalInfo } = usePersonalInfoContext();

    const valuesToShare={
        getPersonalInfo,
    }
     return (
       <CentralContext.Provider value={valuesToShare}>
         {children}
       </CentralContext.Provider>
     );
}
export { CentralProvider };
export default CentralContext;