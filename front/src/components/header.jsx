import logo from '../assets/logo-dark.png';
import useAuthContext from '../hooks/useAuthContext';
import useCentralContext from "../hooks/useCentralContext";
import { useNavigate } from "react-router-dom";

function Header(){
    const { currentUser } = useCentralContext();
    const { logout } = useAuthContext();
    const navigate = useNavigate();

const handlegout = async () => {
       await logout();
          navigate("/login");
    }

    return (
        <header className="sticky top-0 flex flex-col md:flex-row  justify-between items-center bg-white shadow-md px-4 py-2 z-50">

            <div className="w-[100%] flex justify-center  md:justify-start py-4 lg:justify-center cursor-pointer">
                <figure className="w-[150px]" onClick={() => navigate("/")}>
                    <img src={logo} className="w-[100%]" />
                </figure>
            </div>

            <div className="w-[100%] bg-blue-100 md:bg-transparent">
                <ul className="flex  gap-4 font-semibold items-center justify-center  px-4 py-4  ">

                    <li className="cursor-pointer w-[150px] text-center border border-dotted border-blue-400 rounded-full px-2 py-2">
                        <span onClick={() => { currentUser ? navigate("/dashboard") : navigate("/login") }}>
                            MI PANEL
                        </span>

                    </li>
{currentUser && (
    <li className="cursor-pointer bg-blue-400 text-white px-4 py-2 rounded-full  text-center">
        <span onClick={handlegout}>ACCEDER CON OTRA CUENTA</span>
    </li>
)}

                    {!currentUser && (
                        <li className="cursor-pointer bg-blue-400 text-white px-2 py-2 rounded-full w-[150px]  text-center">
                            <span onClick={() => navigate("/login")}>LOGIN</span>
                        </li>
                    )}

                    {!currentUser && (
                        <li className="cursor-pointer bg-[#1E1E2F] text-white px-2 py-2 rounded-full w-[150px]  text-center">
                            <span onClick={() => navigate("/registro")}>REGISTRO</span>
                        </li>
                    )}
                </ul>
            </div>

        </header>
    )
}

export default Header;