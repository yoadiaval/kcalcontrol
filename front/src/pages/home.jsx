import { useNavigate } from "react-router-dom";
import AnimationLanding from "../components/animationLanding";
function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={goToLogin}>Login</button>
      <div className="relative">
        <div className="w-[500px] h-[500px] bg-blue-100 absolute rounded-full"></div>
        <div className="w-[100px] h-[100px] bottom-[100px] bg-blue-400 absolute rounded-full"></div>
        <AnimationLanding />
      </div>
      
    </>
  );
}
export default Home;
