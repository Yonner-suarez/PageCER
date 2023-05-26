import { useState } from "react";
import "./Carrito.css";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carritoIcon from "../../assets/carrito.svg";
import CantidadEnLaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import { useAuth0 } from "@auth0/auth0-react";

const Carrito = ({ ...props }) => {
  const { carrito } = useSelector((state) => state);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loginWithRedirect } = useAuth0();

  const onClick = () => {
    loginWithRedirect();
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <div className="contenedorCantidad">
          <p className="parrafoCantidad">{carrito.cantidad}</p>
          <img src={carritoIcon} alt="carrito" className="carrito" />
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
              <p className="parrafoCantidadCanvas">{carrito.cantidad}</p>
              <img src={carritoIcon} alt="carrito" className="carrito" />
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
                  <CantidadEnLaCard
                    repuesto={rep}
                    id={rep.id}
                    precio={rep.precio}
                  />
                  <p>${rep.precio}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="ContenedorValores">
            <hr style={{ color: "Black" }} />
            <div className="ContenedorValor">
              <h5>SubTotal</h5>
              <p>{carrito.subTotal}</p>
            </div>
            <div className="ContenedorValor">
              <h5>Envio</h5>
              <p>{carrito.envio}</p>
            </div>
            <hr style={{ color: "Black" }} />
            <div className="ContenedorValor">
              <h5>Total</h5>
              <p>{carrito.total}</p>
            </div>
            <button className="botonCompra" onClick={onClick}>
              Finalizar compra
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Carrito;
