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
    <div>
      <Navbar bg="light" expand="lg" className="container">
        <Container>
          <a href="https://youtube.com">
            <img src={Logocer} alt="Logo" className="logocer" />
          </a>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className="contenedorLogos">
                <a href="https://youtube.com">
                  <img src={vw} alt="vw" className="logovw" />
                </a>
                <br />
                <a href="https://youtube.com">
                  <img src={fiat} alt="fiat" className="logofiat" />
                </a>
                <br />
                <a href="https://youtube.com">
                  <img src={peugeot} alt="peugeot" className="logoPeugeot" />
                </a>
                <br />
                <a href="https://youtube.com">
                  <img src={citroen} alt="citroen" className="logoCitroen" />
                </a>
                <br />
                <a href="https://youtube.com">
                  <img src={mb} alt="mb" className="logomb" />
                </a>
                <a href="https://youtube.com">
                  <img src={renault} alt="renault" className="logorenault" />
                </a>
              </div>

              <Nav.Link href="#home" className="products">
                Products
              </Nav.Link>
              <Nav.Link href="#link" className="about">
                About
              </Nav.Link>
              <a href="https://youtube.com">
                <img src={carrito} alt="carrito" className="carrito" />
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavBari;
