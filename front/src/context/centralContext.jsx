import { createContext } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";

const CentralContext = createContext();

function CentralProvider({children}){
  
    const { getPersonalInfo, personalInfo } = usePersonalInfoContext();

    const valuesToShare={
        personalInfo,
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