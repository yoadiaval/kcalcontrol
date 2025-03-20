import useAuthContext from "./hooks/useAuthContex";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
