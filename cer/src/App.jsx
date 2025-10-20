import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Redux
import { obtenTotal, obtenerCantidadesDelLocal } from "./redux/slices/carrito";

// Páginas y componentes
import Home from "./pages/homePage/Home";
import RepuestosVw from "./components/RepuestosVw/RepuestosVw";
import RepuestosFiat from "./components/RepuestosFiat/RepuestosFiat";
import RepuestosPeugeot from "./components/RepuestosPeugeot/RepuestosPeugeot";
import RepuestosCitroen from "./components/RepuestosCitroen/RepuestosSK";
import RepuestosMb from "./components/RepuestosMb/RepuestosMb";
import RouteCarrito from "./components/RouteCarrito/RouteCarrito";
import WhatsAppInfo from "./components/WhatsApp/WhatsApp";
import NavBari from "./components/navBar/NavBar";
import Productos from "./components/RepuestosRenault/Productos";
import RepuestosSK from "./components/RepuestosCitroen/RepuestosSK";
import ModuloPagos from "./pages/ModuloPagos/ModuloPago";
import PagoResultado from "./pages/PagoResultado/PagoResultado";

// Módulo Admin
import ModuloAdmin from "./pages/ModuloAdmin/ModuloAdmin";
import ModuloUsuarios from "./components/ModuloAdminComponents/ModuloUsuarios/ModuloUsuarios";
import ModuloInventario from "./components/ModuloAdminComponents/ModuloInventario/ModuloInventario";
import ModuloReportes from "./components/ModuloAdminComponents/ModuloReportePedidos/ModuloReportePedidos";

function App() {
  const dispatch = useDispatch();

  // Limpiar alerta antes de recargar
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("isAlertShown");
  });

  useEffect(() => {
    dispatch(obtenerCantidadesDelLocal());
    dispatch(obtenTotal());
  }, [dispatch]);

  const { pathname } = useLocation();

  return (
    <div>
      {/* Mostrar NavBari solo en rutas no admin ni home */}
      {pathname !== "/" && !pathname.startsWith("/modulo_administrador") && (
        <NavBari />
      )}

      <Routes>
        {/* Rutas normales */}
        <Route path="/" element={<Home />} />
        <Route path="/repuestosVw" element={<RepuestosVw />} />
        <Route path="/repuestosFiat" element={<RepuestosFiat />} />
        <Route path="/repuestosPeugeot" element={<RepuestosPeugeot />} />
        <Route path="/repuestosCitroen" element={<RepuestosCitroen />} />
        <Route path="/repuestosMb" element={<RepuestosMb />} />
        <Route path="/repuestosSk" element={<RepuestosSK />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<RouteCarrito />} />
        <Route path="/resultado_pago" element={<PagoResultado />} />

        <Route
          path="/formulario_compra/:idPedidoParams"
          element={<ModuloPagos />}
        />
        <Route path="/formulario_compra" element={<ModuloPagos />} />

        <Route path="/modulo_administrador/*" element={<ModuloAdmin />}>
          <Route index element={<ModuloInventario />} />
          <Route path="catalogo" element={<ModuloInventario />} />
          <Route path="usuarios" element={<ModuloUsuarios />} />
          <Route path="reportes" element={<ModuloReportes />} />
        </Route>
      </Routes>

      {/* WhatsApp flotante */}
      {pathname !== "/" && <WhatsAppInfo />}
    </div>
  );
}

export default App;
