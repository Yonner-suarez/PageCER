import Carousel from "react-bootstrap/Carousel";
import "./CarruselMarcas.css";
import corven from "../../assets/Corven.svg";
import magneti from "../../assets/magneti.jpg";
import gates from "../../assets/gates.jpg";
import moog from "../../assets/moog.jpg";
import Borsehung from "../../assets/borsheung.svg";
import febi from "../../assets/febi.svg";
import bosh from "../../assets/bosh.svg";
import continental from "../../assets/continental.svg";
import ina from "../../assets/ina.svg";
import mahle from "../../assets/mahle.svg";
import sabo from "../../assets/sabo.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const CarruselMarcas = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <Carousel
      variant="dark"
      className="CarruselMarcas"
      data-aos="zoom-out-left"
    >
      <Carousel.Item>
        <img className="d-block w-100" src={corven} alt="Corven" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={magneti} alt="Magneti Marelli" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={gates} alt="Gates" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={moog} alt="Moog" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={febi} alt="Febi" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Borsehung} alt="Borsehung" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={bosh} alt="Bosh" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={continental} alt="Continental" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={sabo} alt="Sabo" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={ina} alt="Ina" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={mahle} alt="Mahle" />
      </Carousel.Item>
    </Carousel>
  );
};
export default CarruselMarcas;
