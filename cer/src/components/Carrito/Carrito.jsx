import { useState } from "react";
import "./Carrito.css";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carritoIcon from "../../assets/carrito.svg";
import CantidadEnLaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import { DashCircle } from "react-bootstrap-icons";
import {
  eliminarDelCarrito,
  localStorageToState,
  subTotal,
  obtenTotal,
} from "../../redux/slices/carrito";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import formatearNumeroCOP from "./utils/formaterCOP";

const Carrito = ({ ...props }) => {
  const dispatch = useDispatch();

  const { carrito } = useSelector((state) => state);
  const { repuestos } = useSelector((state) => state.repuestos);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const quitarCarrito = (id, cantidad) => {
    dispatch(eliminarDelCarrito(id, cantidad));
    dispatch(localStorageToState());
    dispatch(subTotal());
    dispatch(obtenTotal());
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
          {carrito?.local?.map((rep) => (
            <div key={rep.id} className="ContenedorCanvasRepuesto">
              <img src={rep.imagen} alt={rep.nombre} className="imagenCanvas" />
              <div className="contenedorNombrePrecio">
                <h6 className="h6">{rep.nombre}</h6>
                <div className="Cantidades">
                  <CantidadEnLaCard
                    repuesto={rep}
                    id={rep.id}
                    precio={rep.precio}
                    repuestos={repuestos}
                  />
                  <p className="parrafoPrecioUnit">${rep.precio}</p>

                  <DashCircle
                    style={{
                      width: "10%",
                      height: "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => quitarCarrito(rep.id, rep.cantidad)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="ContenedorValores">
            <hr style={{ color: "Black" }} />
            <div className="ContenedorValor">
              <h5>SubTotal</h5>
              <p>{formatearNumeroCOP(carrito.subTotal)}</p>
            </div>
            <div className="ContenedorValor">
              <h5>Envio</h5>
              <p>{formatearNumeroCOP(carrito.envio)}</p>
            </div>
            <hr style={{ color: "Black" }} />
            <div className="ContenedorValor">
              <h5>Total</h5>
              <p>{formatearNumeroCOP(carrito.total)}</p>
            </div>
            {/* <Link to="/carrito">
              <button
                className="botonCompra"
                disabled={!isAuthenticated ? true : false}
              >
                Finalizar compra
              </button>
            </Link> */}
            <Link to="/carrito">
              <button className="botonCompra">Ver Carrito</button>
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Carrito;
