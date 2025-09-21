import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const repuestoSlice = createSlice({
  name: "repuestos",
  initialState: {
    repuestos: [],
    copiaDeRepuestos: [],
    cantidad: 0,
  },
  reducers: {
    setRepuestos: (state, action) => {
      state.repuestos = action.payload;
      state.copiaDeRepuestos = action.payload;
    },
  },
});

export default repuestoSlice.reducer;

export const { setRepuestos } = repuestoSlice.actions;

// Acción Redux con body
export const getRepuestos = () => (dispatch) => {
  axios
    .post("catalogoProductos/v1/Catalogo/productos", {
      idMarca: 0,
      idCategoria: 0,
      rangoPrecio: "",
    })
    .then((res) => {
      dispatch(setRepuestos(res.data));
    })
    .catch((err) => console.error(err.message));
};
