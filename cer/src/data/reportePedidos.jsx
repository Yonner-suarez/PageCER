// columnsReportePedidos.js
export const getColumnsReportePedidos = (handleEstadoChange, showActions) => {
  const baseColumns = [
    {
      name: "ID Pedido",
      selector: (row) => row.idPedido,
      sortable: true,
      width: "100px",
    },
    {
      name: "Fecha",
      selector: (row) => new Date(row.fechaPedido).toLocaleString(),
      sortable: true,
      width: "180px",
    },
    {
      name: "Cliente",
      selector: (row) => row.nombreCliente,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correoCliente,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estadoPedido,
      sortable: true,
      width: "120px",
      cell: (row) => (
        <span
          style={{
            color: row.estadoPedido === "Pendiente" ? "#F59E0B" : "#16A34A",
            fontWeight: "bold",
          }}
        >
          {row.estadoPedido}
        </span>
      ),
    },
    {
      name: "N° líneas",
      selector: (row) => row.nroLineas,
      sortable: true,
      width: "100px",
    },
    {
      name: "Total Productos",
      selector: (row) => row.totalProductos,
      sortable: true,
      width: "130px",
    },
    {
      name: "Total Pedido",
      selector: (row) => `$${row.totalPedido.toLocaleString()}`,
      sortable: true,
      width: "120px",
    },
    {
      name: "Productos",
      selector: (row) => row.productoPedido,
      cell: (row) => (
        <ul style={{ paddingLeft: "15px" }}>
          {row.productoPedido.map((p, idx) => (
            <li key={idx}>
              {p.nombre || p.descripcion} - {p.cantidad} x $
              {p.precioUnitario.toLocaleString()}
            </li>
          ))}
        </ul>
      ),
      grow: 2,
    },
  ];

  if (showActions) {
    baseColumns.push({
      name: "Acciones",
      cell: (row) => (
        <select
          defaultValue={row.estadoPedido}
          style={{ padding: "4px", borderRadius: "4px" }}
          onChange={(e) => handleEstadoChange(row, e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Enviado">Enviado</option>
        </select>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  return baseColumns;
};

export default getColumnsReportePedidos;
