import { useSelector, useDispatch } from "react-redux";
import "./CantidadEnLaCard.css";
import { FilePlusFill, FileMinusFill } from "react-bootstrap-icons";
import { añadeCarrito, subTotal } from "../../redux/slices/carrito";
import PropTypes from "prop-types";

const CantidadEnLaCard = ({ repuesto, id, precio }) => {
  const dispatch = useDispatch();
  const { carrito } = useSelector((state) => state);

  const unoMas = () => {
    const limite = carrito.producto.map((pro) => pro.cantidad);

    for (const cant of limite) {
      console.log(cant);
      if (limite[cant] >= 5) return;
      dispatch(subTotal(precio));
    }
    dispatch(añadeCarrito(1, repuesto, id));
  };
  const unoMenos = () => {
    if (carrito.cantidad <= 0) return;
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
