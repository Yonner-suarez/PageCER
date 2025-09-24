// columns.js
import { BiEdit, BiTrash } from "react-icons/bi";

export const getColumns = (
  iconColor,
  iconSize,
  handleEdit,
  handleDelete,
  showActions
) => {
  const baseColumns = [
    {
      name: "Marca",
      selector: (row) => row.marca?.nombre || "",
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.categoria?.nombre || "",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre || "",
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion || "",
      wrap: true,
    },
    {
      name: "Precio",
      selector: (row) => `$${row.precio?.toLocaleString() || 0}`,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.cantidad ?? 0,
      sortable: true,
    },
  ];

  if (showActions) {
    baseColumns.push({
      name: "Acciones",
      cell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <BiEdit
            style={{ color: iconColor, fontSize: iconSize, cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          />
          <BiTrash
            style={{ color: iconColor, fontSize: iconSize, cursor: "pointer" }}
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  return baseColumns;
};

export default getColumns;
