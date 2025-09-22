import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/ModuloAdminComponents/NavBarAdmin/NavBarAdmin";
import Footer from "../../components/Footer/Footer";

// Función para decodificar JWT
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decodificando JWT:", e);
    return null;
  }
}

const ModuloAdmin = () => {
  // Leer token desde localStorage bajo la clave "user"
  const userObj = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = userObj.token;

  const tokenData = parseJwt(jwt);

  // Roles permitidos
  const rolesPermitidos = ["Administrador", "Logistico"];
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
