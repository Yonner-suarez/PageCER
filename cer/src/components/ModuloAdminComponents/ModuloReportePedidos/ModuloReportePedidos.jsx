import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { api } from "../../../Helpers/api";
import { pedidosAPI } from "../../../Helpers/url";
import { getColumnsReportePedidos } from "../../../data/reportePedidos";
import { getRoleFromToken, handleError } from "../../../Helpers/functions";

const ModuloReportes = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    const jwt = userObj.token;
    const role = getRoleFromToken(jwt);
    setRole(role);

    api
      .get(pedidosAPI.REPORTE)
      .then((res) => {
        setPedidos(res.data.data || []);
      })
      .catch((err) => console.error("Error cargando pedidos:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleEstadoChange = async (row, nuevoEstado) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.idPedido === row.idPedido
          ? {
              ...pedido,
              estadoPedido: nuevoEstado === 1 ? "Pendiente" : "Enviado",
            }
          : pedido
      )
    );

    try {
      const res = await api.put(
        pedidosAPI.ESTADOPEDIDO.replace("{idPedido}", row.idPedido).replace(
          "{estado}",
          nuevoEstado
        )
      );

      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: res.data.message,
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <h3>Reporte de Pedidos</h3>
        <DataTable
          columns={getColumnsReportePedidos(
            handleEstadoChange,
            role === "Logistica"
          )}
          data={pedidos}
          progressPending={loading}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default ModuloReportes;
