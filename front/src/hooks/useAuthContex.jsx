import { useContext } from "react";
import AuthContext from "../context/authContext";

function useAuthContext() {
  return useContext(AuthContext);
}
export default useAuthContext;
