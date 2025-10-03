import "./Cofap.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Cofap = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="contenedorCofap">
      <h2 className="tittleCofap" data-aos="fade-left">
        CoFaP
      </h2>
      <p className="parrafosCofap" data-aos="zoom-out-left">
        Cofap, especialista en la fabricación de sistemas de suspensión, combina
        calidad, seguridad y confort para su vehículo. Es por eso que a través
        de los años, las principales automotrices continúan confiando y
        eligiendo a Cofap como proveedora de equipo original.
      </p>
    </div>
  );
};

export default Cofap;
