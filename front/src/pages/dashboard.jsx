import useCentralContext from "../hooks/useCentralContext";
import useAuthContext from "../hooks/useAuthContex";


function Dashboard() {
  const { logout, currentUser } = useAuthContext();
  const { personalInfo } = useCentralContext();
 
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
      <p>{personalInfo.usuario.nombre}</p>
      <button onClick={exit}>Salir</button>
    </>
  );
}
export default Dashboard;
