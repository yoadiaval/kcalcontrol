import { useContext } from "react";
import ComputoContext from "../context/computoContext";

function useComputoContext() {
    return useContext(ComputoContext);
}

export default useComputoContext;
