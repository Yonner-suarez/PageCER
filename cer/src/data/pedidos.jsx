import { CreditCard, Eye } from "react-bootstrap-icons";

export const getPedidosColumns = (
  handlePagar,
  handleVerDetalle,
  iconColor = "#7066E0",
  iconSize = 20
) => [
  {
    name: "Fecha",
    selector: (row) => {
      const fecha = new Date(row.fechaPedido);
      return (
        fecha.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        fecha.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    },
    sortable: true,
  },
  {
    name: "Nro Guia",
    selector: (row) => row.nroGuia || "",
    sortable: true,
  },
  {
    name: "Rastrear",
    selector: (row) => row.enlaceTransportadora || "",
    sortable: true,
    cell: (row) =>
      row.enlaceTransportadora ? (
        <a
          href={row.enlaceTransportadora}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Rastrear guía
        </a>
      ) : (
        ""
      ),
  },
  {
    name: "Acciones",
    cell: (row) => (
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* Icono Pagar */}
        <CreditCard
          size={iconSize}
          color={row.estadoPago === "Pendiente de pago" ? iconColor : "gray"}
          style={{
            cursor:
              row.estadoPago === "Pendiente de pago"
                ? "pointer"
                : "not-allowed",
          }}
          onClick={() =>
            row.estadoPago === "Pendiente de pago" && handlePagar(row.idPedido)
          }
        />

        {/* Icono Ver Detalles */}
        <Eye
          size={iconSize}
          color={iconColor}
          style={{ cursor: "pointer" }}
          onClick={() => handleVerDetalle(row.idPedido)}
        />
      </div>
    ),
  },
];

// 🔹 Columnas para detalle de productos
// 🔹 Columnas para detalle de productos
export const getColumnsDetalles = () => [
  {
    name: "Marca",
    selector: (row) => row.marca,
    sortable: true,
  },
  {
    name: "Categoría",
    selector: (row) => row.cateogira, // 👈 viene con typo desde la API
    sortable: true,
  },
  {
    name: "Descripción",
    selector: (row) => row.descripcion,
    sortable: true,
    wrap: true,
  },
  {
    name: "Cantidad",
    selector: (row) => row.cantidad,
    sortable: true,
  },
  {
    name: "Precio Unitario",
    selector: (row) => `$ ${Number(row.precioUnitario).toFixed(2)}`,
    sortable: true,
  },
  {
    name: "Subtotal",
    selector: (row) =>
      `$ ${(Number(row.cantidad) * Number(row.precioUnitario)).toFixed(2)}`,
    sortable: true,
  },
];
