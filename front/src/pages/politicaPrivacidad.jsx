import Footer from "../components/footer";
import Header from "../components/header";

function PoliticaPrivacidad() {
  return (
   <>
   <Header/>
          <section className="px-6 py-16 bg-gray-50 min-h-screen">
              <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 leading-loose tracking-wide">
                  <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-900">
                      Política de Privacidad
                  </h1>

                  <p className="mb-6">
                      En <strong>KcalControl</strong>, tu privacidad es una prioridad. Esta política
                      explica cómo recopilamos, utilizamos y protegemos tu información personal
                      cuando utilizas nuestros servicios. Nos regimos por el{" "}
                      <strong>Reglamento General de Protección de Datos (RGPD)</strong> y demás
                      normativa aplicable en España. Nuestro objetivo es ser claros y transparentes
                      contigo en todo momento.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">1. Responsable del tratamiento</h2>
                  <p className="mb-6">
                      El responsable de tus datos es <strong>KcalControl</strong>, con sede en España.
                      Puedes ponerte en contacto con nosotros en cualquier momento enviando un correo a{" "}
                      <a href="mailto:soporte@kcalcontrol.com" className="text-blue-600 underline">
                          soporte@kcalcontrol.com
                      </a>. Nos comprometemos a atender cualquier consulta o solicitud relacionada con
                      tu información personal en un plazo razonable.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">2. Datos que recopilamos</h2>
                  <p className="mb-6">
                      Recopilamos los datos necesarios para ofrecerte un servicio preciso y personalizado.
                      Estos incluyen tu nombre, correo electrónico, género, edad, peso, altura, nivel de
                      actividad física y los alimentos que consumes habitualmente.
                      Además, podemos recopilar datos técnicos como la dirección IP, tipo de navegador y
                      sistema operativo con el fin de mejorar la estabilidad y seguridad de la aplicación.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">3. Finalidad del tratamiento</h2>
                  <p className="mb-6">
                      La información que nos proporcionas se utiliza para gestionar tu cuenta, calcular
                      tus necesidades nutricionales, generar estadísticas personales y ofrecerte un
                      seguimiento claro de tu progreso.
                      También utilizamos los datos para responder a tus consultas y mejorar las funciones
                      de la aplicación, siempre evitando publicidad invasiva y manteniendo un entorno libre
                      de distracciones.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">4. Base legal</h2>
                  <p className="mb-6">
                      La base legal para el tratamiento de tus datos es tu consentimiento expreso al
                      registrarte y la necesidad contractual de prestar el servicio que solicitas.
                      Sin tus datos, no podríamos ofrecerte las funcionalidades clave de KcalControl.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">5. Servicios externos</h2>
                  <p className="mb-6">
                      Trabajamos con <strong>Firebase Auth</strong> (Google LLC) para el registro e inicio
                      de sesión de usuarios, garantizando un proceso seguro y cifrado.
                      También utilizamos <strong>EmailJS</strong> para la gestión de mensajes de contacto
                      enviados desde la aplicación hacia nuestro correo de soporte.
                      Ambos proveedores cumplen con altos estándares de seguridad y protección de datos.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">6. Transferencias internacionales</h2>
                  <p className="mb-6">
                      Algunos datos pueden procesarse en servidores ubicados fuera del Espacio Económico
                      Europeo. Nos aseguramos de que se cumplan las garantías necesarias para que tu
                      información esté protegida, incluyendo el uso de cláusulas contractuales tipo
                      aprobadas por la Comisión Europea.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">7. Conservación de los datos</h2>
                  <p className="mb-6">
                      Tus datos se conservarán mientras tu cuenta permanezca activa o mientras sea
                      necesario para cumplir con obligaciones legales.
                      Si deseas eliminar tu cuenta y toda tu información, puedes solicitarlo en cualquier
                      momento enviando un correo a{" "}
                      <a href="mailto:soporte@kcalcontrol.com" className="text-blue-600 underline">
                          soporte@kcalcontrol.com
                      </a>.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">8. Derechos del usuario</h2>
                  <p className="mb-6">
                      Tienes derecho a acceder, rectificar o eliminar tus datos, así como a limitar u
                      oponerte a su tratamiento. También puedes solicitar la portabilidad de tus datos a
                      otro proveedor.
                      Para ejercer estos derechos, contacta con nosotros a través del correo indicado.
                      Responderemos en un plazo máximo de 30 días.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">9. Seguridad</h2>
                  <p className="mb-6">
                      Implementamos medidas técnicas y organizativas avanzadas para proteger tu información,
                      incluyendo cifrado de contraseñas, comunicación segura mediante HTTPS y controles de
                      acceso internos.
                      No obstante, ninguna plataforma es 100% segura, por lo que también recomendamos que
                      utilices contraseñas únicas y seguras.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">10. Cookies</h2>
                  <p className="mb-6">
                      Utilizamos cookies técnicas esenciales para el correcto funcionamiento de la web.
                      Algunas cookies adicionales pueden emplearse para analizar el uso de la aplicación y
                      mejorar su rendimiento, siempre respetando tu configuración de privacidad.
                  </p>

                  <h2 className="text-2xl font-semibold mt-10 mb-3">11. Cambios en esta política</h2>
                  <p className="mb-6">
                      Nos reservamos el derecho a actualizar esta política para adaptarla a cambios legales
                      o mejoras en el servicio. La fecha de última modificación estará siempre disponible
                      al final de este documento.
                      Te recomendamos revisarla periódicamente para estar al tanto de cualquier actualización.
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

export default PoliticaPrivacidad;