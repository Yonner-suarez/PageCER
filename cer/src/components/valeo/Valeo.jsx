import "./Valeo.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Valeo = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="contenedorValeo">
      <h2 className="tittleValeo" data-aos="fade-up">
        VaLEo
      </h2>
      <p className="parrafosValeo" data-aos="zoom-out-right">
        Valeo es una compañía tecnológica líder mundial que colabora con todos
        los fabricantes de automóviles y nuevas formas de movilidad. Destaca en
        electrificación, sistemas de asistencia a la conducción, iluminación e
        innovación en la experiencia interior. Su propósito es hacer la
        movilidad más segura, inteligente y sostenible, ofreciendo tanto
        soluciones de equipo original como repuestos para el mercado
        independiente.
      </p>
    </div>
  );
};

export default Valeo;
