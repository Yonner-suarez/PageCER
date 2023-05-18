import "./RepuestosVw.css";
import { useSelector } from "react-redux";
import CardRep from "../Card/Card";

const RepuestosVw = () => {
  const { repuestos } = useSelector((state) => state.repuestos);
  console.log(repuestos);

  return (
    <div className="contenedorCartas">
      {repuestos.map((repuesto) => {
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
      })}
    </div>
  );
};

export default RepuestosVw;
