import useAuthContext from "./hooks/useAuthContex";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useCentralContext from "./hooks/useCentralContext";

function PrivateRoute() {
  const { currentUser } = useAuthContext();
  const {getPersonalInfo} = useCentralContext();
  const [loading, setLoading] = useState(true);

   useEffect(() => {
     const fetchData = async () => {
       const result = await getPersonalInfo();
       if(result){setLoading(false);}
     };
     fetchData();
   }, []);


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
