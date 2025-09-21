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
        <p className="parrafos">
          Recibe tus repuestos rápidamente y con total seguridad. Nos aseguramos
          de que cada pedido llegue a tu puerta en el menor tiempo posible, con
          seguimiento en tiempo real y empaques protegidos para evitar daños.
        </p>
      </div>
      <div data-aos="flip-left" className="ofertas">
        <h4 className="tittle">Ofertas</h4>
        <img src={discount} alt="Discount" className="discount" />
        <p className="parrafos">
          Aprovecha nuestras promociones exclusivas y descuentos por temporada.
          Encuentra los mejores repuestos a precios competitivos y mantén tu
          vehículo siempre en óptimas condiciones.
        </p>
      </div>
      <div data-aos="flip-left" className="repuestos">
        <h4 className="tittle">Repuestos Originales</h4>
        <img src={motor} alt="Motor" className="icono" />
        <p className="parrafos">
          Garantía y calidad aseguradas. Todos nuestros repuestos son originales
          y certificados por las principales marcas, asegurando compatibilidad y
          durabilidad para tu vehículo.
        </p>
      </div>
      <div data-aos="flip-left" className="pagos">
        <h4 className="tittle">Pagos Seguros</h4>
        <ShieldFillCheck className="iconoBots" />
        <p className="parrafos">
          Compra con confianza. Nuestra plataforma protege tus datos y
          transacciones mediante sistemas de pago seguros, confiables y fáciles
          de usar.
        </p>
      </div>
    </div>
  );
};

export default Propuesta;
