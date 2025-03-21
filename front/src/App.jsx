import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./router.jsx";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
