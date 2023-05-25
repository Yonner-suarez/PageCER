import { useSelector, useDispatch } from "react-redux";
import "./CantidadEnLaCard.css";
import { FilePlusFill, FileMinusFill } from "react-bootstrap-icons";
import {
  añadeCarrito,
  subTotal,
  qutarCarrito,
  bajarPrecio,
} from "../../redux/slices/carrito";
import PropTypes from "prop-types";

const CantidadEnLaCard = ({ repuesto, id, precio }) => {
  const dispatch = useDispatch();
  const { carrito } = useSelector((state) => state);

  const unoMas = () => {
    const find = carrito.producto.find((pro) => pro.id == id);

    if (find.cantidad >= 5) return;

    dispatch(subTotal(precio));
    dispatch(añadeCarrito(1, repuesto, id));
  };
  const unoMenos = () => {
    const find = carrito.producto.find((pro) => pro.id == id);

    if (find.cantidad <= 0) return;
    dispatch(bajarPrecio(precio));
    dispatch(qutarCarrito(1, id));
  };

  return (
    <div className="contenedorCantidadRepuestos">
      <FilePlusFill
        style={{ width: "25%", height: "auto", fontWeight: "bold" }}
        onClick={unoMas}
      />

      {carrito.producto.map((pro) => {
        if (pro.id == id) {
          return (
            <div key={id}>
              <p>{pro.cantidad}</p>
            </div>
          );
        }
      })}

      <FileMinusFill
        style={{ width: "25%", height: "auto" }}
        onClick={unoMenos}
      />
    </div>
  );
};

CantidadEnLaCard.PropTypes = {
  repuesto: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
};

export default CantidadEnLaCard;
