import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContex";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [loginInfo, setLoginInfo] = useState({
    user: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(loginInfo.user, loginInfo.password);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoginInfo({
        user: "",
        password: "",
      });
      navigate("/dashboard");
    }
  };

  const handleChange = (event) => {
    /*Desagrega el objeto target y lo pasa a las variables de name (input name) y value (valor correspondiente)*/
    const { name, value } = event.target;
    /*Esta funcion permite que se manejen los dos imput a la vez*/
    setLoginInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
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
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
export default Login;
