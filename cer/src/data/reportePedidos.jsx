import { AiFillSave } from "react-icons/ai";
// columnsReportePedidos.js
export const getColumnsReportePedidos = (
  handlePedidoChange,
  handleGuardarPedido,
  showActions,
  pedidosEditados,
  guardado
) => {
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
      name: "Estado Pago",
      selector: (row) => `${row.estadoPago.toLocaleString()}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Productos",
      selector: (row) => row.productoPedido,
      cell: (row) => (
        <ul style={{ paddingLeft: "15px" }}>
          {row.productoPedido?.map((p, idx) => (
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

  baseColumns.push(
    {
      name: "NroGuia",
      width: "150px",
      cell: (row) => {
        if (!showActions && row.nroGuia !== null) {
          // Caso: no puede ver acciones pero hay nroGuia → mostrar valor disabled
          return (
            <input
              type="text"
              value={row.nroGuia}
              disabled
              style={{
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          );
        }

        if (showActions) {
          return (
            <input
              type="text"
              value={
                pedidosEditados[row.idPedido]?.nroGuia ?? row.nroGuia ?? ""
              }
              disabled={!showActions || guardado[row.idPedido]}
              style={{
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
              onChange={(e) =>
                handlePedidoChange(row, "nroGuia", e.target.value)
              }
            />
          );
        }

        return null; // Si no cumple condiciones → no mostrar
      },
    },
    {
      name: "Enlace",
      width: "300px",
      cell: (row) => {
        if (!showActions && row.nroGuia !== null && row.enlaceTransportadora) {
          // Caso: no puede ver acciones pero hay enlace
          return (
            <a
              href={row.enlaceTransportadora}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                display: "inline-block",
                textAlign: "center",
                cursor: "pointer",
                color: "#007bff",
                textDecoration: "underline",
                width: "100%",
              }}
            >
              Rastrear
            </a>
          );
        }

        if (showActions) {
          if (row.enlaceTransportadora === null) {
            return (
              <input
                type="text"
                value={
                  pedidosEditados[row.idPedido]?.enlaceTransportadora ??
                  row.enlaceTransportadora ??
                  ""
                }
                disabled={!showActions || guardado[row.idPedido]}
                style={{
                  padding: "4px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                onChange={(e) =>
                  handlePedidoChange(
                    row,
                    "enlaceTransportadora",
                    e.target.value
                  )
                }
              />
            );
          } else if (row.enlaceTransportadora) {
            return (
              <a
                href={row.enlaceTransportadora}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "4px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  display: "inline-block",
                  textAlign: "center",
                  cursor: "pointer",
                  color: "#007bff",
                  textDecoration: "underline",
                  width: "100%",
                }}
              >
                Rastrear
              </a>
            );
          } else {
            return null;
          }
        }

        return null;
      },
    },
    {
      name: "Acciones",
      width: "150px",
      cell: (row) =>
        showActions ? (
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <select
              value={row.estadoPedido}
              style={{ padding: "4px", borderRadius: "4px" }}
              onChange={(e) =>
                handlePedidoChange(row, "estadoPedido", e.target.value)
              }
              disabled={row.nroGuia !== null}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Enviado">Enviado</option>
            </select>
            <button
              style={{
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
              onClick={() => handleGuardarPedido(row)}
            >
              <AiFillSave color="#7066E0" size={20} />
            </button>
          </div>
        ) : null,
    }
  );

  return baseColumns;
};

export default getColumnsReportePedidos;
