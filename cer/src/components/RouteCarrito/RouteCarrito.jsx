import { useSelector, useDispatch } from "react-redux";
import "./RouteCarrito.css";
import engine from "../../assets/engine.svg";
import CantidadEnlaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import { Whatsapp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Contacto from "../Contacto/Contacto";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import {
  obtenTotal,
  obtenerCantidadesDelLocal,
} from "../../redux/slices/carrito";
import formatearNumeroCOP from "../Carrito/utils/formaterCOP";

const RouteCarrito = () => {
  const dispatch = useDispatch();
  const { carrito } = useSelector((state) => state);
  const { repuestos } = useSelector((state) => state.repuestos);

  useEffect(() => {
    dispatch(obtenerCantidadesDelLocal());
    dispatch(obtenTotal());
  }, [dispatch]);

  return (
    <>
      <div className="container my-4">
        {carrito.local.length ? (
          <div className="row">
            {/* Lista de productos */}
            <div className="col-md-8">
              {carrito.local.map((rep) => (
                <div className="card mb-3 shadow-sm" key={rep.id}>
                  <div className="row g-0 align-items-center">
                    {/* Imagen */}
                    <div className="col-md-3 d-flex justify-content-center p-2">
                      <img
                        src={rep.imagen}
                        className="img-fluid rounded"
                        alt={rep.nombre}
                        style={{ maxHeight: "120px", objectFit: "contain" }}
                      />
                    </div>

                    {/* Info del producto */}
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title text-primary fw-bold">
                          {rep.marcas.nombre}
                        </h5>
                        <p className="mb-1">{rep.nombre}</p>
                        <p className="mb-1 text-muted">
                          {rep.marcaRep.marcaRep}
                        </p>
                        <p className="mb-2">⭐ {rep.calificacion}</p>

                        <Link
                          to="https://api.whatsapp.com/send?phone=573134421215&text=Buen_día_estoy_buscando_Repuestos"
                          className="btn btn-success btn-sm"
                        >
                          <Whatsapp className="me-2" />
                          Contactar
                        </Link>
                      </div>
                    </div>

                    {/* Cantidad y Precio */}
                    <div className="col-md-3 text-center p-2">
                      <CantidadEnlaCard
                        id={rep.id}
                        precio={rep.precio}
                        repuesto={rep}
                        repuestos={repuestos}
                      />
                      <h4 className="mt-2 text-dark fw-bold">${rep.precio}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de compra */}
            <div className="col-md-4">
              <div
                className="card shadow-sm p-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 className="fw-bold text-center mb-3">Resumen</h4>
                <div className="d-flex justify-content-between">
                  <span>SubTotal</span>
                  <span>{formatearNumeroCOP(carrito.subTotal)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Envío</span>
                  <span>{formatearNumeroCOP(carrito.envio)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>{formatearNumeroCOP(carrito.total)}</span>
                </div>

                <div className="text-center mt-3">
                  <Link
                    to="/formulario_compra"
                    className="btn"
                    style={{
                      backgroundColor: "#7986CB",
                      color: "white",
                      padding: "5px 20px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Pagar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Carrito vacío
          <div className="text-center my-5">
            <img
              src={engine}
              alt="No hay productos"
              className="img-fluid mb-3"
              style={{ maxWidth: "200px" }}
            />
            <h2 className="text-muted">No tienes productos</h2>
            <Link to="/" className="btn btn-primary mt-2">
              Vamos a comprar
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5">
        <Contacto />
        <Footer />
      </div>
    </>
  );
};

export default RouteCarrito;
