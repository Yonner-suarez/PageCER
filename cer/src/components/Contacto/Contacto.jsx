import "./Contacto.css";
import { Twitter, Facebook, Instagram } from "react-bootstrap-icons";
import logo from "../../assets/Logo.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Contacto = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="todoElContenedor">
      <div className="contenedorRedes" data-aos="zoom-out-left">
        <div className="contenedorUnaRed">
          <p className="nombreRed">Facebook</p>
          <Facebook />
        </div>
        <div className="contenedorUnaRed">
          <p className="nombreRed">Instagram</p>
          <Instagram />
        </div>
        <div className="contenedorUnaRed">
          <p className="nombreRed">Twitter</p>
          <Twitter />
        </div>
      </div>
      <div className="contenedorInformacion" data-aos="fade-down-left">
        <div className="informacionNosotros">
          <img src={logo} alt="Logo" className="logo" />
          <p className="parrafos">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            fugiat ex magni, facere corrupti consectetur perspiciatis ut qui
            aliquid mollitia maxime earum unde soluta eligendi sunt ipsa aperiam
            quidem dolorem!
          </p>
        </div>
        <div className="informacionNosotros">
          <hr />
          <h4 className="subtitulo">info</h4>
          <hr className="saltos" />
          <p className="parrafos">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            fugiat ex magni, facere corrupti consectetur perspiciatis ut qui
            aliquid mollitia maxime earum unde soluta eligendi sunt ipsa aperiam
            quidem dolorem!
          </p>
        </div>
        <div className="informacionNosotros">
          <hr />
          <h4 className="subtitulo">Novedades</h4>
          <hr className="saltos" />
          <p className="parrafos">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            fugiat ex magni, facere corrupti consectetur perspiciatis ut qui
            aliquid mollitia maxime earum unde soluta eligendi sunt ipsa aperiam
            quidem dolorem!
          </p>
        </div>
      </div>
    </div>
  );
};
export default Contacto;
