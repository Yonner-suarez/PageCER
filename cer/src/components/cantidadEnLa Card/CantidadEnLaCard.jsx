import { useSelector, useDispatch } from "react-redux";
import "./CantidadEnLaCard.css";
import { FilePlusFill, FileMinusFill } from "react-bootstrap-icons";
import { añadeCarrito } from "../../redux/slices/carrito";
import PropTypes from "prop-types";

const CantidadEnLaCard = ({ repuesto, id }) => {
  const dispatch = useDispatch();
  const { carrito } = useSelector((state) => state);

  console.log(carrito);

  const unoMas = () => {
    if (carrito.cantidad >= 5) return;

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

      {/* <p className="cantidades">{cantidad[0]}</p> */}

      <FileMinusFill
        style={{ width: "25%", height: "auto" }}
        onClick={unoMenos}
      />
    </div>
  );
};

CantidadEnLaCard.PropTypes = {
  repuesto: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default CantidadEnLaCard;
