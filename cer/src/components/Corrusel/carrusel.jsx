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
      <Carousel.Item>
        <img className="d-block w-100 h-100" src={vw} alt="VW" />
        <Carousel.Caption>
          <h3 className="tituloVW">Volkswagen</h3>
          <p className="parrafos">Tenemos toda clase de repuestos Originales</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 h-100" src={fiat} alt="Fiat" />

        <Carousel.Caption>
          <h3 className="tittleFiat">Fiat</h3>
          <p>Cuida de tu auto</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 h-100" src={peugeot} alt="Peugeot" />

        <Carousel.Caption>
          <h3 className="tittlePeugeot">Peugeot</h3>
          <p>Él tambien es tu mejor amigo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={mb} alt="mb" />

        <Carousel.Caption>
          <h3 className="tituloVW">Mercedez-Benz</h3>
          <p className="parrafos">Las mejores marcas para tu vehículo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={cr} alt="mb" />

        <Carousel.Caption>
          <h3 className="tittleCrafter">Crafter</h3>
          <p>Tenenmos los mejores precios</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={citroen} alt="mb" />

        <Carousel.Caption>
          <h3 className="tittleCitroen">Citroen</h3>
          <p>Las mejores marcas para tu vehículo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={renault} alt="mb" />

        <Carousel.Caption>
          <h3 className="tittleRenault">Renault</h3>
          <p>Los mejores repuestos para las mejores marcas</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    // </div>
  );
};

export default Carrousel;
