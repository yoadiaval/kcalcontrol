import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-toastify";
// import { Spin } from "antd";
import Spin from 'antd/es/spin';
import 'antd/es/spin/style';

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuthContext();

  const { onChange } = props;
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await resetPassword(email);
      toast.success(
        "Revise su bandeja de mensajería y siga las instrucciones"
      );
      onChange(false);
    } catch (e) {
      console.log(e);
      if (e.code == "auth/invalid-email") {
        toast.error("El email insertado no es válido");
      }
    } finally {
      setLoading(false);
      setEmail("");
    }


  };
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const goToLogin = () => {
    onChange(false);
  };
  return (
    <div className="bg-blue-200 w-[100vw] h-[100vh]">
      <div id="forgotPasswContainer">
        <h1 className="text-3xl text-center my-[1rem] font-bold">Restablecer contraseña</h1>
        <div className="h-[20px] flex justify-center items-center">{loading ? <Spin /> : null}</div>
        <p>
          Indicanos tu email para enviarte el enlace de restablecimiento de
          contraseña
        </p>
        <div>
          <form onSubmit={handleSubmit} id="forgotForm">
            <div className="inputWithEfect">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              <label htmlFor="">Inserte su email</label>
            </div>
            <button className="btn-dark">Restablecer</button>
          </form>
        </div>
        <p>
          Regresar a{" "}
          <span className="text-blue-700 cursor-pointer" onClick={goToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
