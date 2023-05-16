import "./Footer.css";
import { RocketTakeoff } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div className="footer">
      <p>@Copyright 2023 CasaEuropeaDeRepuestos</p>
      <p>
        Hecho por <RocketTakeoff className="cohete" /> Yonner Suarez{" "}
      </p>
    </div>
  );
};

export default Footer;
