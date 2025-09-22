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
