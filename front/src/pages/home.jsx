import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={goToLogin}>Login</button>
    </>
  );
}
export default Home;
