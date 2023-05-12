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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
        nesciunt quibusdam iure nisi sunt animi alias recusandae minus obcaecati
        nihil enim, laborum dolores a totam doloremque saepe! Libero, porro
        ipsum.
      </p>
    </div>
  );
};

export default Luk;
