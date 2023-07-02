import svg from "rollup-plugin-svg";

export default {
  // Otras configuraciones de Rollup...

  plugins: [
    // Otros plugins...
    svg({
      // Opciones del plugin SVG
      base64: true, // Convierte el SVG en base64
      // Aquí puedes agregar más opciones según tus necesidades
    }),
  ],

  // Resto de la configuración de Rollup...
};
