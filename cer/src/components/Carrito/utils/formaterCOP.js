export default function formatearNumeroCOP(numero) {
  // Primero, verificamos si el número es válido
  if (isNaN(numero)) {
    return "Número inválido";
  }

  // Convertimos el número a formato de moneda
  const formatoCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  // Formateamos el número en formato COP
  const numeroFormateado = formatoCOP.format(numero);

  return numeroFormateado;
}
