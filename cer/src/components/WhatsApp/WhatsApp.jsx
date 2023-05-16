import "./WhatsApp.css";
import { Whatsapp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const WhatsAppInfo = () => {
  return (
    <div className="contenedorWhatsApp">
      <p className="parrafosWHS">Contactanos</p>
      <Link
        to="https://api.whatsapp.com/send?phone=573134421215&text=Buen_día_estoy_buscando_Repuestos"
        className="link"
      >
        <Whatsapp className="WhatsApp" />
      </Link>
    </div>
  );
};
export default WhatsAppInfo;
