import { createContext, useState } from "react";


const AlimentosContext = createContext();

function AlimentosProvider({ children }) {
    const [alimentos, setAlimentos] = useState([]);
    

    const valuesToShare = {
        alimentos,
        setAlimentos,
    }
    return (
        <AlimentosContext.Provider value={valuesToShare}>
            {children}
        </AlimentosContext.Provider>
    );
}

export default AlimentosContext;
export { AlimentosProvider };