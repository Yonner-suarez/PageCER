import "./NavBar.css";
import Logocer from "../../assets/SoloLogo.svg";
import vw from "../../assets/vw.svg";
import fiat from "../../assets/fiat.svg";
import peugeot from "../../assets/peugeot.svg";
import skoda from "../../assets/skoda.svg";
import mb from "../../assets/mb.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRepuestos } from "../../redux/slices/repuestos";
import { obtenerCantidades } from "../../redux/slices/carrito";
import Carrito from "../Carrito/Carrito";
import { useState } from "react";
import Loading from "../Loading/Loading";

const NavBari = () => {
  const dispatch = useDispatch();
  const [busqueda, setBusqueda] = useState("");
  const [showLoading, setShowLoading] = useState({ display: "none" });

  // 🔍 Búsqueda mientras el usuario escribe
  const handleChange = async (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.trim().length >= 3) {
      setShowLoading({ display: "block" });

      try {
        // Ejecuta la búsqueda
        await dispatch(getRepuestos({ Busqueda: valor.trim() }));
        dispatch(obtenerCantidades());
      } catch (error) {
        console.error("Error al obtener repuestos:", error);
      } finally {
        setShowLoading({ display: "none" });
      }
    }

    // Si el usuario borra la búsqueda, puedes volver a mostrar todo
    if (valor.trim() === "") {
      await dispatch(getRepuestos({ Busqueda: "" }));
    }
  };

  // 🔎 Búsqueda manual al presionar Enter
  const handleSubmit = (e) => {
    e.preventDefault();

    if (busqueda.trim() === "") return;

    setShowLoading({ display: "block" });
    dispatch(getRepuestos({ Busqueda: busqueda.trim() }))
      .then(() => dispatch(obtenerCantidades()))
      .finally(() => setShowLoading({ display: "none" }));
  };

  const onClick = () => {
    // dispatch(getRepuestos());
  };

  return (
    <>
      <Loading estilo={showLoading} />

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
                <Link to="/repuestosMb" onClick={onClick}>
                  <img src={mb} alt="mb" className="logomb" />
                </Link>
              </div>
            </Nav>
            <div className="contenedorPro">
              {/* 🔍 Barra de búsqueda */}
              <Form className="d-flex mx-3" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Ejemplo: Amortiguador - embrague"
                  className="me-2"
                  aria-label="Buscar"
                  value={busqueda}
                  onChange={handleChange}
                  style={{
                    borderRadius: "20px",
                    width: "400px",
                    fontFamily: "Franklin Gothic Medium",
                  }}
                />
              </Form>

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

              <Carrito placement="end" name="end" />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBari;
