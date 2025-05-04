import { useNavigate } from "react-router-dom";
import AnimationLanding from "../components/animationLanding";
import logo from '../assets/logo-dark.png'
import home1 from '../assets/home1.jpg'
import home2 from '../assets/home2.jpg'
import home3 from '../assets/home3.jpg';
import useAuthContext from "../hooks/useAuthContex";
function Home() {
  const navigate = useNavigate();
  const {currentUser} = useAuthContext();

  return (
    <div className="px-[4rem] py-[4rem] relative w-[100vw] h-[fit-content]  overflow-x-hidden">
      <div className="w-[600px] h-[600px] absolute bg-[#DBEAFE80] rounded-full top-[-200px] left-[-200px] z-[-1]"></div>
      <div className="w-[600px] h-[600px] absolute bg-[#FFC64D33] rounded-full top-[-300px] left-[200px] z-[-1]"></div>
      <div className="w-[600px] h-[600px] absolute bg-[#66be722a] rounded-full bottom-[-300px] right-[-120px] z-[-1]"></div>
      <header className="sticky flex justify-between items-center ">
        <img src={logo} className="w-[150px]" />
       
          <ul className="flex gap-[1rem] font-bold items-center">
            <li className="cursor-pointer"><span onClick={() => { currentUser ? navigate("/dashboard") : navigate("/login") }}>MI PANEL</span></li>

            {currentUser ? null : <li className="cursor-pointer bg-blue-400 text-white px-[2.5rem] py-[1rem] rounded-full" ><span onClick={() => navigate("/login")}>LOGIN</span></li>}
            {currentUser ? null : <li className="cursor-pointer bg-black text-white px-[2rem] py-[1rem] rounded-full"><span onClick={() => navigate("/registro")}>REGISTRO</span></li>}
          </ul>
      </header>
      <div className="h-[70vh] flex flex-wrap justify-around mt-[60px]">
        <div className="w-[50%] min-w-[540px] flex flex-col items-center  justify-center ">
          <div className="flex flex-col gap-[1.5rem] pl-[3rem]">
            <h1 className="text-7xl">SISTEMA DE  <span className="block"> CONTROL DE CALORÍAS</span></h1>
            <p className="text-3xl">Ahora más cerca de conseguir tu meta. Accede a tu <span className="font-bold">panel </span>y comienza a planificar tu alimentación.</p>
          <button onClick={() => { currentUser ? navigate("/dashboard") : navigate("/login") }} className="w-[fit-content] cursor-pointer mt-[2rem] bg-blue-400 text-white px-[2rem] py-[1rem] rounded-full ">Acceder</button>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center pl-[60px]"><AnimationLanding /></div>
      </div>
    </div>
    
  );
}
export default Home;
