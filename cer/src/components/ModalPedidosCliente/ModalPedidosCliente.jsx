import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { api } from "../../Helpers/api";
import { pedidosAPI } from "../../Helpers/url";
import { handleError } from "../../Helpers/functions";
import DataTable from "react-data-table-component";
import { getPedidosColumns } from "../../data/pedidos";
import ModalDetallePedido from "./ModalDetallePedido";
import { useNavigate } from "react-router-dom";

const ModalPedidosCliente = ({ show, onHide }) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detalleId, setDetalleId] = useState(null);
  const [showDetalle, setShowDetalle] = useState(false);

  const navigate = useNavigate();

  const handleVerDetalle = (idPedido) => {
    setDetalleId(idPedido);
    setShowDetalle(true);
  };

  // 🔹 Al abrir el modal, obtener pedidos del cliente
  useEffect(() => {
    const obtenerPedidos = async () => {
      setLoading(true);
      try {
        const { data, status } = await api.get(pedidosAPI.PEDIDOS);

        if (status === 200 && data.data) {
          setPedidos(data.data);
        } else {
          Swal.fire(
            "Atención",
            "No se encontraron pedidos del cliente",
            "warning"
          );
          setPedidos([]);
        }
      } catch (error) {
        handleError(error);
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      obtenerPedidos();
    }
  }, [show]);

  const handlePagar = (idPedido) => {
    navigate("/formulario_compra/" + idPedido);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Pedidos del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            columns={getPedidosColumns(handlePagar, handleVerDetalle)}
            data={pedidos}
            progressPending={loading}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noDataComponent="No hay pedidos disponibles."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalDetallePedido
        show={showDetalle}
        onHide={() => setShowDetalle(false)}
        idPedido={detalleId}
      />
    </>
  );
};

export default ModalPedidosCliente;
