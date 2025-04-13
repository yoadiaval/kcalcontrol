import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Registro from "./pages/registro";
import Dashboard from "./pages/dashboard";


import NotFound from "./pages/notFound";

// Rutas privadas
import PrivateRoute from "./privateRoute";
import MainCalculadora from "./components/mainCalculadora";
import MainDietario from "./components/mainDietario";
import MainConfiguracion from "./components/mainConfig";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<MainCalculadora />} />
            <Route path="calculadora" element={<MainCalculadora />} />
            <Route path="dietario" element={<MainDietario />} />
            <Route path="configuracion" element={<MainConfiguracion />} />
          </Route>
        </Route>

        {/* Ruta para manejar 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
