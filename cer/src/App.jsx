import "./App.css";
import RepuestosVw from "./components/RepuestosVw/RepuestosVw";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/homePage/Home";
import RepuestosPeugeot from "./components/RepuestosPeugeot/RepuestosPeugeot";
import RepuestosCitroen from "./components/RepuestosCitroen/RepuestosCitroen";
import RepuestosMb from "./components/RepuestosMb/RepuestosMb";
import RepuestosRenault from "./components/RepuestosRenault/RepuestosRenault";
import WhatsAppInfo from "./components/WhatsApp/WhatsApp";
import NavBari from "./components/navBar/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import RepuestosFiat from "./components/RepuestosFiat/RepuestosFiat";
import RouteCarrito from "./components/RouteCarrito/RouteCarrito";

function App() {
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("isAlertShown");
  });

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
      </Routes>
      {pathname !== "/" && <WhatsAppInfo />}
    </div>
  );
}

export default App;
