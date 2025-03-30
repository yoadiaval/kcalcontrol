import useCentralContext from "../hooks/useCentralContext";
import useAuthContext from "../hooks/useAuthContex";
import { useEffect, useState } from "react";

function Dashboard() {
  const { logout, currentUser } = useAuthContext();
  const { getPersonalInfo } = useCentralContext();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();


  useEffect(() => {
    const fetchData = async () => {
     const data= await getPersonalInfo();
     setInfo(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const exit = async () => {
    await logout();
  };
  return (
    <>
      <h1>Dashboard</h1>
      <h2>
        Bienvenido{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email}
      </h2>
      <p>{loading ? "Cargando..." : info.usuario.nombre}</p>
      <button onClick={exit}>Salir</button>
    </>
  );
}
export default Dashboard;
