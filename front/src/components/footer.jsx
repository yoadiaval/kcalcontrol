function Footer(){
    return (
        <footer className="w-full bg-[#1e1e2f] text-white py-8  text-lg">
            <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} KcalControl. Todos los derechos reservados.
                </div>
                <div className="flex gap-6">
                    <a href="/politica-privacidad" className="hover:underline">Política de privacidad</a>
                    <a href="/terminos" className="hover:underline">Términos y condiciones</a>
                   
                </div>
            </div>
        </footer>
   
    )
}

export default Footer;