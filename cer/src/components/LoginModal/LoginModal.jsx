import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loginAdminSVG from "../../assets/SoloLogo.svg";
import loginClienteSVG from "../../assets/SoloLogo.svg"; // reemplázalo si tienes ícono distinto
import { apiSinAuth } from "../../Helpers/api";
import { usuarios } from "../../Helpers/url";
import { handleError } from "../../Helpers/functions";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const LoginModal = ({ show, handleClose, showAdmin, setModuloCliente }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [showLoading, setShowLoading] = useState({ display: "none" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!show) return null;

  const login = async (e) => {
    e.preventDefault();

    const body = { correo, contrasenia };

    try {
      setShowLoading({ display: "block" });
      const endpoint = showAdmin ? usuarios.LOGINADMIN : usuarios.LOGINCLIENTE;
      const { data } = await apiSinAuth.post(endpoint, body);

      const token = data.data;
      if (token) {
        localStorage.setItem("user", JSON.stringify({ token }));
        window.dispatchEvent(new Event("userChanged"));

        const decoded = jwtDecode(token);
        const username = correo.split("@")[0];

        handleClose(); // siempre cierra modal antes del Swal

        if (decoded.role && decoded.role !== "Cliente") {
          // 👉 Admin o Logistica → swal con confirmación antes de redirigir
          setShowLoading({ display: "none" });
          Swal.fire({
            icon: "info",
            title: `Bienvenid@, ${username}`,
            text: "Accediendo al módulo de administración.",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/modulo_administrador";
            }
          });
        } else {
          // 👉 Cliente → swal automático
          setShowLoading({ display: "none" });
          Swal.fire({
            icon: "success",
            title: `¡Bienvenid@, ${username}!`,
            text: "Has iniciado sesión correctamente.",
            showConfirmButton: false,
            timer: 2000,
          });

          setModuloCliente(true);
        }
      }
    } catch (error) {
      setShowLoading({ display: "none" });
      handleError(error);
    }
  };
  return (
    <>
      <Loading estilo={showLoading}></Loading>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "1rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Header */}
            <div className="modal-header border-bottom-0 p-3">
              <button
                type="button"
                className="btn-close ms-auto"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4 pt-0">
              <div className="d-flex flex-column align-items-center mb-4">
                <h5 className="fw-bold fs-4 mb-2 text-dark text-center">
                  <img
                    src={showAdmin ? loginAdminSVG : loginClienteSVG}
                    alt={showAdmin ? "Administrador" : "Cliente"}
                    style={{ width: "40px", marginRight: "0.5rem" }}
                  />
                  {showAdmin
                    ? "Bienvenido Administrador"
                    : "Bienvenido a tu cuenta"}
                </h5>
                <p className="fw-light fst-italic fs-6 text-center text-muted mb-0">
                  {showAdmin
                    ? "Por favor, inicia sesión para ver el panel administrativo."
                    : "Por favor inicia sesión para ver tu información."}
                </p>
              </div>

              <form onSubmit={login}>
                {/* Correo */}
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-bold">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label htmlFor="contrasena" className="form-label fw-bold">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control rounded-pill"
                      id="contrasena"
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-circle ms-2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                {/* Botón login */}
                <div className="d-grid gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill fw-bold"
                    style={{
                      backgroundColor: "#6C5CE7",
                      borderColor: "#6C5CE7",
                      padding: "0.75rem 1.5rem",
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
