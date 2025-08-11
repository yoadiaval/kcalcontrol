import { createContext, useState } from "react";

const RegistrosContext = createContext();

function RegistrosProvider({ children }) {
    const [registros, setRegistros] = useState([]);
    
    
    const valuesToShare = {
        registros,
        setRegistros,
     
    }
    return (
        <RegistrosContext.Provider value={valuesToShare}>
            {children}
        </RegistrosContext.Provider>
    );
}

export default RegistrosContext;
export { RegistrosProvider };