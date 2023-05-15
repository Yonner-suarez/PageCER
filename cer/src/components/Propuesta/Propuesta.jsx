import "./Propuesta.css";
import AOS from "aos";
import motor from "../../assets/motor.svg";
import discount from "../../assets/discount.svg";
import "aos/dist/aos.css";
import { ShieldFillCheck, SendPlusFill } from "react-bootstrap-icons";
import { useEffect } from "react";

const Propuesta = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="contenedorPropuesta">
      <div data-aos="flip-left" className="envios">
        <h4 className="tittle">Envios</h4>
        <SendPlusFill className="iconoBots" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
          laudantium quidem repudiandae nam cum animi temporibus ad explicabo ea
          eum vel ab aperiam vitae quo eos minus voluptas, et at.
        </p>
      </div>
      <div data-aos="flip-left" className="ofertas">
        <h4 className="tittle">Ofertas</h4>
        <img src={discount} alt="Discount" className="discount" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
          laudantium quidem repudiandae nam cum animi temporibus ad explicabo ea
          eum vel ab aperiam vitae quo eos minus voluptas, et at.
        </p>
      </div>
      <div data-aos="flip-left" className="repuestos">
        <h4 className="tittle">Repuestos Originales</h4>
        <img src={motor} alt="Motor" className="icono" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
          laudantium quidem repudiandae nam cum animi temporibus ad explicabo ea
          eum vel ab aperiam vitae quo eos minus voluptas, et at.
        </p>
      </div>
      <div data-aos="flip-left" className="pagos">
        <h4 className="tittle">Pagos Seguros</h4>
        <ShieldFillCheck className="iconoBots" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
          laudantium quidem repudiandae nam cum animi temporibus ad explicabo ea
          eum vel ab aperiam vitae quo eos minus voluptas, et at.
        </p>
      </div>
    </div>
  );
};

export default Propuesta;
