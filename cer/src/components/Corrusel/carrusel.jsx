import Carousel from "react-bootstrap/Carousel";
import "./carrusel.css";
import Zoom from "react-reveal/Zoom";
import vw from "../../assets/tiguan.png";
import fiat from "../../assets/fiat.jpg";
import peugeot from "../../assets/peugeot.jpg";

const Carrousel = () => {
  return (
    <div className="contenedorCarusel">
      <br />
      <Zoom>
        <Carousel className="carusel">
          <Carousel.Item>
            <Zoom>
              <img className="d-block w-100" src={vw} alt="First slide" />
              <Carousel.Caption>
                <h3 className="tituloVW">Volkswagen</h3>
                <p className="parrafos">
                  Tenemos toda clase de repuestos Originales
                </p>
              </Carousel.Caption>
            </Zoom>
          </Carousel.Item>
          <Carousel.Item>
            <Zoom>
              <img className="d-block w-100" src={fiat} alt="Second slide" />

              <Carousel.Caption>
                <h3>Fiat</h3>
                <p>Cuida de tu auto</p>
              </Carousel.Caption>
            </Zoom>
          </Carousel.Item>
          <Carousel.Item>
            <Zoom>
              <img className="d-block w-100" src={peugeot} alt="Third slide" />

              <Carousel.Caption>
                <h3>Peugeot</h3>
                <p>Él tambien es tu mejor amigo</p>
              </Carousel.Caption>
            </Zoom>
          </Carousel.Item>
        </Carousel>
      </Zoom>
    </div>
  );
};

export default Carrousel;
