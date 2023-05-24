import { useSelector, useDispatch } from "react-redux";
import "./CantidadEnLaCard";
import {
  restaUnProduto,
  sumaUnProducto,
} from "../../redux/slices/numeroDeProductos";

const CantidadEnLaCard = ({ id }) => {
  const dispatch = useDispatch();
  const { numeroDeProductos } = useSelector((state) => state.numeroDeProductos);

  const unoMas = () => {
    if (numeroDeProductos[0].cantidad >= 5) return;
    dispatch(sumaUnProducto(1, id));
  };
  const unoMenos = () => {
    if (numeroDeProductos[0].cantidad <= 0) return;
    dispatch(restaUnProduto(1, id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button onClick={unoMas}>+</button>
      <p>{numeroDeProductos[0].cantidad}</p>
      <button onClick={unoMenos}>-</button>
    </div>
  );
};

export default CantidadEnLaCard;
