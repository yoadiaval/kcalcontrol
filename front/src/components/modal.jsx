import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ children, title, onClose }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Evita scroll al abrir el modal
        document.body.classList.add("overflow-hidden");
        // Activa la animación de entrada
        setTimeout(() => setShow(true), 10);

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return ReactDOM.createPortal(
        <div className={`fixed w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] z-50 left-0 top-0 flex items-center justify-center transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>

            <div className={`relative min-w-[350px] max-w-[80vw] sm:max-w-[80vw] lg:max-w-[fit-content] bg-white rounded-xl p-6 shadow-2xl transform transition-all duration-600 ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-10"}`}>
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h1 className="mb-4 text-3xl">{title}</h1>
                {children}
            </div>

        </div>,
        document.querySelector(".modal-container")
    );
}

export default Modal;
