import { useSelector, useDispatch } from "react-redux";
import "./CantidadEnLaCard";
import { aumentarCantidad, quitarcantidad } from "../../redux/slices/repuestos";

const CantidadEnLaCard = ({ id }) => {
  const dispatch = useDispatch();
  const { cantidad } = useSelector((state) => state.repuestos);

  console.log(cantidad);

  const unoMas = () => {
    if (cantidad >= 5) return;
    dispatch(aumentarCantidad(1));
  };
  const unoMenos = () => {
    if (cantidad <= 0) return;
    dispatch(quitarcantidad(1));
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button onClick={unoMas}>+</button>
      <p>{cantidad}</p>
      <button onClick={unoMenos}>-</button>
    </div>
  );
};

export default CantidadEnLaCard;
