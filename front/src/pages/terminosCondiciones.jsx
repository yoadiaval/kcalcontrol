import Header from "../components/header";
import Footer from "../components/footer";

function TerminosCondiciones() {
  return (
    <>
    <Header/>
          <section className="px-6 py-16 bg-gray-50 min-h-screen">
              <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 leading-loose tracking-wide">
                  <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-900">
                      Términos y Condiciones
                  </h1>

                  <p className="mb-6">
                      Bienvenido a <strong>KcalControl</strong>. Estos Términos y Condiciones regulan
                      el uso de nuestra aplicación y servicios. Al registrarte o utilizar la plataforma,
                      aceptas cumplir con lo aquí establecido. Te recomendamos leer este documento con
                      atención antes de continuar.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">1. Objeto del servicio</h2>
                  <p className="mb-6">
                      <strong>KcalControl</strong> es una aplicación gratuita que permite registrar y
                      hacer seguimiento de tus macronutrientes, calorías y hábitos alimenticios de forma
                      sencilla. Ofrecemos herramientas de cálculo y análisis personalizadas, sin
                      catálogos predefinidos y sin publicidad invasiva, salvo posibles enlaces de
                      referidos claramente identificados.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">2. Registro y cuenta de usuario</h2>
                  <p className="mb-6">
                      Para utilizar ciertas funciones, deberás crear una cuenta a través de{" "}
                      <strong>Firebase Auth</strong>. Es responsabilidad del usuario proporcionar datos
                      reales, mantener la confidencialidad de sus credenciales y notificar
                      inmediatamente cualquier uso no autorizado de su cuenta.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">3. Uso permitido</h2>
                  <p className="mb-6">
                      Te comprometes a utilizar la aplicación de manera lícita, sin infringir la
                      legislación vigente ni los derechos de terceros. Queda prohibido el uso de
                      <strong> KcalControl</strong> para difundir contenido ilícito, ofensivo o que
                      pueda dañar el funcionamiento del servicio.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">4. Propiedad intelectual</h2>
                  <p className="mb-6">
                      Todo el contenido de la aplicación, incluyendo logotipos, textos, gráficos,
                      animaciones y diseño, pertenece a <strong>KcalControl</strong> o a sus
                      licenciantes, y está protegido por las leyes de propiedad intelectual e
                      industrial. No se concede ninguna licencia ni derecho de uso más allá de lo
                      estrictamente necesario para el funcionamiento del servicio.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">5. Enlaces externos y referidos</h2>
                  <p className="mb-6">
                      La aplicación puede contener enlaces a sitios de terceros mediante programas de
                      afiliados o referidos. No nos hacemos responsables del contenido, políticas o
                      prácticas de dichos sitios, y el acceso será bajo tu propia responsabilidad.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">6. Responsabilidad</h2>
                  <p className="mb-6">
                      Aunque nos esforzamos por ofrecer un servicio estable y seguro, <strong>KcalControl</strong>{" "}
                      no garantiza la disponibilidad continua del mismo, ni se hace responsable de daños
                      derivados de interrupciones, errores o pérdida de datos. La información
                      nutricional calculada es orientativa y no sustituye la consulta con un profesional
                      de la salud.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">7. Modificaciones del servicio</h2>
                  <p className="mb-6">
                      Nos reservamos el derecho de modificar, suspender o interrumpir el servicio, total
                      o parcialmente, en cualquier momento y sin previo aviso. En caso de cambios
                      relevantes, informaremos a los usuarios a través de la aplicación o por correo
                      electrónico.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">8. Protección de datos</h2>
                  <p className="mb-6">
                      El tratamiento de tus datos personales se realiza conforme a nuestra{" "}
                      <a href="/politica-privacidad" className="text-blue-600 underline">
                          Política de Privacidad
                      </a>. Al utilizar la aplicación, aceptas dicho tratamiento y la transferencia
                      internacional de datos a nuestros proveedores de servicios, en las condiciones
                      descritas.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">9. Legislación aplicable y jurisdicción</h2>
                  <p className="mb-6">
                      Estos Términos y Condiciones se rigen por la legislación española. Cualquier
                      conflicto o reclamación será resuelto por los tribunales competentes del
                      domicilio del usuario, siempre que la ley aplicable lo permita.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">10. Contacto</h2>
                  <p className="mb-6">
                      Si tienes dudas, sugerencias o reclamaciones relacionadas con estos Términos y
                      Condiciones, puedes ponerte en contacto con nosotros enviando un mensaje desde el formulario de la página principal.
                  </p>

                  <p className="mt-12 text-sm text-gray-500 italic">
                      Última actualización: 13 de agosto de 2025
                  </p>
              </div>
          </section>
    <Footer/>
      </>
  );
}

export default TerminosCondiciones;
