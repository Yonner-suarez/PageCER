import { useSelector, useDispatch } from "react-redux";
import "./CantidadEnLaCard.css";
import { aumentarCantidad, quitarcantidad } from "../../redux/slices/repuestos";
import { FilePlusFill, FileMinusFill } from "react-bootstrap-icons";
import { añadeCarrito } from "../../redux/slices/carrito";

const CantidadEnLaCard = () => {
  const dispatch = useDispatch();
  const { cantidad } = useSelector((state) => state.repuestos);

  const unoMas = () => {
    if (cantidad >= 5) return;
    dispatch(aumentarCantidad(1));
    dispatch(añadeCarrito(1));
  };
  const unoMenos = () => {
    if (cantidad <= 0) return;
    dispatch(quitarcantidad(1));
  };

  return (
    <div className="contenedorCantidadRepuestos">
      <FilePlusFill
        style={{ width: "25%", height: "auto", fontWeight: "bold" }}
        onClick={unoMas}
      />

      <p className="cantidades">{cantidad}</p>

      <FileMinusFill
        style={{ width: "25%", height: "auto" }}
        onClick={unoMenos}
      />
    </div>
  );
};

export default CantidadEnLaCard;
