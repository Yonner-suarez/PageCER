import "./Luk.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Luk = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="contenedorLuk">
      <h2 className="tittleLuk" data-aos="fade-right">
        LUk
      </h2>
      <p className="parrafosLuk" data-aos="zoom-in">
        Schaeffler, a través de su marca LuK, es líder mundial en tecnologías de
        embrague, presente en uno de cada tres coches a nivel global y en uno de
        cada dos en Europa. Es el mayor proveedor de equipos originales en este
        segmento, ofreciendo tanto embragues convencionales como autoajustables.
        Además, mantiene una amplia colaboración con fabricantes de vehículos
        ligeros, pesados y tractores, lo que le permite desarrollar soluciones
        de reparación de alta calidad, con piezas que garantizan fiabilidad,
        durabilidad y facilidad de instalación.
      </p>
    </div>
  );
};

export default Luk;
