import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { api } from "../../../Helpers/api";
import { inventario } from "../../../Helpers/url";
import columns from "../../../data/inventario";
import AgregarProductoModal from "./AgregarProductoModal";
import { handleError } from "../../../Helpers/functions";
import Swal from "sweetalert2";

const ModuloInventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
  });

  useEffect(() => {
    api
      .get(inventario.PRODUCTOS)
      .then((res) => {
        setProductos(res.data.data || []);
      })
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAgregar = () => setModalOpen(true);
  const handleCerrarModal = () => setModalOpen(false);

  const handleGuardar = async (form) => {
    try {
      let imageBase64 = "";

      if (form.Image?.Image instanceof File) {
        imageBase64 = await fileToBase64(form.Image.Image);
      }

      const payload = {
        IdMarca: Number(form.Marca),
        IdCategoria: Number(form.Categoria),
        Descripcion: form.Descripcion,
        Nombre: form.Nombre,
        Image: imageBase64,
        Precio: Number(form.Precio),
        Cantidad: Number(form.Cantidad),
      };

      const resp = await api.post(inventario.AGREGARPRODUCTO, payload);

      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Producto creado",
          text:
            resp?.data?.mensaje || "El producto fue agregado correctamente.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          setModalOpen(false);
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // convierte a base64
      reader.onload = () => resolve(reader.result.split(",")[1]); // quitar "data:image/png;base64,"
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3>Catálogo de Productos</h3>
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
          data={productos}
          progressPending={loading}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
        />

        <AgregarProductoModal
          isOpen={modalOpen}
          onClose={handleCerrarModal}
          onGuardar={handleGuardar}
          producto={nuevoProducto}
          setProducto={setNuevoProducto}
        />
      </div>
    </div>
  );
};

export default ModuloInventario;
