import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { api } from "../../../Helpers/api";
import { catalogoProductos } from "../../../Helpers/url";
import DropZone from "../DropZone/CropZone";
import { handleError } from "../../../Helpers/functions";
import Swal from "sweetalert2";

const AgregarProductoModal = ({
  isOpen,
  onClose,
  onGuardar,
  marcas,
  categorias,
  productoEditar = null,
}) => {
  const [form, setForm] = useState({
    Image: "",
    Descripcion: "",
    Nombre: "",
    Precio: "",
    Cantidad: "",
    Marca: 0,
    Categoria: 0,
  });

  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (productoEditar) {
      setForm({
        Image: productoEditar.image || "",
        Descripcion: productoEditar.descripcion || "",
        Nombre: productoEditar.nombre || "",
        Precio: productoEditar.precio || "",
        Cantidad: productoEditar.cantidad || "",
        Marca: productoEditar.marca.idMarca || 0,
        Categoria: productoEditar.categoria.idCategoria || 0,
      });
      if (productoEditar.image) {
        setUploadedFile({ Image: productoEditar.image });
        setIsFileLoaded(true);
      }
    } else {
      // Limpiar formulario si no hay productoEditar
      setForm({
        Image: "",
        Descripcion: "",
        Nombre: "",
        Precio: "",
        Cantidad: "",
        Marca: 0,
        Categoria: 0,
      });
      setUploadedFile(false);
      setIsFileLoaded(false);
    }
  }, [productoEditar, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadedFile.Image || Object.keys(uploadedFile.Image).length === 0) {
      Swal.fire("Error", "Debes cargar una imagen válida", "error");
      return;
    }
    if (
      !isFileLoaded ||
      !uploadedFile.Image ||
      Object.keys(uploadedFile.Image).length === 0
    ) {
      return errorImage();
    }

    form.Image = uploadedFile;

    onGuardar(form, productoEditar?.idProducto);
  };

  const errorImage = (message) => {
    Swal.fire("Debes cargar una imagen del juego", "", "error");
    setShowLoading({ display: "none" });
  };

  const removeFile = (key) => {
    setUploadedFile((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
    setIsFileLoaded(false);
  };

  const onDrop = (acceptedFiles, label) => {
    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onabort = () => reject("file reading was aborted");
        reader.onerror = () => reject("file reading has failed");

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.readAsArrayBuffer(file);
      });
    };
    acceptedFiles.forEach((file) => {
      readFile(file)
        .then((fileContent) => {
          setUploadedFile((prevState) => ({ ...prevState, [label]: file }));
          setIsFileLoaded(true);
        })
        .catch((error) => {
          handleError(error);
        });
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      {/* Encabezado del modal */}
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center fw-bold fs-4">
          {productoEditar !== null ? "Actualizar Producto" : "Agregar Producto"}
        </Modal.Title>
      </Modal.Header>

      {/* Cuerpo del modal */}
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Columna Imagen */}
            <Col
              md={4}
              className="d-flex justify-content-center align-items-start"
            >
              <div
                className="border border-2 border-dashed rounded d-flex align-items-center justify-content-center"
                style={{
                  width: "100%",
                  height: "450px",
                  background: "#f5f7fa",
                }}
              >
                <DropZone
                  removeFile={() => {
                    removeFile("Image");
                  }}
                  onFilesUpload={(acceptedFiles) =>
                    onDrop(acceptedFiles, "Image")
                  }
                  required={true}
                  label="Imagen del Producto"
                  uploadedFile={uploadedFile["Image"]}
                />
              </div>
            </Col>

            {/* Columna Formulario */}
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="Nombre"
                  value={form.Nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Ingresa una descripción del producto
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="Descripcion"
                  value={form.Descripcion}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Precio</Form.Label>
                    <Form.Control
                      type="number"
                      name="Precio"
                      value={form.Precio}
                      onChange={handleChange}
                      placeholder="$"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      name="Cantidad"
                      value={form.Cantidad}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Categoría</Form.Label>
                    <Form.Select
                      name="Categoria"
                      value={form.Categoria}
                      onChange={handleChange}
                      className="text-dark"
                    >
                      <option value={0}>Seleccione...</option>
                      {categorias?.map((cat) => (
                        <option key={cat.idCategoria} value={cat.idCategoria}>
                          {cat.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Marca</Form.Label>
                    <div>
                      {marcas?.map((marca) => (
                        <Form.Check
                          key={marca.idMarca}
                          inline
                          label={marca.nombre}
                          type="radio"
                          name="Marca"
                          value={marca.idMarca}
                          checked={form.Marca === marca.idMarca}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      {/* Pie del modal */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          style={{ backgroundColor: "#7066E0" }}
        >
          {productoEditar !== null ? "Actualizar" : "Crear"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarProductoModal;
