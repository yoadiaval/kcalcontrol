import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/forgotPassword";
import { toast } from "react-toastify";
import logo from '../assets/logo-dark.png'
import useCentralContext from "../hooks/useCentralContext";
import { Spin } from "antd";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useCentralContext();
  const [loginInfo, setLoginInfo] = useState({
    user: "",
    password: "",
    recordar: false,
  });
  const [resetPassword, setResetPassword] = useState(false);

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
    setLoading(true);
    event.preventDefault();
    try {
      await login(loginInfo.user, loginInfo.password);
      toast.success("Ha iniciado sesión correctamente");
      navigate("/dashboard");
    } catch (e) {
      if (e.code == "auth/invalid-email") {
        toast.error("El email insertado no es válido");
      }
      if (e.code == "auth/invalid-credential") {
        toast.error("Credenciales no válidas");
      }
    } finally {
      if (loginInfo.recordar) {
        localStorage.setItem("username", loginInfo.user);
        localStorage.setItem("password", loginInfo.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
      setLoginInfo({
        user: "",
        password: "",
        recordar: false,
      });
      setLoading(false);
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

  const goToRegistro = () => {
    navigate("/registro");
  };
  const goToInicio = () => {
    navigate("/");
  };

  const goToReset = () => {
    setResetPassword(true);
  };

  return resetPassword ? (
    <ForgotPassword onChange={setResetPassword} />
  ) : (
    <div className="w-[100vw] h-[100vh] bg-blue-200">
      {" "}
      <div id="loginContainer" >
        <img src={logo} alt="" className="w-[250px] mx-auto" />
        <div className="h-[20px] flex justify-center items-center">{loading ? <Spin /> : null}</div>
        <h1 className="text-3xl text-center my-[1rem] font-bold">Login</h1>
        <form onSubmit={handleSubmit} id="loginForm">
          <div className="inputWithEfect">
            <input
              type="text"
              id="user"
              name="user"
              onChange={handleChange}
              value={loginInfo.user}
              required
            />
            <label for="user">Inserte su email</label>
          </div>
          <div className="inputWithEfect">
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={loginInfo.password}
              required
            />
            <label for="password">Inserte su contraseña</label>
          </div>
          <div className="flex place-content-between px-3">
            <div className="flex gap-1">
              <input
                type="checkbox"
                name="recordar"
                onChange={handleChange}
                checked={loginInfo.recordar}
              />
              <label for="recordar">Recordar</label>
            </div>
            <p>
              Has olvidado tu contraseña?
              <span onClick={goToReset} className="text-sky-700 cursor-pointer">
                {" "}
                Restablecer
              </span>
            </p>
          </div>
          <button type="submit" className="btn-dark">
            Continuar
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <div className="flex items-center gap-2 ">
            <hr className="w-[100px]" />
            <p>o continúa con</p>
            <hr className="w-[100px]" />
          </div>
        </div>
        <button onClick={goGoogle} className="btn-clear">
          Google
        </button>
        <p>
          Aún no tienes cuenta?{" "}
          <span onClick={goToRegistro} className="text-sky-700 cursor-pointer">
            Registrar
          </span>
        </p>
        <p onClick={goToInicio} className="cursor-pointer text-sky-700 font-bold">
          Regresar a Inicio
        </p>{" "}
      </div>
    </div>
  );
}
export default Login;
