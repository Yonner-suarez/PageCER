import "./RepuestosVw.css";
import { useDispatch, useSelector } from "react-redux";
import CardRep from "../Card/Card";
import { useEffect, useState } from "react";
import { getRepuestos } from "../../redux/slices/repuestos";
import { obtenerCantidades } from "../../redux/slices/carrito";
import ReactPaginate from "react-paginate";
import { ThreeCircles } from "react-loader-spinner";
import Loading from "../Loading/Loading";

const RepuestosVw = () => {
  const { repuestos } = useSelector((state) => state.repuestos);
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const filtro = {
      IdMarca: 1,
    };
    setShowLoading({ display: "block" });
    dispatch(getRepuestos(filtro));
    dispatch(obtenerCantidades());
    setShowLoading({ display: "none" });
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
      <Loading estilo={showLoading}></Loading>
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
              descripcion={repuesto.descripcion}
              cantidadReal={repuesto.cantidadReal}
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
        <div className="contenedorSinProductos">
          <p>No hay productos disponibles 😞</p>
        </div>
      )}
    </>
  );
};

export default RepuestosVw;
