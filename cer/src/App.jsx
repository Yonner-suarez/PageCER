import "./App.css";
import RepuestosVw from "./components/RepuestosVw/RepuestosVw";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/homePage/Home";
import Success from "./pages/Success/Success";
import Pending from "./pages/Pending/Pending";
import Failure from "./pages/Failure/Failure";
import RepuestosPeugeot from "./components/RepuestosPeugeot/RepuestosPeugeot";
import RepuestosCitroen from "./components/RepuestosCitroen/RepuestosCitroen";
import RepuestosMb from "./components/RepuestosMb/RepuestosMb";
import RepuestosRenault from "./components/RepuestosRenault/RepuestosRenault";
import WhatsAppInfo from "./components/WhatsApp/WhatsApp";
import NavBari from "./components/navBar/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import RepuestosFiat from "./components/RepuestosFiat/RepuestosFiat";
import RouteCarrito from "./components/RouteCarrito/RouteCarrito";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { obtenTotal, obtenerCantidadesDelLocal } from "./redux/slices/carrito";
function App() {
  const dispatch = useDispatch();

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
      {pathname !== "/" && <NavBari />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repuestosVw" element={<RepuestosVw />} />
        <Route path="/repuestosFiat" element={<RepuestosFiat />} />
        <Route path="/repuestosPeugeot" element={<RepuestosPeugeot />} />
        <Route path="/repuestosCitroen" element={<RepuestosCitroen />} />
        <Route path="/repuestosMb" element={<RepuestosMb />} />
        <Route path="/repuestosRenault" element={<RepuestosRenault />} />
        <Route path="/carrito" element={<RouteCarrito />} />
        <Route path="/success" element={<Success />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
      {pathname !== "/" && <WhatsAppInfo />}
    </div>
  );
}

export default App;
