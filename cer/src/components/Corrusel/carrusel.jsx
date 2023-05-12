import Carousel from "react-bootstrap/Carousel";
import "./carrusel.css";
import vw from "../../assets/tiguan.png";
import fiat from "../../assets/fiat.jpg";
import peugeot from "../../assets/peugeot.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Carrousel = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="contenedorCarusel" data-aos="zoom-in">
      <br />
      <div data-aos="zoom-in">
        <Carousel className="carusel">
          <Carousel.Item>
            <div data-aos="zoom-in">
              <img className="d-block w-100" src={vw} alt="First slide" />
              <Carousel.Caption>
                <h3 className="tituloVW">Volkswagen</h3>
                <p className="parrafos">
                  Tenemos toda clase de repuestos Originales
                </p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div data-aos="zoom-in-down">
              <img className="d-block w-100" src={fiat} alt="Second slide" />

              <Carousel.Caption>
                <h3>Fiat</h3>
                <p>Cuida de tu auto</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={peugeot} alt="Third slide" />

            <Carousel.Caption>
              <h3>Peugeot</h3>
              <p>Él tambien es tu mejor amigo</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Carrousel;
