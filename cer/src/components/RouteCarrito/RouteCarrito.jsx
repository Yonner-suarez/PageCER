import { useSelector, useDispatch } from "react-redux";
import "./RouteCarrito.css";
import engine from "../../assets/engine.svg";
import CantidadEnlaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import { Whatsapp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-47e34156-124e-4b9c-8c4c-60c0285d719b");
import axios from "axios";
import Contacto from "../Contacto/Contacto";
import Footer from "../Footer/Footer";
//import motorRoto from "../../assets/motorRoto.svg";
import { ThreeCircles } from "react-loader-spinner";
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

  const onSubmit = async () => {
    try {
      const resp = await axios.post("/ordenDePago", carrito.local);

      window.location.href = resp.data;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    dispatch(obtenerCantidadesDelLocal());
    dispatch(obtenTotal());
  }, [dispatch]);

  return (
    <>
      <div className="contenedorCarritoComponente">
        {carrito.local.map((rep) => {
          return (
            <div className="card" key={rep.id}>
              <div className="contenedorImagenCarrito">
                <img src={rep.imagen} className="card-img-top" alt="..." />
              </div>
              <div className="cardCarrito">
                <div key={rep.marcas.idMarca}>
                  <h2 className="subtitulo">{rep.marcas.nombre}</h2>
                </div>

                <h5 className="card-title">{rep.nombre}</h5>
                <h5 className="card-title">{rep.marcaRep.marcaRep}</h5>
                <h5 className="card-title">{rep.calificacion}</h5>

                <div>
                  <Link
                    to="https://api.whatsapp.com/send?phone=573134421215&text=Buen_día_estoy_buscando_Repuestos"
                    className="linkCarrito"
                  >
                    <Whatsapp className="whatsapp" />
                  </Link>
                </div>
              </div>

              <div className="contenedorCantidades">
                {console.log(rep)}
                <CantidadEnlaCard
                  id={rep.id}
                  precio={rep.precio}
                  repuesto={rep}
                  repuestos={repuestos}
                />
              </div>
              <div className="contenedorPrecio">
                <h4 className="tituloPrecio">${rep.precio}</h4>
              </div>
            </div>
          );
        })}

        {carrito.local.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
              backgroundColor: "transparent",
            }}
          >
            <div style={{ width: "40%" }}>
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
            </div>

            {initMercadoPago.length ? (
              <div
                id="wallet_container"
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Wallet onError={false} onSubmit={onSubmit} />
              </div>
            ) : (
              <ThreeCircles
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            )}
          </div>
        ) : (
          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              margin: "0 auto",
            }}
          >
            <div>
              <img
                src={engine}
                alt="No hay productos"
                style={{ width: "40%" }}
              />
            </div>
            <h2>No tienes productos</h2>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h5>vamos a comprar</h5>
            </Link>
          </div>
        )}
      </div>
      <div className="contenedorFooter">
        <Contacto />
        <Footer />
      </div>
    </>
  );
};

export default RouteCarrito;
