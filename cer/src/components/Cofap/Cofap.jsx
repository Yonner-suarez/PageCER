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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
        nesciunt quibusdam iure nisi sunt animi alias recusandae minus obcaecati
        nihil enim, laborum dolores a totam doloremque saepe! Libero, porro
        ipsum.
      </p>
    </div>
  );
};

export default Cofap;
