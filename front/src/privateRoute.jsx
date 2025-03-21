import useAuthContext from "./hooks/useAuthContex";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { currentUser, loading } = useAuthContext();

  if (loading) {
    // Mientras Firebase esté verificando el estado de autenticación
    return <div>Loading...</div>; // Puedes personalizar esta parte con un spinner, barra de progreso, etc.
  }

  if (currentUser == null) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
