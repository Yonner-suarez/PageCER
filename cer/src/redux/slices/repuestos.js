import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiSinAuth } from "../../Helpers/api";
import { handleError } from "../../Helpers/functions";

export const repuestoSlice = createSlice({
  name: "repuestos",
  initialState: {
    repuestos: [],
    copiaDeRepuestos: [],
    cantidad: 0,
    cantidadReal: 0,
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
export const getRepuestos =
  (filtro = null) =>
  (dispatch) => {
    apiSinAuth
      .post("catalogoProductos/v1/Catalogo/productos", {
        IdMarca: filtro?.IdMarca || 0,
        IdCategoria: filtro?.IdCategoria || 0,
        RangoPrecio: filtro?.RangoPrecio || "",
        Busqueda: filtro?.Busqueda || "",
      })
      .then((res) => {
        dispatch(setRepuestos(res.data));
      })
      .catch((err) => handleError(err));
  };
