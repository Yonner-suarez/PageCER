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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium sit
        iste ex nesciunt vero id excepturi rem, totam deleniti rerum maxime
        similique modi quis velit illum laborum illo reprehenderit eaque. Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Veniam iusto, neque
        corrupti quos sequi culpa et facere omnis ratione pariatur repellendus
        vero, dolores quod nesciunt fuga suscipit consequuntur nemo illo. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Facilis in
        consequuntur ullam ab molestias, sint ex? Iste distinctio ratione
        provident accusamus hic harum fuga at sequi sit doloribus, quisquam
        repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quis recusandae iste facere deserunt nobis similique quia excepturi
        veniam, repellendus quo placeat amet natus id quaerat in doloremque
        porro dolorem possimus!
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
