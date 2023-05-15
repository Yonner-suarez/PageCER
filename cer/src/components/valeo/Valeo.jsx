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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
        nesciunt quibusdam iure nisi sunt animi alias recusandae minus obcaecati
        nihil enim, laborum dolores a totam doloremque saepe! Libero, porro
        ipsum.
      </p>
    </div>
  );
};

export default Valeo;
