import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { api } from "../../Helpers/api";
import { pedidosAPI } from "../../Helpers/url";
import { handleError } from "../../Helpers/functions";
import DataTable from "react-data-table-component";
import { getColumnsDetalles } from "../../data/pedidos";

const ModalDetallePedido = ({ show, onHide, idPedido }) => {
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Al abrir el modal, obtener detalle del pedido
  useEffect(() => {
    const obtenerDetalle = async () => {
      if (!idPedido) return;

      try {
        setLoading(true);
        const { data, status } = await api.get(
          pedidosAPI.PEDIDODETALLE.replace("{idPedido}", idPedido)
        );

        if (status === 200 && data.data) {
          setDetalle(data.data);
        } else {
          Swal.fire("Atención", "No se encontró detalle del pedido", "warning");
          setDetalle(null);
        }
      } catch (error) {
        handleError(error);
        setDetalle(null);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      obtenerDetalle();
    }
  }, [show, idPedido]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle del Pedido #{idPedido}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Cargando detalle...</p>
        ) : !detalle ? (
          <p>No hay información disponible.</p>
        ) : (
          <>
            <div className="mb-3">
              <div className="row mb-2">
                <div className="col-4">
                  <strong>Estado de Envío:</strong>
                </div>
                <div className="col-8">{detalle.estado}</div>
              </div>

              <div className="row mb-2">
                <div className="col-4">
                  <strong>Estado de Pago:</strong>
                </div>
                <div className="col-8">
                  {detalle.estadoPago === null || detalle.estadoPago === 0
                    ? "Pendiente de pago"
                    : "Pagado"}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-4">
                  <strong>Fecha:</strong>
                </div>
                <div className="col-8">
                  {new Date(detalle.fechaPedido).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  {new Date(detalle.fechaPedido).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-4">
                  <strong>Nro Guía:</strong>
                </div>
                <div className="col-8">{detalle.nroGuia || "No asignado"}</div>
              </div>

              <div className="row mb-2">
                <div className="col-4">
                  <strong>Transportadora:</strong>
                </div>
                <div className="col-8">
                  {detalle.enlaceTransportadora ? (
                    <a
                      href={detalle.enlaceTransportadora}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rastrear envío
                    </a>
                  ) : (
                    "No disponible"
                  )}
                </div>
              </div>
            </div>

            {/* 🔹 Tabla de productos */}
            <DataTable
              columns={getColumnsDetalles()}
              data={detalle.productos || []}
              pagination
              highlightOnHover
              responsive
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallePedido;
