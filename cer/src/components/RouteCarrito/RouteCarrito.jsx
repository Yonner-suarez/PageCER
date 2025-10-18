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
      <div
        className="container-fluid my-4"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {carrito.local.length ? (
          <div
            className="column"
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {/* Lista de productos */}
            <div className="col-md-8 mx-auto" style={{ width: "50%" }}>
              {carrito.local.map((rep) => (
                <div
                  className="card mb-4 shadow-sm border-0 rounded-4"
                  key={rep.id}
                  style={{ overflow: "hidden" }}
                >
                  <div className="d-flex align-items-center p-3 flex-wrap">
                    {/* Imagen */}
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "140px",
                        height: "140px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={rep.imagen}
                        alt={rep.nombre}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* Info del producto */}
                    <div className="flex-grow-1 px-4">
                      <h5 className="text-primary fw-bold mb-1">
                        {rep.marcas.nombre}
                      </h5>
                      <p className="mb-1 fw-semibold">{rep.nombre}</p>
                      <p className="mb-2 text-muted small">
                        {rep.marcaRep.marcaRep}
                      </p>
                      <Link
                        to="https://api.whatsapp.com/send?phone=573134421215&text=Buen_día_estoy_buscando_Repuestos"
                        className="btn btn-success btn-sm px-3"
                      >
                        <Whatsapp className="me-2" />
                        Contactar
                      </Link>
                    </div>

                    {/* Cantidad y Precio */}
                    <div
                      className="text-center d-flex flex-column align-items-center justify-content-center"
                      style={{ minWidth: "140px" }}
                    >
                      <CantidadEnlaCard
                        id={rep.id}
                        precio={rep.precio}
                        repuesto={rep}
                        repuestos={repuestos}
                      />
                      <h5 className="mt-2 fw-bold text-dark">
                        ${rep.precio.toLocaleString("es-CO")}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de compra */}
            <div
              className="col-md-4"
              style={{
                display: "flex",
                height: "50%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div
                className="card shadow-sm p-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
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
