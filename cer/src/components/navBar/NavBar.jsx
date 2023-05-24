import "./NavBar.css";
import Logocer from "../../assets/SoloLogo.svg";
import vw from "../../assets/vw.svg";
import fiat from "../../assets/fiat.svg";
import peugeot from "../../assets/peugeot.svg";

import citroen from "../../assets/citroen.svg";
import skoda from "../../assets/skoda.svg";
import renault from "../../assets/renault.svg";
import mb from "../../assets/mb.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRepuestos } from "../../redux/slices/repuestos";
import Carrito from "../Carrito/Carrito";

const NavBari = () => {
  const dispatch = useDispatch();
  const onClick = (event) => {
    console.log(event.target.alt);
    dispatch(getRepuestos());
  };

  return (
    <Navbar bg="light" expand="lg" className="container" sticky="top">
      <Container>
        <Link to="/">
          <img src={Logocer} alt="Logo" className="logocer" />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="contenedorLogos">
              <Link to="/repuestosVw" onClick={onClick}>
                <img src={vw} alt="volkswagen" className="logovw" />
              </Link>
              <br />
              <Link to="/repuestosSk" onClick={onClick}>
                <img src={skoda} alt="skoda" className="logoSk" />
              </Link>
              <br />
              <Link to="/repuestosFiat" onClick={onClick}>
                <img src={fiat} alt="fiat" className="logofiat" />
              </Link>
              <br />
              <Link to="/repuestosPeugeot" onClick={onClick}>
                <img src={peugeot} alt="peugeot" className="logoPeugeot" />
              </Link>
              <br />
              <Link to="/repuestosCitroen" onClick={onClick}>
                <img src={citroen} alt="citroen" className="logoCitroen" />
              </Link>
              <br />
              <Link to="/repuestosMb" onClick={onClick}>
                <img src={mb} alt="mb" className="logomb" />
              </Link>
              <Link to="/repuestosRenault" onClick={onClick}>
                <img src={renault} alt="renault" className="logorenault" />
              </Link>
            </div>
          </Nav>
          <div className="contenedorPro">
            <Link
              to="/Productos"
              className="products"
              style={{
                textDecoration: "none",
                color: "black",
                fontFamily: "Franklin Gothic Medium",
              }}
            >
              Productos
            </Link>
            <Link
              to="/nosotros"
              className="about"
              style={{
                textDecoration: "none",
                color: "black",
                fontFamily: "Franklin Gothic Medium",
              }}
            >
              Nosotros
            </Link>

            <Carrito placement="end" name="end" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBari;
