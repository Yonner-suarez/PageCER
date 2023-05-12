import "./Propuesta.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Propuesta = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="contenedorPropuesta" data-aos="fade-left">
      <div>Envios</div>
      <div>Ofertas</div>
      <div>Repuestos Originales</div>
      <div>Pagos Seguros</div>
    </div>
  );
};

export default Propuesta;
