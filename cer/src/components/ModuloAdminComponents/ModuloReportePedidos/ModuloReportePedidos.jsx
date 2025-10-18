import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { api } from "../../../Helpers/api";
import { pedidosAPI } from "../../../Helpers/url";
import { getColumnsReportePedidos } from "../../../data/reportePedidos";
import { getRoleFromToken, handleError } from "../../../Helpers/functions";
import Loading from "../../Loading/Loading";

const ModuloReportes = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosEditados, setPedidosEditados] = useState({});
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [guardado, setGuardado] = useState({}); // nuevo estado
  const [showLoading, setShowLoading] = useState({ display: "none" });

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

  const handlePedidoChangeLocal = (row, campo, valor) => {
    setPedidosEditados((prev) => ({
      ...prev,
      [row.idPedido]: {
        ...prev[row.idPedido],
        [campo]: valor,
      },
    }));
  };
  const handleGuardarPedido = async (row) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.idPedido === row.idPedido
          ? { ...pedido, ...pedidosEditados[row.idPedido] }
          : pedido
      )
    );
    setGuardado((prev) => ({
      ...prev,
      [row.idPedido]: true,
    }));

    // Opcional: limpiar edición
    setPedidosEditados((prev) => {
      const copy = { ...prev };
      delete copy[row.idPedido];
      return copy;
    });

    const cambios = pedidosEditados[row.idPedido] || {};
    const payload = {
      estado: cambios.estadoPedido === "Enviado" ? 1 : 0,
      NroGuia: cambios.nroGuia || "",
      EnlaceTransportadora: cambios.enlaceTransportadora || "",
    };

    try {
      setShowLoading({ display: "block" });
      const res = await api.put(
        pedidosAPI.ESTADOPEDIDO.replace("{idPedido}", row.idPedido),
        payload
      );

      setShowLoading({ display: "none" });
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: res.data.message,
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      setShowLoading({ display: "none" });
      handleError(err);
    }
  };

  return (
    <>
      <Loading estilo={showLoading}></Loading>
      <div
        style={{ padding: "20px", display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "80%" }}>
          <h3>Reporte de Pedidos</h3>
          <DataTable
            columns={getColumnsReportePedidos(
              handlePedidoChangeLocal,
              handleGuardarPedido,
              role === "Logistica",
              pedidosEditados,
              guardado
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
    </>
  );
};

export default ModuloReportes;
