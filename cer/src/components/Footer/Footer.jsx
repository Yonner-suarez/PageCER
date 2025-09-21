import React from "react";
import "./footer.css";
import { RocketTakeoff } from "react-bootstrap-icons";

function Footer() {
  return (
    <div className="kt-footer kt-grid__item" id="kt_footer">
      <div className="kt-container">
        <div className="kt-footer__wrapper footer-container">
          <div className="footer-item">© 2025 CasaEuropeaDeRepuestos</div>
          <div className="footer-item">
            Hecho por <RocketTakeoff className="cohete" /> Yonner Suarez
          </div>
          <div className="footer-item">Versión v1.0.1</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
