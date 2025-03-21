import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../hooks/useAuthContex";

function Registro() {
  const navigate = useNavigate();
  const { registro } = useAuthContext();
  const [registroInfo, setRegistroInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (registroInfo.password !== registroInfo.confirmPassword) {
      toast.error("las contraseñas no coinciden");
      return;
    }
    try {
      await registro(
        registroInfo.name,
        registroInfo.email,
        registroInfo.password
      );
      toast.success("Se ha registrado correctamente");
    } catch (e) {
      if (e.code) {
        toast.error("Ha ocurrido un error");
      }
    } finally {
      setRegistroInfo({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
    <>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={registroInfo.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={registroInfo.email}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={registro.password}
        />
        <label htmlFor="confirmPassword">Repetir contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={registroInfo.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      <button onClick={goToLogin}>Login</button>
    </>
  );
}
export default Registro;
