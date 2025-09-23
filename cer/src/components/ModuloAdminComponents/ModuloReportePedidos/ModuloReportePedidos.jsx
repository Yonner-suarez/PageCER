import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { api } from "../../../Helpers/api";
import { pedidosAPI } from "../../../Helpers/url";
import { getColumnsReportePedidos } from "../../../data/reportePedidos";

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

  const handleEstadoChange = (idPedido, nuevoEstado) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === idPedido ? { ...pedido, estado: nuevoEstado } : pedido
      )
    );
    console.log(`Pedido ${idPedido} actualizado a ${nuevoEstado}`);
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <h3>Reporte de Pedidos</h3>
        <DataTable
          columns={getColumnsReportePedidos()}
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
