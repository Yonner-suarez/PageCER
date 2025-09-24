import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { api } from "../../../Helpers/api";
import { catalogoProductos, inventario } from "../../../Helpers/url";
import { getColumns } from "../../../data/inventario";
import AgregarProductoModal from "./AgregarProductoModal";
import { getRoleFromToken, handleError } from "../../../Helpers/functions";
import Swal from "sweetalert2";

const iconColor = "#7066E0";
const iconSize = 20;

const ModuloInventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [marcas, setMarcas] = useState([]);

  const [role, setRole] = useState("");
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
  });

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    const jwt = userObj.token;
    const role = getRoleFromToken(jwt);
    setRole(role);

    api.get(catalogoProductos.CATEGORIAS).then((res) => {
      if (res && res.data) setCategorias(res.data.data);
    });

    api.get(catalogoProductos.MARCAS).then((res) => {
      if (res && res.data) setMarcas(res.data.data);
    });

    api
      .get(inventario.PRODUCTOS)
      .then((res) => {
        const dataTabla = (res.data.data || []).map((item) => ({
          ...item,
          Image: item.image,
        }));
        setProductos(dataTabla);
      })
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAgregar = () => {
    setProductoEditar(null);
    setModalOpen(true);
  };
  const handleCerrarModal = () => setModalOpen(false);

  const handleGuardar = async (form, idProducto) => {
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

      const url = inventario.ACTUALIZARPRODUCTODATA.replace(
        "{idProducto}",
        idProducto
      );
      const resp = productoEditar
        ? await api.put(url, payload)
        : await api.post(inventario.AGREGARPRODUCTO, payload);

      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Producto creado",
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

  const handleEdit = (row) => {
    setProductoEditar(row);
    setModalOpen(true);
  };

  const handleDelete = (row) => {
    // Preguntar confirmación antes de eliminar
    Swal.fire({
      title: `¿Deseas eliminar el producto "${row.nombre}"?`,
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

        const url = inventario.ELIMINARPRODUCTO.replace(
          "{IdProducto}",
          row.idProducto
        );

        api
          .delete(url)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Producto eliminado",
              text: `El producto "${row.nombre}" ha sido eliminado correctamente`,
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      }
    });
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
          marcas={marcas}
          categorias={categorias}
          productoEditar={productoEditar}
        />
      </div>
    </div>
  );
};

export default ModuloInventario;
