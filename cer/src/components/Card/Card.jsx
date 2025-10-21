import "./Card.css";
import vl from "../../assets/ValeoOriginal.jpg";
import borsheung from "../../assets/borsheung.png";
import moog from "../../assets/moogModal.jpg";
import citroen from "../../assets/citroen.svg";
import renault from "../../assets/renault.svg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  añadeCarrito,
  subTotal,
  localStorageToState,
  obtenTotal,
} from "../../redux/slices/carrito";
import PropTypes from "prop-types";
import Carrito from "../Carrito/Carrito";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Volkswagen from "../../assets/vw.svg";
import Fiat from "../../assets/fiat.svg";
import Peugeot from "../../assets/peugeot.svg";
import Skoda from "../../assets/skoda.svg";
import MercedezBenz from "../../assets/mb.svg";
import Logo from "../../assets/SoloLogo.svg";

import CantidadEnLaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import Swal from "sweetalert2";
import formatearNumeroCOP from "../Carrito/utils/formaterCOP";

const logos = {
  Volkswagen,
  Fiat,
  Peugeot,
  Skoda,
  "Mercedez Benz": MercedezBenz,
};

const CardRep = ({
  id,
  imagen,
  nombre,
  precio,
  marcaRep,
  marcas,
  descripcion,
  cantidadReal,
}) => {
  const [show, setShow] = useState(false);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const { carrito } = useSelector((state) => state);
  const { repuestos } = useSelector((state) => state.repuestos);
  const dispatch = useDispatch();
  const logo = logos[marcas.nombre] || null;

  const modal = () => {
    setShow(true);
  };

  const obj = {
    id,
    imagen,
    nombre,
    precio,
    marcaRep,
    marcas,
  };

  const onClick = async () => {
    dispatch(
      añadeCarrito(
        1,
        {
          id,
          imagen,
          nombre,
          precio,
          marcaRep,
          marcas,
        },
        id
      )
    );
    dispatch(localStorageToState());
    dispatch(subTotal(precio));
    dispatch(obtenTotal());
    setMostrarComponente(true);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "success",
      title: "Producto añadido correctamente",
    });
  };

  const buscaElProductoActual = carrito.local.find((rep) => rep.id === id);

  return (
    <Card key={id} className="Contenedorcard">
      <div className="contenedorSubCard">
        <button
          style={{ border: "none", backgroundColor: "transparent" }}
          onClick={modal}
        >
          <Card.Img variant="left" src={imagen} className="imagenRep" />
        </button>

        <Modal
          show={show}
          className="Modal"
          onHide={() => setShow(false)}
          dialogClassName="modal-dialog modal-xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <div
                key={marcas.id}
                style={{ display: "flex", flexDirection: "row" }}
              >
                {logo ? (
                  <img src={logo} alt={marcas.marca} />
                ) : (
                  <img src={Logo} alt="logo" /> // fallback si no existe imagen
                )}
                <h2>{marcas.marca}</h2>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contenedorBodyModal">
              <div className="contenedorImagenModal">
                <img src={imagen} alt={nombre} className="imagenModal" />
              </div>
              <div className=" contenedorInfo">
                <h3 className="tituloh3">{descripcion}</h3>
                <h5 className="marcah5">{marcaRep.marcaRep}</h5>

                <div className="contenedorPrecioModal" style={{}}>
                  <h3 className="tituloPrecio">{formatearNumeroCOP(precio)}</h3>
                  {!mostrarComponente && !buscaElProductoActual ? (
                    <Button
                      variant="primary"
                      style={{ fontFamily: "Franklin Gothic Medium" }}
                      onClick={onClick}
                    >
                      Agregar
                    </Button>
                  ) : (
                    <CantidadEnLaCard
                      repuesto={obj}
                      id={id}
                      precio={precio}
                      repuestos={repuestos}
                    />
                  )}
                </div>

                <div className="contenedorLogosCard">
                  <Link to="/repuestosVw">
                    <img
                      src={Volkswagen}
                      alt="volkswagen"
                      className="logovwModal"
                    />
                  </Link>
                  <br />
                  <Link to="/repuestosSk">
                    <img src={Skoda} alt="skoda" className="logoSkModal" />
                  </Link>
                  <br />
                  <Link to="/repuestosFiat">
                    <img src={Fiat} alt="fiat" className="logofiatModal" />
                  </Link>
                  <br />
                  <Link to="/repuestosPeugeot">
                    <img
                      src={Peugeot}
                      alt="peugeot"
                      className="logoPeugeotModal"
                    />
                  </Link>
                  <br />
                  <Link to="/repuestosCitroen">
                    <img
                      src={citroen}
                      alt="citroen"
                      className="logoCitroenModal"
                    />
                  </Link>
                  <br />
                  <Link to="/repuestosMb">
                    <img src={MercedezBenz} alt="mb" className="logombModal" />
                  </Link>
                  <Link to="/repuestosRenault">
                    <img
                      src={renault}
                      alt="renault"
                      className="logorenaultModal"
                    />
                  </Link>
                </div>
              </div>
              <div className="contenedorCarrito">
                <img src={vl} alt="Valeo" className="imagenRepuesto" />
                <img
                  src={borsheung}
                  alt="borsheung"
                  className="imagenRepuesto"
                />
                <img src={moog} alt="Moog" className="imagenRepuesto" />
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Card.Body className="bodyCard">
          <div key={marcas.id}>
            <h2 className="subtitulo">{marcas.marca}</h2>
          </div>
          <Card.Title className="titulo">{nombre}</Card.Title>
          <Card.Text className="texto">{formatearNumeroCOP(precio)}</Card.Text>

          <Card.Text className="texto">{marcaRep.marcaRep}</Card.Text>

          {cantidadReal > 0 ? (
            <div className="botones">
              <Button
                variant="primary"
                style={{ fontFamily: "Franklin Gothic Medium" }}
                onClick={onClick}
              >
                Comprar
              </Button>

              <div className="ContenedorCarrito">
                {mostrarComponente && <Carrito placement="end" name="end" />}
              </div>
            </div>
          ) : (
            <div
              className="agotado"
              style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}
            >
              Agotado
            </div>
          )}
        </Card.Body>
      </div>
    </Card>
  );
};

CardRep.propTypes = {
  id: PropTypes.number.isRequired,
  imagen: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  precio: PropTypes.string.isRequired,
  marcaRep: PropTypes.object.isRequired,
  marcas: PropTypes.array.isRequired,
};
export default CardRep;
