import Carousel from "react-bootstrap/Carousel";
import "./carrusel.css";
import vw from "../../assets/tiguan.png";
import fiat from "../../assets/fiat.jpg";
import peugeot from "../../assets/peugeot.jpg";
import citroen from "../../assets/citroen.jpg";
import cr from "../../assets/Crafter.jpg";
import renault from "../../assets/renault.jpg";
import mb from "../../assets/mb.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Carrousel = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    // <div className="contenedorCarusel" data-aos="zoom-out-left">
    //   <br />
    <Carousel className="carusel" data-aos="zoom-out-left">
      <Carousel.Item className="imagen">
        <img className="d-block w-100 h-100" src={vw} alt="VW" />
        <Carousel.Caption className="oraciones">
          <h3>Volkswagen</h3>
          <p>Tenemos toda clase de repuestos Originales</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="imagen">
        <img className="d-block w-100 h-100" src={fiat} alt="Fiat" />

        <Carousel.Caption className="oraciones">
          <h3>Fiat</h3>
          <p>Cuida de tu auto</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="imagen">
        <img className="d-block w-100 h-100" src={peugeot} alt="Peugeot" />

        <Carousel.Caption className="oraciones">
          <h3>Peugeot</h3>
          <p>Él tambien es tu mejor amigo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="imagen">
        <img className="d-block w-100" src={mb} alt="mb" />

        <Carousel.Caption className="oraciones">
          <h3>Mercedez-Benz</h3>
          <p>Las mejores marcas para tu vehículo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="imagen">
        <img className="d-block w-100" src={cr} alt="mb" />

        <Carousel.Caption className="oraciones">
          <h3>Crafter</h3>
          <p>Tenenmos los mejores precios</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="imagen">
        <img className="d-block w-100" src={citroen} alt="mb" />

        <Carousel.Caption className="oraciones">
          <h3>Citroen</h3>
          <p>Las mejores marcas para tu vehículo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="imagen">
        <img className="d-block w-100" src={renault} alt="mb" />

        <Carousel.Caption className="oraciones">
          <h3>Renault</h3>
          <p>Los mejores repuestos para las mejores marcas</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    // </div>
  );
};

export default Carrousel;
