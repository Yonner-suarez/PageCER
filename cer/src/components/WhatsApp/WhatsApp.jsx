import "./WhatsApp.css";
import { Whatsapp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const WhatsAppInfo = () => {
  return (
    <div className="contenedorWhatsApp">
      <p className="parrafosWHS">Contactanos</p>
      <Link to="https://www.whatsapp.com/?lang=es" className="link">
        <Whatsapp className="WhatsApp" />
      </Link>
    </div>
  );
};
export default WhatsAppInfo;
