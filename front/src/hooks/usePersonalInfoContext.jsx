import { useContext } from "react";
import PersonalInfoContext from "../context/personalInfoContex";

function usePersonalInfoContext() {
  return useContext(PersonalInfoContext);
}

export default usePersonalInfoContext;
