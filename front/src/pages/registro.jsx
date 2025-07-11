import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../assets/logo-dark.png'
import useCentralContext from "../hooks/useCentralContext";
import { Spin } from "antd";

function Registro() {
  const navigate = useNavigate();
  const { registro } = useCentralContext();
  const [loading, setLoading] = useState(false);
  const [registroInfo, setRegistroInfo] = useState({
    name: "",
    surname:"",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (registroInfo.password !== registroInfo.confirmPassword) {
      toast.error("las contraseñas no coinciden");
      return;
    }
    try {
      await registro(
        registroInfo.name,
        registroInfo.surname,
        registroInfo.email,
        registroInfo.password
      );
      toast.success("Se ha registrado correctamente");
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          toast.error("Ya existe una cuenta asociada a ese email");
          break;
        case "auth/invalid-email":
          toast.error("El email insertado no es válido");
          break;
        case "auth/weak-password":
          toast.error("La contraseña debe tener al menos 6 caracteres");
          break;
        default:
          toast.error("Ha ocurrido un error" + e.code);
          break;
      }
    } finally {
      setRegistroInfo({
        name: "",
        surname:"",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setLoading(false)
      navigate("/login");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistroInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-blue-200">

      <div id="registroContainer">
        
        <img src={logo} className="w-[250px] mx-auto" alt="" />
        <div className="h-[20px] flex justify-center items-center">{loading ? <Spin /> : null}</div>
        <h1 className="text-3xl text-center my-[1rem] font-bold">Registro</h1>
        <div>
          <form onSubmit={handleSubmit} id="registroForm">
            <div className="inputWithEfect ">
              <input
                type="text"
                id="name"
                name="name"
                value={registroInfo.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Inserte su nombre</label>
            </div>
            <div className="inputWithEfect ">
              <input
                type="text"
                id="surname"
                name="surname"
                value={registroInfo.surname}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Inserte sus apellidos</label>
            </div>
            <div className="inputWithEfect ">
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={registroInfo.email}
                required
              />
              <label htmlFor="email">Inserte su email</label>
            </div>
            <div className="inputWithEfect ">
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={registro.password}
                required
              />
              <label htmlFor="password">Inserte una contraseña</label>
              
            </div>
            <div className="inputWithEfect ">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registroInfo.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword">Repetir contraseña</label>
            </div>
            <button type="submit" className="btn-dark">
              Registrarse
            </button>
          </form>
        </div>
        <p>
          Ya tienes una cuentas?{" "}
          <span onClick={goToLogin} className="text-blue-700 cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
export default Registro;
