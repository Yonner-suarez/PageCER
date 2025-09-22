import Swal from "sweetalert2";

export const handleError = (
  err,
  title = "Atención",
  icon = "warning",
  onCallback = () => null
) => {
  if (err.response) {
    const { response } = err;
    if (response.data.data) {
      if (Array.isArray(response.data.data)) {
        Swal.fire({
          text: response.data
            ? response.data.data[0].mensaje
            : "Ha ocurrido un error en la operación",
          title,
          icon,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "boton-aceptar",
          },
        }).then(() => {
          onCallback();
        });
      } else {
        Swal.fire({
          text:
            typeof response.data?.message == "string"
              ? response.data.message
              : response.data.data
              ? response.data.data.mensaje
              : "Ha ocurrido un error en la operación",
          title,
          icon,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "boton-aceptar",
          },
        }).then(() => {
          onCallback();
        });
      }
    } else {
      Swal.fire({
        text: response.data
          ? response.data.message
          : "Ha ocurrido un error en la operación",
        title,
        icon,
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "boton-aceptar",
        },
      }).then(() => {
        onCallback();
      });
    }
  }
};

/**
 * Decodifica un JWT y, si está vencido, ejecuta la acción de expirado.
 *
 * @param {string} token - JWT completo.
 * @param {object} options - Opciones:
 *    - navigateFn: función a llamar cuando el token esté vencido (ej: navigate de react-router).
 *    - redirectTo: ruta a la que navegar si no se pasa navigateFn (opcional).
 *    - onExpired: callback adicional a ejecutar cuando el token esté vencido (opcional).
 * @returns {object|null} payload decodificado o null en error.
 */
export function parseJwt(token, navigateFn, redirectTo = "/login") {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    // Verificar expiración
    if (payload?.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp <= now) {
        // Token vencido -> limpiar y redirigir
        localStorage.removeItem("user");
        if (typeof navigateFn === "function") {
          navigateFn(redirectTo);
        }
        return null;
      }
    }

    return payload;
  } catch (e) {
    console.error("Error decodificando JWT:", e);
    return null;
  }
}
export function getRoleFromToken(token) {
  const payload = parseJwt(token, navigateFn, redirectTo);
  return payload?.role || null;
}
