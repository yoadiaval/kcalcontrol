import { useContext } from "react";
import PersonalInfoContext from "../context/personalInfoContext";

function usePersonalInfoContext() {
  return useContext(PersonalInfoContext);
}

export default usePersonalInfoContext;
