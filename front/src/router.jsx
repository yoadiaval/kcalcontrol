import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy loading de las páginas
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Registro = lazy(() => import("./pages/registro"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/notFound"));

// Lazy loading componentes usados dentro del dashboard
const Dietario = lazy(() => import("./components/dietario"));
const Configuracion = lazy(() => import("./components/configuracion"));
const Biblioteca = lazy(() => import("./components/biblioteca"));
const Evolucion = lazy(() => import("./components/evolucion"));
const Calculadora = lazy(() => import("./components/calculadora"));

// Rutas privadas
import PrivateRoute from "./privateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
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
      </Suspense>
    </Router>
  );
};

export default AppRouter;
