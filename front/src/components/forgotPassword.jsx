import { useState } from "react";
import useAuthContext from "../hooks/useAuthContex";
import { toast } from "react-toastify";
function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuthContext();

  const { onChange } = props;
  const handleSubmit = async (event) => {
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
    } 

    setEmail("");
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const goToLogin = () => {
    onChange(false);
  };
  return (
    <>
      <div id="forgotPasswContainer">
        <h1>Restablecer contraseña</h1>
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
    </>
  );
}

export default ForgotPassword;
