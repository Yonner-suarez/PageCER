import Footer from "../../components/Footer/Footer";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { api, apiSinAuth } from "../../Helpers/api";
import { pagos, pedidosAPI, usuarios } from "../../Helpers/url";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { handleError } from "../../Helpers/functions";
import { useLocation, useParams } from "react-router-dom";

initMercadoPago("TEST-ace76d8d-4c34-4ac7-aa9c-e045d70a3260");

const ModuloPagos = () => {
  const [cliente, setCliente] = useState({});
  const [modo, setModo] = useState("registrar"); // "registrar" | "actualizar"
  const [walletEnabled, setWalletEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirmContrasena, setConfirmContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { carrito } = useSelector((state) => state);
  const [showModalCliente, setShowModalCliente] = useState(false);

  const { idPedidoParams } = useParams();

  useEffect(() => {
    const initClienteDesdePedido = async () => {
      try {
        console.log(idPedidoParams);
        if (idPedidoParams) {
          // Simula el flujo de login exitoso
          setIsLoggedIn(true);

          // 🔹 Obtener datos del cliente ya logueado
          const { data, status } = await api.get(usuarios.OBTENERCLIENTE);

          if (status === 200 && data.data) {
            setCliente(data.data);
            setModo("actualizar");
            setWalletEnabled(true);
            Swal.fire(
              "Bienvenido",
              data.message || "Datos cargados",
              "success"
            );
          } else {
            Swal.fire("Atención", "Aún no estás registrado", "warning");
            setModo("registrar");
            setWalletEnabled(false);
          }
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Error al cargar datos del cliente",
          "error"
        );
      }
    };

    initClienteDesdePedido();
  }, [idPedidoParams]);

  const onSubmit = async () => {
    try {
      let idPedido = idPedidoParams;
      let monto = 0;

      if (!idPedido) {
        // Caso 1 o 2 → crear pedido normalmente
        const payload = carrito.local.map((item) => ({
          IdPedido: 0,
          IdProducto: item.id,
          Cantidad: item.cantidad,
          Subtotal: parseFloat(item.precio),
        }));

        const respPedido = await api.post(pedidosAPI.AGREGARPEDIDO, payload);
        if (respPedido.data.status === 200) {
          localStorage.removeItem("carrito");

          idPedido = respPedido.data.data.idPedido;
          monto = respPedido.data.data.monto; // ✅ ya viene del backend
        } else {
          Swal.fire("Error", "No se pudo crear el pedido", "error");
          return;
        }
      } else {
        // Caso 3 → cliente viene con idPedido ya creado
        setLoading(true);
        const { data, status } = await api.get(
          pedidosAPI.PEDIDODETALLE.replace("{idPedido}", idPedido)
        );
        setLoading(false);

        if (status === 200 && data.data) {
          monto = data.data.monto; // ✅ tomado del detalle del pedido
        } else {
          Swal.fire(
            "Error",
            "No se pudo obtener el detalle del pedido",
            "error"
          );
          return;
        }
      }

      if (idPedido) {
        // Siempre genera la orden de pago
        const resp = await api.post(pagos.ORDENPAGO, {
          idPedido,
          monto,
        });

        window.location.href = resp.data.data;
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const handleLogin = async () => {
    try {
      const email = document.querySelector("#loginEmail").value;
      const password = document.querySelector("#loginPassword").value;

      const res = await apiSinAuth.post(usuarios.LOGINCLIENTE, {
        correo: email,
        contrasenia: password,
      });

      if (res.data.status === 200 && res.data.data) {
        const token = res.data.data;
        localStorage.setItem("user", JSON.stringify({ token }));
        window.dispatchEvent(new Event("userChanged"));
        setIsLoggedIn(true);
        const { data, status } = await api.get(usuarios.OBTENERCLIENTE);

        if (status === 200 && data.data) {
          setCliente(data.data);
          setModo("actualizar");
          setWalletEnabled(true);
          Swal.fire("Bienvenido", data.message || "Datos cargados", "success");
        }
      } else {
        Swal.fire("Atención", "Aún no estás registrado", "warning");
        setModo("registrar");
        setWalletEnabled(false);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Error en login",
        "error"
      );
    }
  };

  const handleRegistrar = async () => {
    if (!isLoggedIn && cliente.contrasena !== confirmContrasena) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    try {
      const payload = {
        idAdmin: cliente.idUsuario || 0, // 👈 importante en actualización
        nroDocumento: cliente.documento || 0,
        nombre: cliente.nombre || "",
        correo: cliente.correo || "",
        contrasenia: cliente.contrasena || "",
        tipoPersona: cliente.tipoPersona || "",
        codigoPostal: cliente.codigoPostal || "",
        direccion: cliente.direccion || "",
        telefono: cliente.telefono || "",
      };

      let response;
      if (modo === "registrar") {
        response = await api.post(usuarios.CREARCLIENTE, payload);
      } else if (modo === "actualizar") {
        response = await api.put(usuarios.ACTUALIZARCLIENTE, payload);
      }

      const { data, status } = response;

      if (status === 200) {
        Swal.fire("Éxito", data.message, "success");

        if (modo === "registrar") {
          setWalletEnabled(true);
          setModo("actualizar");
        }
      } else {
        Swal.fire(
          "Error",
          data.message || "No se pudo procesar la operación",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Error en el registro/actualización",
        "error"
      );
    }
  };

  return (
    <>
      <div
        className="container border border-primary p-4 rounded"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Login rápido */}
        <div className="row align-items-center mb-4" style={{ width: "80%" }}>
          {/* Texto a la izquierda */}
          <div className="col-md-4 text-start">
            <h5 className="mb-0">
              <strong>¿Ya has comprado con nosotros?</strong>
            </h5>
          </div>

          {/* Inputs y botón a la derecha */}
          <div className="col-md-8">
            <div className="d-flex justify-content-end gap-2">
              <input
                id="loginEmail"
                type="email"
                className="form-control"
                placeholder="Ingresa tu correo"
                style={{ maxWidth: "250px" }}
              />
              <input
                id="loginPassword"
                type="password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
                style={{ maxWidth: "250px" }}
              />
              <button
                className="btn"
                style={{
                  backgroundColor: "#7986CB",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={handleLogin}
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>

        {/* Datos de facturación */}
        <h6 className="fw-bold">Datos de facturación</h6>
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
            <label className="form-label">Nro. Teléfono</label>
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
            <label className="form-label">Nro de documento</label>
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
            <label className="form-label">Tipo persona</label>
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
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={isLoggedIn ? "xxxxxx" : cliente.contrasena || ""}
                disabled={isLoggedIn} // si está logueado → deshabilita
                onChange={(e) =>
                  setCliente({ ...cliente, contrasena: e.target.value })
                }
              />
              {!isLoggedIn && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </button>
              )}
            </div>
          </div>
          {!isLoggedIn && (
            <div className="col-md-3">
              <label className="form-label">Confirmar Contraseña</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  value={confirmContrasena}
                  onChange={(e) => setConfirmContrasena(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Botones */}
        <div
          className="d-flex justify-content-end align-items-center mt-4 gap-3"
          style={{ width: "100%", alignItems: "end" }}
        >
          {!walletEnabled && (
            <button
              className="btn"
              style={{
                backgroundColor: "#7986CB",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleRegistrar}
            >
              {modo === "registrar" ? "Registrar" : "Actualizar"}
            </button>
          )}

          {walletEnabled && (
            <div
              id="wallet_container"
              className="d-flex justify-content-center"
            >
              <Wallet onError={false} onSubmit={onSubmit} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ModuloPagos;
