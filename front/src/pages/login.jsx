import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../hooks/useAuthContex";

function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuthContext();
  const [loginInfo, setLoginInfo] = useState({
    user: "",
    password: "",
    recordar: false,
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setLoginInfo({
        user: storedUsername,
        password: storedPassword,
        recordar: true,
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(loginInfo.user, loginInfo.password);
      toast.success("Ha iniciado sesión correctamente");
      navigate("/dashboard");
    } catch (e) {
      if (e.code == "auth/invalid-credential") {
        toast.error("Credenciales no válidas");
      }
    } finally {
      if (loginInfo.recordar) {
        localStorage.setItem("username", loginInfo.user);
        localStorage.setItem("password", loginInfo.password);
      } else {
        // Si no está marcado, eliminar los datos del localStorage

        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
      setLoginInfo({
        user: "",
        password: "",
        recordar: false,
      });
    }
  };

  const goGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Ha iniciado sesión correctamente");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Ha ocurrido un error: " + e.code);
    } 
  };
  const handleChange = (event) => {
    /*Desagrega el objeto target y lo pasa a las variables de name (input name) y value (valor correspondiente)*/
    const { name, value, type, checked } = event.target;
    /*Esta funcion permite que se manejen los dos imput a la vez*/
    setLoginInfo((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };


  const goToRegistro =()=>{
    navigate("/registro")
  }
  const goToInicio = () => {
    navigate("/");
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Usuario</label>
        <input
          type="email"
          id="user"
          name="user"
          onChange={handleChange}
          value={loginInfo.user}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={loginInfo.password}
        />
        <input
          type="checkbox"
          name="recordar"
          onChange={handleChange}
          checked={loginInfo.recordar}
        />
        <button type="submit">Enviar</button>
      </form>
      <button onClick={goGoogle}>Google</button>
      <button onClick={goToRegistro}>Registrar</button>
      <button onClick={goToInicio}>Volver a la página de inicio</button>
    </>
  );
}
export default Login;
