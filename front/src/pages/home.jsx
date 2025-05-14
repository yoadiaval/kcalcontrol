import { useNavigate } from "react-router-dom";
import AnimationLanding from "../components/animationLanding";
import logo from '../assets/logo-dark.png'

import useAuthContext from "../hooks/useAuthContex";
function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  return (
    <div className="relative w-full min-w-[360px] md:w-[80vw] md:mx-auto h-[100dvh] flex flex-col overflow-hidden">
      <div className="w-[500px] h-[500px] fixed bg-[#DBEAFE80] rounded-full top-[-200px] left-[-200px] z-[-1]"></div>
      <div className="w-[500px] h-[500px] fixed bg-[#FFC64D33] rounded-full top-[-300px] left-[200px] z-[-1]"></div>
      <div className="w-[500px] h-[500px] fixed bg-[#66be722a] rounded-full bottom-[-300px] right-[-120px] z-[-1]"></div>
      <header className="sticky flex flex-col md:flex-row  justify-between items-center ">

        <div className="w-[100%] flex justify-center md:justify-start py-4">
          <figure className="w-[150px]">
            <img src={logo} className="w-[100%]" />
          </figure>
        </div>

        <div className="w-[100%] bg-blue-100 md:bg-transparent">
          <ul className="flex  gap-4 font-semibold items-center justify-center  px-4 py-4  ">

            <li className="cursor-pointer w-[150px] text-center">
              <span onClick={() => { currentUser ? navigate("/dashboard") : navigate("/login") }}>
                MI PANEL
              </span>
            </li>

            {!currentUser && (
              <li className="cursor-pointer bg-blue-400 text-white px-2 py-2 rounded-full w-[150px]  text-center">
                <span onClick={() => navigate("/login")}>LOGIN</span>
              </li>
            )}

            {!currentUser && (
              <li className="cursor-pointer bg-black text-white px-2 py-2 rounded-full w-[150px]  text-center">
                <span onClick={() => navigate("/registro")}>REGISTRO</span>
              </li>
            )}
          </ul>
        </div>

      </header>
      <div className=" flex flex-1 mt-[60px] flex-col lg:flex-row justify-center items-center gap-[50px]  ">
        <div className="w-[50%] min-w-[340px] flex flex-col  ">
          <div className="flex flex-col gap-[1.5rem] items-center lg:items-start">
            <h1 className="font-bold text-center lg:text-left text-[32px] lg:text-[60px]">SISTEMA DE   CONTROL DE CALORÍAS</h1>
            <p className="text-gray-500 text-center lg:text-left text-2xl" >Ahora más cerca de conseguir tu meta. Accede a tu <span className="font-bold">panel </span>y comienza a planificar tu alimentación.</p>
            <button onClick={() => { currentUser ? navigate("/dashboard") : navigate("/login") }} className="cursor-pointer bg-blue-400 text-white px-2 py-2 rounded-full w-[150px]   font-bold">Acceder</button>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center "><AnimationLanding /></div>
      </div>
    </div>

  );
}
export default Home;
