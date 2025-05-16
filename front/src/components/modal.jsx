import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children, title, onClose }) {


    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return ReactDOM.createPortal(
        <div className="fixed w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] z-50 left-0 top-0 ">

            <div className="relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[350px] max-w-[80vw] sm:max-w-[80vw] lg:max-w-[fit-content] bg-white rounded-xl p-6 shadow-2xl">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-gray-500 hover:text-gray-700">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h1 className="mb-1.5">{title}</h1 >

                {children}

            </div>


        </div>,
        document.querySelector(".modal-container")
    )
}

export default Modal;