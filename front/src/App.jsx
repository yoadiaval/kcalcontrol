import { ToastContainer } from "react-toastify";
import AppRouter from "./router.jsx";
import './app.css';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
