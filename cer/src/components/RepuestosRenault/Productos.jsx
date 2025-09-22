import "./Productos.css";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getRepuestos } from "../../redux/slices/repuestos";
import { obtenerCantidades } from "../../redux/slices/carrito";
import CardRep from "../Card/Card";
import ReactPaginate from "react-paginate";

const RepuestosRenault = () => {
  const { repuestos } = useSelector((state) => state.repuestos);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getRepuestos());
    dispatch(obtenerCantidades());
  }, [dispatch]);

  // Paginación
  const pageCount = Math.ceil(repuestos?.data?.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems =
    repuestos?.data?.slice(offset, offset + itemsPerPage) || [];

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {repuestos?.data?.length ? (
        <div className="contenedorCartas">
          {currentItems.map((repuesto) => (
            <CardRep
              key={repuesto.idProducto}
              id={repuesto.idProducto}
              imagen={`data:image/png;base64,${repuesto.image}`} // si tu backend manda base64
              nombre={repuesto.nombre}
              precio={repuesto.precio?.toString()}
              marcaRep={repuesto.marca?.nombre}
              marcas={repuesto.marca}
            />
          ))}

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      ) : (
        <div className="contenedorLoading">
          <ThreeCircles
            height="100%"
            width="100%"
            color="blue"
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        </div>
      )}
    </>
  );
};
export default RepuestosRenault;
