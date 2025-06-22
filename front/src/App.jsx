import { ToastContainer, Bounce } from "react-toastify";
import AppRouter from "./router.jsx";
import './app.css';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        stacked 
      />
    </>
  );
}

export default App;
