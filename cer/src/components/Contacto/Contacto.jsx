import "./Contacto.css";
import { Twitter, Facebook, Instagram } from "react-bootstrap-icons";
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Contacto = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="todoElContenedor">
      <div className="contenedorRedes" data-aos="fade-right">
        <div className="contenedorUnaRed">
          <Link
            to="https://www.facebook.com/profile.php?id=100092678504932"
            className="linkContacto"
          >
            <p className="nombreRed">Facebook</p>
            <Facebook />
          </Link>
        </div>
        <div className="contenedorUnaRed">
          <Link
            to="https://www.instagram.com/europeaderepuestos_tunja/"
            className="linkContacto"
          >
            <p className="nombreRed" style={{ color: "red" }}>
              Instagram
            </p>
            <Instagram style={{ color: "red" }} />
          </Link>
        </div>
        <div className="contenedorUnaRed">
          <Link
            to="https://twitter.com/EuropeaDeRepues"
            className="linkContacto"
          >
            <p className="nombreRed">Twitter</p>
            <Twitter />
          </Link>
        </div>
      </div>
      <div className="contenedorInformacion" data-aos="flip-down">
        <div className="informacionNosotros">
          <img src={logo} alt="Logo" className="logo" />
          <p className="parrafos">
            Somos un almacén especializado en la venta de repuestos automotrices
            para las principales marcas europeas: Volkswagen, Škoda, Fiat,
            Peugeot, Citroën y Mercedes-Benz. Nuestro compromiso es ofrecer
            piezas de calidad, confianza y respaldo, para que tu vehículo
            siempre tenga el mejor rendimiento.
          </p>
        </div>
        <div className="informacionNosotros" data-aos="flip-down">
          <hr />
          <h4 className="subtitulo">info</h4>
          <hr className="saltos" />
          <p className="parrafos">
            En Casa Europea de Repuestos encontrarás repuestos originales y
            alternativos, con garantía y el respaldo de un equipo experto.
            Realizamos envíos seguros a todo el país y ofrecemos asesoría
            personalizada para ayudarte a elegir la mejor opción para tu
            vehículo.
          </p>
        </div>
        <div className="informacionNosotros" data-aos="flip-down">
          <hr />
          <h4 className="subtitulo">Novedades</h4>
          <hr className="saltos" />
          <p className="parrafos">
            Mantente al día con nuestras promociones, nuevos ingresos y
            lanzamientos exclusivos en repuestos para tu marca preferida.
            Suscríbete a nuestro boletín y sé el primero en conocer ofertas
            especiales y descuentos en productos seleccionados.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Contacto;
