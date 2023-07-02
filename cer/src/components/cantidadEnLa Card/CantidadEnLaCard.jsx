import { useSelector, useDispatch } from "react-redux";
import "./CantidadEnLaCard.css";
import { FilePlusFill, FileMinusFill } from "react-bootstrap-icons";
import {
  añadeCarrito,
  subTotal,
  qutarCarrito,
  bajarPrecio,
  localStorageToState,
  obtenTotal,
} from "../../redux/slices/carrito";
import PropTypes from "prop-types";

const CantidadEnLaCard = ({ repuesto, id, precio }) => {
  const dispatch = useDispatch();
  const { carrito } = useSelector((state) => state);

  const unoMas = () => {
    const find = carrito.local.find((pro) => pro.id == id);

    if (find.cantidad >= 5) return;

    dispatch(añadeCarrito(1, repuesto, id));
    dispatch(localStorageToState());
    dispatch(subTotal(precio));
    dispatch(obtenTotal());
  };

  const unoMenos = () => {
    const find = carrito.local.find((pro) => pro.id == id);

    if (find.cantidad <= 0) return;
    dispatch(qutarCarrito(id, 1));
    dispatch(localStorageToState());
    dispatch(bajarPrecio(precio));
    dispatch(obtenTotal());
  };

  // useEffect(() => {
  //   dispatch(obtenerCantidadesDelLocal());
  //   dispatch(obtenTotal());
  // }, [dispatch]);

  return (
    <div className="contenedorCantidadRepuestos">
      <FilePlusFill
        style={{
          width: "25%",
          height: "auto",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={unoMas}
      />

      {carrito.local.map((pro) => {
        if (pro.id == id) {
          return (
            <div key={id}>
              <p className="cantidad">{pro.cantidad}</p>
            </div>
          );
        }
      })}

      <FileMinusFill
        style={{ width: "25%", height: "auto", cursor: "pointer" }}
        onClick={unoMenos}
      />
    </div>
  );
};

CantidadEnLaCard.propTypes = {
  repuesto: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  precio: PropTypes.string.isRequired,
};

export default CantidadEnLaCard;
