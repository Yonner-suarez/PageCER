import "bootstrap/dist/css/bootstrap.min.css";
import "./RenderLogo.css";
import titulo from "../../assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // usa named import según tu versión

// Íconos
import loginAdmin from "../../assets/clarity--administrator-solid.svg";
import loginCliente from "../../assets/codicon--account.svg";
import infoIcon from "../../assets/codicon--account.svg";
import pedidosIcon from "../../assets/material-symbols--order-play.svg";
import exitSession from "../../assets/iconamoon--exit.svg";
import "bootstrap-icons/font/bootstrap-icons.css";

const iconColor = "#7066E0";
const iconSize = "24px";

const RenderLogo = ({ setShowModal, setShowAdmin }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleShow = (admin = 0) => {
    setShowAdmin(admin !== 0);
    setShowModal(true);
  };

  const checkUser = () => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setIsLoggedIn(false);
      setRole(null);
      return;
    }

    // soportar tanto string token guardado directamente como JSON { token: "..." }
    let user;
    try {
      user = JSON.parse(stored);
    } catch (err) {
      // no era JSON: asumimos que guardaron raw token string
      user = { token: stored };
    }

    if (!user?.token) {
      setIsLoggedIn(false);
      setRole(null);
      return;
    }

    try {
      const decoded = jwtDecode(user.token);

      // normalizar exp (si viene en ms -> convertir a s)
      let exp = decoded.exp;
      if (exp && exp > 9999999999) exp = Math.floor(exp / 1000);

      const now = Date.now() / 1000;
      if (exp && exp > now) {
        setIsLoggedIn(true);
        // role puede venir con distintas claves: 'role' o 'Role' etc.
        setRole(decoded.role ?? decoded.Role ?? null);
      } else {
        // expirado
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setRole(null);
      }
    } catch (err) {
      console.error("Error decodificando token:", err);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setRole(null);
    }
  };

  useEffect(() => {
    // comprobar al montar
    checkUser();

    // escuchar el evento personalizado que lanzamos desde el login
    window.addEventListener("userChanged", checkUser);

    // opcional: también escuchar storage para cambios desde otras pestañas
    const onStorage = (e) => {
      if (e.key === "user") checkUser();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("userChanged", checkUser);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    // avisar a otros escuchadores (opcional)
    window.dispatchEvent(new Event("userChanged"));
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
  };

  return (
    <header className="container-fluid bg-white py-2" style={{ width: "80%" }}>
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo centrado */}
        <div className="flex-grow-1 text-center">
          <Link to="/" className="linklogo">
            <img src={titulo} alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Si no hay sesión => botones login */}
        {!isLoggedIn ? (
          <div className="d-flex gap-3 me-3">
            <button
              className="btn btn-link p-0"
              onClick={() => handleShow(0)}
              title="Login Cliente"
            >
              <img src={loginCliente} alt="Cliente" className="loginIcon" />
            </button>
            <button
              className="btn btn-link p-0"
              onClick={() => handleShow(1)}
              title="Login Admin"
            >
              <img src={loginAdmin} alt="Administrador" className="loginIcon" />
            </button>
          </div>
        ) : (
          <div className="d-flex gap-4 me-4 align-items-center">
            {role === "Cliente" ? (
              <>
                <Link
                  to="/informacion"
                  className="text-decoration-none text-dark text-center"
                >
                  <img src={infoIcon} alt="Información" className="menuIcon" />
                  <div className="small">Información</div>
                </Link>
                <Link
                  to="/pedidos"
                  className="text-decoration-none text-dark text-center"
                >
                  <img src={pedidosIcon} alt="Pedidos" className="menuIcon" />
                  <div className="small">Mis pedidos</div>
                </Link>
              </>
            ) : (
              <Link
                to="/modulo_administrador"
                className="text-decoration-none text-dark text-center"
              >
                <img src={loginAdmin} alt="Admin" className="menuIcon" />
                <div className="small">Administrador</div>
              </Link>
            )}

            {/* Botón cerrar sesión */}
            <button
              onClick={cerrarSesion}
              className="btn btn-link text-dark text-center p-0"
              title="Cerrar sesión"
            >
              <img src={exitSession} alt="Salir" className="menuIcon" />
              <div className="small">Salir</div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default RenderLogo;
