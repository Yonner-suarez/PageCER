import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { api } from "../../Helpers/api";
import { usuarios } from "../../Helpers/url";
import { handleError } from "../../Helpers/functions";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const ModalInfoCliente = ({ show, onHide }) => {
  const [cliente, setCliente] = useState({});

  // 🔹 Al abrir el modal, obtener cliente desde la API
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const { data, status } = await api.get(usuarios.OBTENERCLIENTE);

        if (status === 200 && data.data) {
          setCliente(data.data);
        } else {
          Swal.fire(
            "Error",
            "No se encontró la información del cliente",
            "error"
          );
          onHide();
        }
      } catch (error) {
        handleError(error);
        onHide();
      }
    };

    if (show) {
      obtenerCliente();
    }
  }, [show, onHide]);

  const handleActualizar = async () => {
    try {
      const payload = {
        idAdmin: cliente.idUsuario || 0,
        nroDocumento: cliente.documento || 0,
        nombre: cliente.nombre || "",
        correo: cliente.correo || "",
        tipoPersona: cliente.tipoPersona || "",
        codigoPostal: cliente.codigoPostal || "",
        direccion: cliente.direccion || "",
        telefono: cliente.telefono || "",
        contrasenia: cliente.contrasenia || "",
      };

      const { data, status } = await api.put(
        usuarios.ACTUALIZARCLIENTE,
        payload
      );

      if (status === 200) {
        Swal.fire("Éxito", data.message, "success");
        onHide(); // cerrar modal
      } else {
        Swal.fire(
          "Error",
          data.message || "No se pudo actualizar el cliente",
          "error"
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              className="form-control"
              value={cliente.nombre || ""}
              onChange={(e) =>
                setCliente({ ...cliente, nombre: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={cliente.correo || ""}
              onChange={(e) =>
                setCliente({ ...cliente, correo: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              value={cliente.telefono || ""}
              onChange={(e) =>
                setCliente({ ...cliente, telefono: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Documento</label>
            <input
              type="text"
              className="form-control"
              value={cliente.documento || ""}
              onChange={(e) =>
                setCliente({ ...cliente, documento: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Tipo Persona</label>
            <select
              className="form-select"
              value={cliente.tipoPersona || "Natural"}
              onChange={(e) =>
                setCliente({ ...cliente, tipoPersona: e.target.value })
              }
            >
              <option>Natural</option>
              <option>Jurídica</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Código Postal</label>
            <input
              type="text"
              className="form-control"
              value={cliente.codigoPostal || ""}
              onChange={(e) =>
                setCliente({ ...cliente, codigoPostal: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              value={cliente.direccion || ""}
              onChange={(e) =>
                setCliente({ ...cliente, direccion: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            {" "}
            <label className="form-label">Contraseña</label>{" "}
            <div className="input-group">
              {" "}
              <input
                type="password"
                className="form-control"
                value="xxxxxx"
                disabled={true}
                onChange={(e) =>
                  setCliente({ ...cliente, contrasenia: e.target.value })
                }
              />{" "}
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={true}
              >
                {" "}
                <EyeSlashFill />
              </button>{" "}
            </div>{" "}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          style={{
            backgroundColor: "#7986CB",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={handleActualizar}
        >
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfoCliente;
