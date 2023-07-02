import "./Card.css";
import fiat from "../../assets/fiat.svg";
import vl from "../../assets/ValeoOriginal.jpg";
import borsheung from "../../assets/borsheung.png";
import moog from "../../assets/moogModal.jpg";
import peugeot from "../../assets/peugeot.svg";
import citroen from "../../assets/citroen.svg";
import skoda from "../../assets/skoda.svg";
import renault from "../../assets/renault.svg";
import mb from "../../assets/mb.svg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Whatsapp } from "react-bootstrap-icons";
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
import vw from "../../assets/vw.svg";
import CantidadEnLaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import Swal from "sweetalert2";

const CardRep = ({ id, imagen, nombre, precio, marcaRep, marcas }) => {
  const [show, setShow] = useState(false);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const { carrito } = useSelector((state) => state);
  const dispatch = useDispatch();

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
              {marcas.map((mar) => (
                <div
                  key={mar.id}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <img src={vw} alt="Volkswagen" />
                  <h2>{mar.marca}</h2>
                </div>
              ))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contenedorBodyModal">
              <div className="contenedorImagenModal">
                <img src={imagen} alt={nombre} className="imagenModal" />
              </div>
              <div className=" contenedorInfo">
                <h3 className="tituloh3">{nombre}</h3>
                <h5 className="marcah5">{marcaRep.marcaRep}</h5>

                <div className="contenedorPrecioModal" style={{}}>
                  <h3 className="tituloPrecio">${precio}</h3>
                  {!mostrarComponente && carrito.cantidad === 0 ? (
                    <Button
                      variant="primary"
                      style={{ fontFamily: "Franklin Gothic Medium" }}
                      onClick={onClick}
                    >
                      Agregar
                    </Button>
                  ) : (
                    <CantidadEnLaCard repuesto={obj} id={id} precio={precio} />
                  )}
                </div>

                <div className="contenedorLogosCard">
                  <Link to="/repuestosVw">
                    <img src={vw} alt="volkswagen" className="logovwModal" />
                  </Link>
                  <br />
                  <Link to="/repuestosSk">
                    <img src={skoda} alt="skoda" className="logoSkModal" />
                  </Link>
                  <br />
                  <Link to="/repuestosFiat">
                    <img src={fiat} alt="fiat" className="logofiatModal" />
                  </Link>
                  <br />
                  <Link to="/repuestosPeugeot">
                    <img
                      src={peugeot}
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
                    <img src={mb} alt="mb" className="logombModal" />
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
          {marcas.map((marca) => {
            return (
              <div key={marca.id}>
                <h2 className="subtitulo">{marca.marca}</h2>
              </div>
            );
          })}
          <Card.Title className="titulo">{nombre}</Card.Title>
          <Card.Text className="texto">${precio}</Card.Text>

          <Card.Text className="texto">{marcaRep.marcaRep}</Card.Text>

          <div className="botones">
            <Button
              variant="primary"
              style={{ fontFamily: "Franklin Gothic Medium" }}
              onClick={onClick}
            >
              Agregar
            </Button>

            <Link
              to="https://api.whatsapp.com/send?phone=573134421215&text=Buen_día_estoy_buscando_Repuestos"
              className="link"
            >
              <Whatsapp className="whatsapp" />
            </Link>
            <div className="ContenedorCarrito">
              {mostrarComponente && <Carrito placement="end" name="end" />}
            </div>
          </div>
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
