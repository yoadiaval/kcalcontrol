import { useContext } from "react";
import RegistrosContext from "../context/registrosComidaContext";

function useRegistrosContext() {
    return useContext(RegistrosContext);
}

export default useRegistrosContext;
