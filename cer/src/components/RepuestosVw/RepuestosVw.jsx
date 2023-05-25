import "./RepuestosVw.css";
import gif from "../../assets/loader.gif";
import { useDispatch, useSelector } from "react-redux";
import CardRep from "../Card/Card";
import { useEffect } from "react";
import { getRepuestos } from "../../redux/slices/repuestos";
import Paginado from "../Paginado/Paginado";

const RepuestosVw = () => {
  const { repuestos } = useSelector((state) => state.repuestos);
  const { numPage } = useSelector((state) => state.numPage);

  const dispatch = useDispatch();

  let inicio = (numPage - 1) * 6,
    hasta = numPage * 6;

  let cantidadPages = Math.floor(repuestos.length / 6);

  let viewRep = repuestos.slice(inicio, hasta);

  useEffect(() => {
    dispatch(getRepuestos());
  }, [dispatch]);

  return (
    <>
      {repuestos.length ? (
        <div className="contenedorCartas">
          {repuestos.length
            ? viewRep.map((repuesto) => {
                return (
                  <CardRep
                    key={repuesto.id}
                    id={repuesto.id}
                    imagen={repuesto.imagen}
                    nombre={repuesto.nombre}
                    precio={repuesto.precio}
                    calificacion={repuesto.calificacion}
                    marcaRep={repuesto.MarcaRep}
                    marcas={repuesto.Marcas}
                  />
                );
              })
            : null}
          <div className="paginado">
            <Paginado cantidadPages={cantidadPages} />
          </div>
        </div>
      ) : (
        <div className="contenedorLoading">
          <img src={gif} alt="loading..." className="gif" />
        </div>
      )}
    </>
  );
};

export default RepuestosVw;
