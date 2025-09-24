import { BiTrash, BiEdit } from "react-icons/bi";

export const getColumns = (
  iconColor,
  iconSize,
  handleEdit,
  handleDelete,
  showActions
) => {
  const baseColumns = [
    {
      name: "ID",
      selector: (row) => row.id ?? "",
      sortable: true,
      width: "80px",
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre ?? "",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.correo ?? "",
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.role ?? row.rol ?? "",
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
