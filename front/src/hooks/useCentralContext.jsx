import { useContext } from "react";
import CentralContext from "../context/centralContext";

function useCentralContext() {
  return useContext(CentralContext);
}

export default useCentralContext;
