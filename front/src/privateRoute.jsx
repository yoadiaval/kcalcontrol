
import { Navigate, Outlet } from "react-router-dom";
import useCentralContext from "./hooks/useCentralContext";


function PrivateRoute() {
  const { currentUser } = useCentralContext();

  if (currentUser == null) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
