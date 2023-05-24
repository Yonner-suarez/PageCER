import { useState } from "react";
import "./Carrito.css";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carritoIcon from "../../assets/carrito.svg";

const Carrito = ({ name, ...props }) => {
  const { carrito } = useSelector((state) => state);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="boton">
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
          <Offcanvas.Title>
            <div className="contenedorCantidad">
              <img src={carritoIcon} alt="carrito" className="carrito" />
              <p className="parrafoCantidad">{carrito.cantidad}</p>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="cuerpoCanvas">
          {carrito.producto.map((rep) => (
            <div key={rep.id} className="ContenedorCanvasRepuesto">
              <img src={rep.imagen} alt={rep.nombre} className="imagenCanvas" />
              <div className="contenedorNombrePrecio">
                <h6>{rep.nombre}</h6>
                <p>${rep.precio}</p>
              </div>
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Carrito;
