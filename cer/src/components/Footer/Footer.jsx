import "./Footer.css";
import { RocketTakeoff } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footertexto">@Copyright 2023 CasaEuropeaDeRepuestos</p>
      <p className="footertexto">
        Hecho por <RocketTakeoff className="cohete" /> Yonner Suarez{" "}
      </p>
    </div>
  );
};

export default Footer;
