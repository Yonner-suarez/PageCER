import "./NavBarAdmin";
import Logocer from "../../../assets/Logo.svg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const { token } = JSON.parse(storedUser);
        const decoded = jwtDecode(token);
        if (decoded?.email) {
          const nombre = decoded.email.split("@")[0];
          setUsername(nombre.charAt(0).toUpperCase() + nombre.slice(1));
        }
      } catch (err) {
        console.error("Error decodificando token", err);
      }
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged")); // notificar
    navigate("/", { replace: true });
  };

  const iconColor = "#7066E0";
  const iconSize = "24px";

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="py-4 shadow-sm">
      <Container className="d-flex flex-column align-items-center">
        {/* Logo + Usuario arriba */}
        <div
          className="d-flex flex-row align-items-center gap-3 mb-4"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            src={Logocer}
            alt="Logo"
            className="logocer"
            style={{ width: "300px", height: "auto" }}
          />
          <div className="d-flex align-items-center gap-3">
            <span className="fw-semibold fs-5">
              Hola, {username || "Admin"}
            </span>
            <button
              onClick={cerrarSesion}
              className="btn btn-link text-center p-0"
              title="Cerrar sesión"
            >
              <i
                className="bi bi-box-arrow-right"
                style={{ color: iconColor, fontSize: iconSize }}
              ></i>
            </button>
          </div>
        </div>

        {/* Menú admin centrado abajo */}
        <Nav
          className="d-flex gap-5 fs-6"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0.5rem 1rem",
          }}
        >
          <Link
            to="/modulo_administrador/catalogo"
            className="nav-link text-center"
            style={{ color: "#7066E0" }}
          >
            <i className="bi bi-box-seam" style={{ fontSize: "24px" }}></i>
            <div>Catálogo</div>
          </Link>

          <Link
            to="/modulo_administrador/usuarios"
            className="nav-link text-center"
            style={{ color: "#7066E0" }}
          >
            <i className="bi bi-people" style={{ fontSize: "24px" }}></i>
            <div>Usuarios</div>
          </Link>

          <Link
            to="/modulo_administrador/reportes"
            className="nav-link text-center"
            style={{ color: "#7066E0" }}
          >
            <i
              className="bi bi-file-earmark-text"
              style={{ fontSize: "24px" }}
            ></i>
            <div>Reporte de Pedidos</div>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;
