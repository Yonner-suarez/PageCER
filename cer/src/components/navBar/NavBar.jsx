import "./NavBar.css";
import Logocer from "../../assets/SoloLogo.svg";
import vw from "../../assets/vw.svg";
import fiat from "../../assets/fiat.svg";
import peugeot from "../../assets/peugeot.svg";
import carrito from "../../assets/carrito.svg";
import citroen from "../../assets/citroen.svg";
import renault from "../../assets/renault.svg";
import mb from "../../assets/mb.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBari = () => {
  return (
    <div className="contenedorDelNav">
      <Navbar bg="light" expand="lg" className="container">
        <Container>
          <a href="/">
            <img src={Logocer} alt="Logo" className="logocer" />
          </a>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className="contenedorLogos">
                <a href="/repuestosVw">
                  <img src={vw} alt="vw" className="logovw" />
                </a>
                <br />
                <a href="/repuestosFiat">
                  <img src={fiat} alt="fiat" className="logofiat" />
                </a>
                <br />
                <a href="/repuestosPeugeot">
                  <img src={peugeot} alt="peugeot" className="logoPeugeot" />
                </a>
                <br />
                <a href="/repuestosCitroen">
                  <img src={citroen} alt="citroen" className="logoCitroen" />
                </a>
                <br />
                <a href="/repuestosMb">
                  <img src={mb} alt="mb" className="logomb" />
                </a>
                <a href="/repuestosRenault">
                  <img src={renault} alt="renault" className="logorenault" />
                </a>
              </div>
            </Nav>
            <div className="contenedorPro">
              <Nav.Link href="/Productos" className="products">
                Productos
              </Nav.Link>
              <Nav.Link href="/nosotros" className="about">
                Nosotros
              </Nav.Link>
              <a href="/compras">
                <img src={carrito} alt="carrito" className="carrito" />
              </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavBari;
