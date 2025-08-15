import { useNavigate } from "react-router-dom";
import AnimationLanding from "../components/animationLanding";
import useCentralContext from "../hooks/useCentralContext";

import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useCentralContext();

  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSend((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const form = useRef();

  const sendEmail = async (event) => {
    setLoading(true)
    event.preventDefault();
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    // Obtener el email del formulario
    const email = form.current.email.value;

    if (!validateEmail(email)) {
      alert("Correo electrónico no válido");
      return;
    }

    await emailjs
      .sendForm("service_wjmdt4t", "template_ehzt8oc", form.current, {
        publicKey: "Pd6Wrc0bxX2PdomWI",
      })
      .then(
        () => {

          setSend({
            name: "",
            email: "",
            message: "",
          });
          setTimeout(() => {
            toast.success("El mensaje se ha enviado con éxito!");
          }, 1);
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );

    setLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen min-w-[360px] flex flex-col gap-[80px] bg-white scroll md:overflow-y-scroll overflow-x-hidden max-w-[100vw] leading-relaxed">
      {/* Fondos decorativos */}
      <div className="w-[400px] h-[400px] fixed bg-[#DBEAFE80] rounded-full top-[-120px] left-[-120px] z-[-1]" />
      <div className="w-[400px] h-[400px] fixed bg-[#FFC64D33] rounded-full top-[-200px] left-[180px] z-[-1]" />
      <div className="w-[400px] h-[400px] fixed bg-[#66be722a] rounded-full bottom-[-200px] right-[-80px] z-[-1]" />

      {/* Header */}
     <Header/>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-center  py-14 w-full md:w-[80%] mx-auto">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-10">
          <h1 className="font-bold text-center lg:text-left text-5xl md:text-5xl  text-blue-900 leading-tight">
            Controla tus macros sin complicaciones ni distracciones
          </h1>
          <h2 className="text-2xl md:text-2xl text-gray-700 text-center lg:text-left font-medium leading-snug">
            La web minimalista y personalizable para registrar tus macros diarios. Sin catálogos, sin ruido, solo tus datos y control total.
          </h2>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full  text-xl md:text-2xl">
            {[
              "Simple y rápida: registra tus macros en segundos",
              "100% personalizable: tú decides qué comer y cómo calcular",
              "Sin catálogos predefinidos: cero ruido, solo tus datos",
              "Privacidad total: tus datos son tuyos, sin publicidad invasiva",
              "Evolución clara: seguimiento sencillo de tus progresos"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-2 text-base  font-bold">✓</span>
                {text}
              </li>
            ))}
          </ul>
          <button
            onClick={() => { currentUser ? navigate("/dashboard") : navigate("/login") }}
            className="mt-8 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-2xl shadow transition-all"
          >
            Accede gratis
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mb-[60px] md:mb-0 lg:justify-end ">
          <AnimationLanding />
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="w-full md:max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 text-center pb-12">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-lg md:text-xl">
          {[
            "Calcula tus calorías y macros en segundos. Solo ingresa tu género, peso, edad nivel de actividad física y objetivo.",
            "Añade tus propios alimentos. Sin catálogos, sin sugerencias, solo lo que tú consumes.",
            "Registra tus comidas en segundos. Personaliza cantidades y repite tus favoritos.",
            "Visualiza tu progreso de forma clara y sencilla. Sin sobrecarga de datos, siempre bajo tu control."
          ].map((text, index) => (
            <div key={index} className="bg-blue-50 rounded-xl p-8 flex flex-col items-center shadow">
              <span className="text-blue-500 text-4xl font-bold mb-4">{index + 1}</span>
              <p className="text-center text-gray-700 font-medium">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filosofía */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 text-center pb-8">
          Filosofía Kcal Control
        </h2>
        <p className="text-gray-700 text-center text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10 font-bold">
          En Kcal Control creemos que la clave está en
          <span className="font-semibold "> progresar cada día</span>,
          no en perseguir una perfección imposible.
        </p>
        <ul className="max-w-2xl mx-auto space-y-5 text-gray-700 text-lg md:text-xl leading-relaxed bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl shadow-sm">
          <li><span className="text-blue-700 font-medium">Menos tiempo</span> pensando y planificando, más tiempo actuando.</li>
          <li><span className="text-blue-700 font-medium">Sin distracciones</span>: no hay notificaciones molestas ni funciones innecesarias.</li>
          <li><span className="text-blue-700 font-medium">Registro simple</span> para evitar saturación y abandono.</li>
          <li><span className="text-blue-700 font-medium">Diseñada para adaptarse</span> a tu rutina, no para dominarla.</li>
        </ul>
        <div className="relative text-blue-700 font-semibold text-center mt-12 text-xl md:text-2xl italic max-w-2xl mx-auto">
        
          "La forma más simple y libre de controlar tus macros."
         
        </div>
      </section>

      {/* Diferencias */}
      <section className="bg-blue-50 w-full mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 text-center pb-8">
          ¿Qué nos diferencia?
        </h2>
        <div className="max-w-2xl mx-auto grid gap-8 text-lg md:text-xl">
          {[
            "No te abrumamos con información innecesaria.",
            "No hay miles de dietas ni recetas forzadas.",
            "Solo una herramienta sencilla para contar lo que realmente comes.",
            "Adaptada a ti, no a modas ni tendencias."
          ].map((text, index) => (
            <div key={index} className="flex items-start gap-4 bg-white shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold text-lg">
                ✓
              </span>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
        <div className="relative text-blue-700 font-semibold text-center mt-12 text-xl md:text-2xl italic max-w-2xl mx-auto">
          "Lo justo para lograr tu objetivo, nada más."
        </div>
      </section>

      {/* Precisión */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16 relative overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 text-center pb-8">
          Precisión y confianza
        </h2>
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-4">
          <p className="text-gray-700 text-xl md:text-2xl leading-relaxed max-w-2xl ">
            <strong>Amamos la simplicidad</strong>… pero no jugamos con los números.
            Nuestra calculadora se basa en <strong >fórmulas científicas reconocidas</strong> como
            <strong > Mifflin-St Jeor</strong> y
            <strong > Harris-Benedict</strong>
            para estimar <strong>tus necesidades reales</strong> de calorías y macros.
          </p>
          <button
            className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-2xl shadow transition-all"
            onClick={() => window.location.href = "/como-calculamos"}>
            ¡Quiero ver cómo lo calculan!
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 text-center pb-12">Preguntas frecuentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg md:text-xl">
          {[
            {
              q: "¿Puedo escanear código de barras de mis alimentos?",
              a: "Sí, gracias a una API externa. Al escanear un producto, podrás verificar si existe en la base de datos..."
            },
            {
              q: "¿Tengo que pagar suscripción?",
              a: "No, la app es gratuita. Pero puedes apoyarnos usando nuestros enlaces de referidos..."
            },
            {
              q: "¿Mis datos están seguros?",
              a: "Tus datos son solo tuyos. No los compartimos ni los usamos para publicidad..."
            },
            {
              q: "¿Puedo ajustar mis macros según mis objetivos?",
              a: "Por supuesto. Puedes modificar tus objetivos y macros en cualquier momento..."
            }
          ].map((item, index) => (
            <div key={index} className="bg-blue-50 rounded-xl p-8 shadow">
              <h3 className="font-bold text-blue-700 pb-4 text-2xl md:text-3xl">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 text-center pb-10">
          Sobre nosotros
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start text-lg md:text-xl lg:text-2xl">
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              <span >Kcal Control</span> nació con una idea clara:
              ofrecer una herramienta para quienes valoran la <strong>practicidad sobre la perfección</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Creemos que cuidar tu alimentación no debería ser complicado ni consumir más tiempo del necesario.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nos encanta escuchar a nuestra comunidad: envíanos tus dudas, sugerencias o reseñas.
              Cada mensaje nos ayuda a mejorar.
            </p>
          </div>
          <form ref={form} onSubmit={sendEmail} className="bg-gray-50 rounded-xl p-8 shadow-sm flex flex-col gap-6">
            <input
              type="text"
              name="name"
              id="name"
              value={send.name}
              onChange={handleChange} // <-- aquí
              placeholder="Tu nombre"
              className="border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              value={send.email}
              onChange={handleChange} // <-- aquí
              placeholder="Tu correo"
              className="border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <textarea
              placeholder="Tu mensaje"
              name="message"
              id="message"
              value={send.message}
              onChange={handleChange} // <-- aquí
              rows={4}
              className="border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow transition-all text-lg">
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
       </div >
  );
}

export default Home;
 