import { numPageNext, numPagePrevius } from "../../redux/slices/paginado";
import { useSelector, useDispatch } from "react-redux";
import {
  CaretRightSquareFill,
  CaretLeftSquareFill,
} from "react-bootstrap-icons";
import "./Paginado.css";

const Paginado = ({ cantidadPages }) => {
  const { numPage } = useSelector((state) => state.numPage);

  const dispatch = useDispatch();

  const next = () => {
    dispatch(numPageNext());
  };

  const previus = () => {
    dispatch(numPagePrevius());
  };

  return (
    <footer className="foot">
      <button
        onClick={previus}
        className="next"
        disabled={numPage === 1 ? true : false}
      >
        <CaretLeftSquareFill style={{ width: "80%", height: "auto" }} />
      </button>
      <br />
      <p className="numPages">
        {numPage} OF {cantidadPages + 1}
      </p>
      <br />
      <button
        onClick={next}
        className="next"
        disabled={numPage === cantidadPages + 1 ? true : false}
      >
        <CaretRightSquareFill style={{ width: "80%", height: "auto" }} />
      </button>
    </footer>
  );
};

export default Paginado;
