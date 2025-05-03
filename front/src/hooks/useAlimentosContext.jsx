import { useContext } from "react";
import AlimentosContext from "../context/alimentosContext";

function useAlimentosContext() {
    return useContext(AlimentosContext);
}

export default useAlimentosContext;
