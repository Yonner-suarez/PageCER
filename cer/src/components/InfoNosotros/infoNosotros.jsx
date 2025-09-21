import "./infoNosotros.css";
import Cartel from "../../assets/CartelCER.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const InfoNosotros = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="infoLuk" data-aos="zoom-in">
      <h2 className="tittleNosotros" data-aos="fade-right">
        QUIENES SOMOS
      </h2>
      <hr className="hr" />
      <p className="parrafosNosotros" data-aos="zoom-in">
        Somos un almacén de repuestos automotrices especializado en ofrecer
        soluciones confiables y de calidad para vehículos de las principales
        marcas europeas, entre ellas Volkswagen, Škoda, Fiat, Peugeot, Citroën y
        Mercedes-Benz. Nuestro compromiso es brindar a nuestros clientes un
        servicio ágil, seguro y cercano, respaldado por una amplia experiencia
        en el sector automotor.
      </p>
      <img
        src={Cartel}
        alt="Cartel"
        data-aos="zoom-out-left"
        className="imagenCartel"
      />
    </div>
  );
};
export default InfoNosotros;
