import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { api } from "../../../Helpers/api";
import { usuarios } from "../../../Helpers/url";
import { getColumns } from "../../../data/usuarios";
import {
  getIdUserFromToken,
  getRoleFromToken,
  handleError,
} from "../../../Helpers/functions";
import Swal from "sweetalert2";
import AgregarUsuarioModal from "./AgregarUsuarioModal";

const iconColor = "#7066E0";
const iconSize = 20;

const ModuloUsuarios = () => {
  const [usuariosData, setUsuariosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    const jwt = userObj.token;
    const id = getIdUserFromToken(jwt);
    const role = getRoleFromToken(jwt);
    setRole(role);
    setIdUser(id);
    api
      .get(usuarios.OBTENEREMPLEADOS)
      .then((res) => setUsuariosData(res.data.data || []))
      .catch((err) => console.error("Error cargando usuarios:", err))
      .finally(() => setLoading(false));
  }, []);

  // Función para manejar click en "Agregar"
  const handleAgregar = () => {
    setUsuarioEditar(null);
    setModalOpen(true);
  };
  const handleCerrarModal = () => setModalOpen(false);

  const handleEdit = (row) => {
    setUsuarioEditar(row);
    setModalOpen(true);
  };

  const handleDelete = (row) => {
    // Preguntar confirmación antes de eliminar
    Swal.fire({
      title: `¿Deseas eliminar el usuario "${row.nombre}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);

        const url = usuarios.ELIMINAREMPLEADOS.replace(
          "{idEmpleado}",
          row.id
        ).replace("{idAdmin}", idUser);

        api
          .delete(url)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Usuario eliminado",
              text: `El Usuario "${row.nombre}" ha sido eliminado correctamente`,
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      }
    });
  };
  const handleGuardarEmpleado = async (form, idEmpleado) => {
    try {
      const payload = {
        IdAdmin: idUser,
        NroDocumento: Number(form.NroDocumento),
        Nombre: form.Nombre,
        Correo: form.Correo,
        Contrasenia: form.Contrasenia,
        Cargo: form.Cargo,
      };

      const url = usuarios.ACTUALIZAREMPLEADO.replace(
        "{idEmpleado}",
        idEmpleado
      );

      const resp = usuarioEditar
        ? await api.put(url, payload)
        : await api.post(usuarios.CREAREMPLEADO, payload);
      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          text: resp?.data?.message || "Proceso correcto.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          setModalOpen(false);
        });
      }
    } catch (error) {
      handleError(error);
    }
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
          {role === "Administrador" ? (
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
          ) : (
            <></>
          )}
        </div>
        <DataTable
          columns={getColumns(
            iconColor,
            iconSize,
            handleEdit,
            handleDelete,
            role === "Administrador"
          )}
          data={usuariosData}
          progressPending={loading}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
        />
        <AgregarUsuarioModal
          isOpen={modalOpen}
          onClose={handleCerrarModal}
          onGuardar={handleGuardarEmpleado}
          empleadoEditar={usuarioEditar}
        />
      </div>
    </div>
  );
};

export default ModuloUsuarios;
