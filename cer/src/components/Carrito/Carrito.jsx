import { useState } from "react";
import "./Carrito.css";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carritoIcon from "../../assets/carrito.svg";
import CantidadEnLaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import { useAuth0 } from "@auth0/auth0-react";
import { DashCircle } from "react-bootstrap-icons";
import {
  eliminarDelCarrito,
  qutarCarrito,
  resetPrecioState,
} from "../../redux/slices/carrito";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Carrito = ({ ...props }) => {
  const dispatch = useDispatch();

  const { carrito } = useSelector((state) => state);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loginWithRedirect } = useAuth0();

  const onClick = () => {
    loginWithRedirect();
  };

  const quitarCarrito = (id) => {
    const find = carrito.producto.find((pro) => pro.id === id);

    dispatch(qutarCarrito(find.cantidad));

    const final = parseFloat(find.precio.replace(/\./g, "").replace(",", "."));
    dispatch(resetPrecioState(find.cantidad * final));

    dispatch(eliminarDelCarrito(id));
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
                  <DashCircle
                    style={{ width: "10%", height: "auto" }}
                    onClick={() => {
                      quitarCarrito(rep.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="ContenedorValores">
            <hr style={{ color: "Black" }} />
            <div className="ContenedorValor">
              <h5>SubTotal</h5>
              <p>${carrito.subTotal.toLocaleString()}</p>
            </div>
            <div className="ContenedorValor">
              <h5>Envio</h5>
              <p>${carrito.envio.toLocaleString()}</p>
            </div>
            <hr style={{ color: "Black" }} />
            <div className="ContenedorValor">
              <h5>Total</h5>
              <p>${carrito.total.toLocaleString()}</p>
            </div>
            <button className="botonCompra" onClick={onClick}>
              Finalizar compra
            </button>
            <Link to="carrito">
              <button className="botonCompra">Ver Carrito</button>
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Carrito;
