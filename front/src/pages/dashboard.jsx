import useAuthContext from "../hooks/useAuthContex";
function Dashboard() {
  const { logout, currentUser } = useAuthContext();
  console.log(currentUser);
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
      <button onClick={exit}>Salir</button>
    </>
  );
}
export default Dashboard;
