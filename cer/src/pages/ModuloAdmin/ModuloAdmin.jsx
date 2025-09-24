import { Outlet, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/ModuloAdminComponents/NavBarAdmin/NavBarAdmin";
import Footer from "../../components/Footer/Footer";
import { parseJwt } from "../../Helpers/functions";

const ModuloAdmin = () => {
  const navigate = useNavigate();

  // Leer token desde localStorage bajo la clave "user"
  const userObj = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = userObj.token;

  const tokenData = parseJwt(jwt, navigate); // 👈 ahora le pasamos navigate

  // Roles permitidos
  const rolesPermitidos = ["Administrador", "Logistica"];
  const puedeAcceder = rolesPermitidos.includes(tokenData?.role);

  if (!puedeAcceder) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>404 Not Found</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <Outlet />
      <Footer />
    </>
  );
};

export default ModuloAdmin;
