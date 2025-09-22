import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { api } from "../../../Helpers/api";
import { usuarios } from "../../../Helpers/url";
import columns from "../../../data/usuarios";

const ModuloUsuarios = () => {
  const [usuariosData, setUsuariosData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(usuarios.OBTENEREMPLEADOS)
      .then((res) => setUsuariosData(res.data.data || []))
      .catch((err) => console.error("Error cargando usuarios:", err))
      .finally(() => setLoading(false));
  }, []);

  // Función para manejar click en "Agregar"
  const handleAgregar = () => {
    // Aquí puedes abrir un modal o redirigir a otra página
    alert("Botón 'Agregar' presionado");
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h3>Usuarios</h3>
          <button
            onClick={handleAgregar}
            style={{
              backgroundColor: "#7066E0",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Agregar
          </button>
        </div>
        <DataTable
          columns={columns}
          data={usuariosData}
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

export default ModuloUsuarios;
