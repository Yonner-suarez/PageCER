import { BiTrash, BiEdit } from "react-icons/bi";

const iconColor = "#7066E0";
const iconSize = 20;

// Funciones de ejemplo (puedes sobrescribirlas en el componente que use la tabla)
const handleEdit = (row) => {
  console.log("Editar", row);
};

const handleDelete = (row) => {
  console.log("Eliminar", row);
};

const columns = [
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
  {
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
  },
];

export default columns;
