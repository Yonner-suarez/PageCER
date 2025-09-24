import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const AgregarUsuarioModal = ({
  isOpen,
  onClose,
  onGuardar,
  empleadoEditar = null,
  cargos = ["Administrador", "Logistica"],
}) => {
  const [form, setForm] = useState({
    NroDocumento: "",
    Nombre: "",
    Correo: "",
    Contrasenia: "",
    Cargo: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (empleadoEditar) {
      setForm({
        Nombre: empleadoEditar.nombre || "",
        NroDocumento: empleadoEditar.documento || "",
        Correo: empleadoEditar.correo || "",
        Contrasenia: empleadoEditar.contrasenia || "",
        Cargo: empleadoEditar.rol || "",
      });
    } else {
      setForm({
        NroDocumento: "",
        Nombre: "",
        Correo: "",
        Contrasenia: "",
        Cargo: "",
      });
    }
  }, [empleadoEditar, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.NroDocumento ||
      !form.Nombre ||
      !form.Correo ||
      !form.Contrasenia ||
      !form.Cargo
    ) {
      Swal.fire(
        "Error",
        "Por favor completa todos los campos obligatorios",
        "error"
      );
      return;
    }

    onGuardar(form, empleadoEditar?.id);
  };

  // Validación: todos los campos deben estar completos
  const isFormValid =
    form.NroDocumento &&
    form.Nombre &&
    form.Correo &&
    form.Contrasenia &&
    form.Cargo;

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      {/* Encabezado del modal */}
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center fw-bold fs-4">
          {empleadoEditar ? "Editar Empleado" : "Agregar Empleado"}
        </Modal.Title>
      </Modal.Header>

      {/* Cuerpo del modal */}
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nro. Documento</Form.Label>
                <Form.Control
                  type="text"
                  name="NroDocumento"
                  value={form.NroDocumento}
                  onChange={handleChange}
                  placeholder="Ingrese el Nro. Documento"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="Nombre"
                  value={form.Nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="Correo"
                  value={form.Correo}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="Contrasenia"
                    value={form.Contrasenia}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Cargo</Form.Label>
                <Form.Select
                  name="Cargo"
                  value={form.Cargo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  {cargos.map((cargo, index) => (
                    <option key={index} value={cargo}>
                      {cargo}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
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
          disabled={!isFormValid}
          style={{ backgroundColor: "#7066E0" }}
        >
          {empleadoEditar ? "Actualizar" : "Crear"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarUsuarioModal;
