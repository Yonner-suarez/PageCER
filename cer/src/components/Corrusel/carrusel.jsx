import Carousel from "react-bootstrap/Carousel";
import "./carrusel.css";
import vw from "../../assets/tiguan.png";
import fiat from "../../assets/fiat.jpg";
import peugeot from "../../assets/peugeot.jpg";

const Carrousel = () => {
  return (
    <div className="contenedorCarusel">
      <br />
      <Carousel className="carusel">
        <Carousel.Item>
          <img className="d-block w-100" src={vw} alt="First slide" />
          <Carousel.Caption>
            <h3 className="tituloVW">Volkswagen</h3>
            <p className="parrafos">
              Tenemos toda clase de repuestos Originales
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={fiat} alt="Second slide" />

          <Carousel.Caption>
            <h3>Fiat</h3>
            <p>Cuida de tu auto</p>
          </Carousel.Caption>
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
  );
};

export default Carrousel;
