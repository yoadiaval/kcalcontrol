import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContex";
function Dashboard() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const exit = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={exit}>Salir</button>
    </>
  );
}
export default Dashboard;
