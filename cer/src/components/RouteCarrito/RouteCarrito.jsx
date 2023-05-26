import { useSelector } from "react-redux";
import "./RouteCarrito.css";
import CantidadEnlaCard from "../cantidadEnLa Card/CantidadEnLaCard";
import { Whatsapp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const RouteCarrito = () => {
  const { carrito } = useSelector((state) => state);

  return (
    // <div className="contenedorCarritoComponente">
    //   <h3>Tus productos</h3>
    //   {carrito.producto.map}
    // </div>
    <div className="contenedorCarritoComponente">
      {carrito.producto.map((rep) => {
        return (
          <div className="card" key={rep.id}>
            <div className="contenedorImagenCarrito">
              <img src={rep.imagen} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              {rep.marcas.map((marca) => {
                return (
                  <div key={marca.id}>
                    <h2 className="subtitulo">{marca.marca}</h2>
                  </div>
                );
              })}
              <h5 className="card-title">{rep.nombre}</h5>
              <h5 className="card-title">{rep.marcaRep.marcaRep}</h5>
              <h5 className="card-title">{rep.calificacion}</h5>

              <p className="card-text">
                <Link
                  to="https://api.whatsapp.com/send?phone=573134421215&text=Buen_día_estoy_buscando_Repuestos"
                  className="linkCarrito"
                >
                  <Whatsapp className="whatsapp" />
                </Link>
              </p>
            </div>

            <div className="contenedorCantidades">
              <CantidadEnlaCard
                id={rep.id}
                precio={rep.precio}
                repuesto={rep}
              />
            </div>
            <div className="contenedorPrecio">
              <h4 className="tituloPrecio">${rep.precio}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RouteCarrito;
