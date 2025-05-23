import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Registro from "./pages/registro";
import Dashboard from "./pages/dashboard";


import NotFound from "./pages/notFound";

// Rutas privadas
import PrivateRoute from "./privateRoute";
import Calculadora from "./components/calculadora";
import Dietario from "./components/dietario";
import Configuracion from "./components/configuracion";
import Biblioteca from "./components/biblioteca";
import Evolucion from "./components/evolucion";

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
            <Route index element={<Calculadora />} />
            <Route path="calculadora" element={<Calculadora />} />
            <Route path="dietario" element={<Dietario />} />
            <Route path="alimentos" element={<Biblioteca />} />
            <Route path="evolucion" element={<Evolucion />} />
            <Route path="configuracion" element={<Configuracion />} />

          </Route>
        </Route>

        {/* Ruta para manejar 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
