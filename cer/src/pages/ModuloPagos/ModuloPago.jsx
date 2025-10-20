import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { api, apiSinAuth } from "../../Helpers/api";
import { pagos, pedidosAPI, usuarios } from "../../Helpers/url";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { handleError } from "../../Helpers/functions";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
const publickey = import.meta.env.VITE_WOMPI_PUBLICKEY;

const ModuloPagos = () => {
  const [cliente, setCliente] = useState({
    tipoPersona: "Natural",
  });

  const [modo, setModo] = useState("registrar"); // "registrar" | "actualizar"
  const [walletEnabled, setWalletEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirmContrasena, setConfirmContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { carrito } = useSelector((state) => state);
  const [showLoading, setShowLoading] = useState({ display: "none" });

  const { idPedidoParams } = useParams();

  useEffect(() => {
    const initClienteDesdePedido = async () => {
      try {
        setShowLoading({ display: "block" });
        if (idPedidoParams) {
          // Simula el flujo de login exitoso
          setIsLoggedIn(true);

          // 🔹 Obtener datos del cliente ya logueado
          const { data, status } = await api.get(usuarios.OBTENERCLIENTE);

          if (status === 200 && data.data) {
            setCliente(data.data);
            setModo("actualizar");
            setWalletEnabled(true);
            setShowLoading({ display: "none" });
            Swal.fire(
              "Bienvenido",
              data.message || "Datos cargados",
              "success"
            );
          } else {
            setShowLoading({ display: "none" });
            Swal.fire("Atención", "Aún no estás registrado", "warning");
            setModo("registrar");
            setWalletEnabled(false);
          }
        }
      } catch (error) {
        setShowLoading({ display: "none" });
        Swal.fire(
          "Error",
          error.response?.data?.message || "Error al cargar datos del cliente",
          "error"
        );
      }
    };

    initClienteDesdePedido();
    setShowLoading({ display: "none" });
  }, [idPedidoParams]);

  const onSubmit = async () => {
    try {
      setShowLoading({ display: "block" });
      let idPedido = idPedidoParams;
      let payload;

      if (!idPedido) {
        // Caso 1 o 2 → crear pedido normalmente
        const payloadAgregarPedido = carrito.local.map((item) => ({
          IdPedido: 0,
          IdProducto: item.id,
          Cantidad: item.cantidad,
          Subtotal: parseFloat(item.precio),
        }));

        const respPedido = await api.post(
          pedidosAPI.AGREGARPEDIDO,
          payloadAgregarPedido
        );
        if (respPedido.data.status === 200) {
          //construye el payload
          payload = carrito.local.map((item) => ({
            Cantidad: item.cantidad,
            Monto: parseFloat(item.precio),
          }));

          idPedido = respPedido.data.data.idPedido;
          localStorage.removeItem("carrito");
        } else {
          setShowLoading({ display: "none" });
          Swal.fire("Error", "No se pudo crear el pedido", "error");
          return;
        }
      } else {
        // Caso 3 → cliente viene con idPedido ya creado
        const { data, status } = await api.get(
          pedidosAPI.PEDIDODETALLE.replace("{idPedido}", idPedido)
        );

        if (status === 200 && data.data) {
          //Crea el payload
          payload = data.data.productos.map((item) => ({
            Cantidad: item.cantidad,
            Monto: parseFloat(item.precioUnitario),
          }));
        } else {
          setShowLoading({ display: "none" });
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
        const resp = await api.post(
          pagos.ORDENPAGO.replace("{idPedido}", idPedido),
          payload
        );

        setShowLoading({ display: "none" });
        if (resp.status === 200) {
          const { referencia, montoEnPesos, firma, redirectUrl, publicKey } =
            resp.data?.data;
          // 🔹 Wompi usa el checkout con parámetros GET:
          const checkoutUrl = `https://checkout.wompi.co/p/?public-key=${publicKey}&currency=COP&amount-in-cents=${montoEnPesos}&reference=${referencia}&signature%3Aintegrity=${firma}&redirect-url=${redirectUrl}`;

          console.log(checkoutUrl, montoEnPesos);
          // 🔹 Redirige al checkout
          window.location.href = checkoutUrl;
        } else {
          Swal.fire("Error", "No se pudo generar la orden de pago", "error");
        }
      }
    } catch (error) {
      setShowLoading({ display: "none" });
      setIsLoggedIn(false);
      handleError(error);
    }
  };

  const handleLogin = async () => {
    try {
      setShowLoading({ display: "block" });
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
          setShowLoading({ display: "none" });
          Swal.fire("Bienvenido", data.message || "Datos cargados", "success");
        }
      } else {
        setShowLoading({ display: "none" });
        Swal.fire("Atención", "Aún no estás registrado", "warning");
        setModo("registrar");
        setWalletEnabled(false);
      }
    } catch (error) {
      setShowLoading({ display: "none" });
      handleError(error.response?.data?.message);
    }
  };

  const handleRegistrar = async () => {
    if (!isLoggedIn && cliente.contrasena !== confirmContrasena) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    try {
      setShowLoading({ display: "block" });
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

      const { data, status, message } = response.data;

      if (status === 200) {
        setShowLoading({ display: "none" });
        Swal.fire("Éxito", message, "success");

        if (modo === "registrar") {
          const token = data;
          if (token) localStorage.setItem("user", JSON.stringify({ token }));
          setWalletEnabled(true);
          setModo("actualizar");
        }
      } else {
        setShowLoading({ display: "none" });
        Swal.fire(
          "Error",
          data.message || "No se pudo procesar la operación",
          "error"
        );
      }
    } catch (error) {
      handleError(error);
      setShowLoading({ display: "none" });
    }
  };

  return (
    <>
      <Loading estilo={showLoading}></Loading>
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

          {walletEnabled && (
            <div
              id="wallet_container"
              className="d-flex justify-content-center"
            >
              <button
                className="btn btn-success"
                onClick={onSubmit}
                style={{ fontWeight: "bold" }}
              >
                Pagar con Wompi
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ModuloPagos;
