import { useState } from "react";
import "./Carrito.css";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carritoIcon from "../../assets/carrito.svg";
import PropTypes from "prop-types";
import CantidadEnLaCard from "../cantidadEnLa Card/CantidadEnLaCard";

const Carrito = ({ ...props }) => {
  const { carrito } = useSelector((state) => state);
  console.log(carrito);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <div className="contenedorCantidad">
          <img src={carritoIcon} alt="carrito" className="carrito" />
          <p className="parrafoCantidad">{carrito.cantidad}</p>
        </div>
      </Button>
      <Offcanvas
        backdropClassName="Canvas"
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="canvasTitle">
            <div className="contenedorCantidad">
              <img src={carritoIcon} alt="carrito" className="carrito" />
              <p className="parrafoCantidadCanvas">{carrito.cantidad}</p>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="cuerpoCanvas">
          {carrito.producto.map((rep) => (
            <div key={rep.id} className="ContenedorCanvasRepuesto">
              <img src={rep.imagen} alt={rep.nombre} className="imagenCanvas" />
              <div className="contenedorNombrePrecio">
                <h6 className="h6">{rep.nombre}</h6>
                <div className="Cantidades">
                  <CantidadEnLaCard repuesto={rep} id={rep.id} />
                  <p>${rep.precio}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="ContenedorValores">
            <hr style={{ color: "white" }} />
            <div className="ContenedorValor">
              <h5>SubTotal</h5>
              <p>10.000</p>
            </div>
            <div className="ContenedorValor">
              <h5>Envio</h5>
              <p>8.000</p>
            </div>
            <hr style={{ color: "white" }} />
            <div className="ContenedorValor">
              <h5>Total</h5>
              <p>18.000</p>
            </div>
            <button className="botonCompra">Finalizar compra</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

Carrito.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Carrito;
