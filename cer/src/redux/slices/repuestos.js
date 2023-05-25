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
    setCantidadMas: (state, action) => {
      state.cantidad += action.payload;
    },
    setCantidadMenos: (state, action) => {
      state.cantidad -= action.payload;
    },
  },
});

export default repuestoSlice.reducer;

export const { setRepuestos, setCantidadMas, setCantidadMenos } =
  repuestoSlice.actions;

export const getRepuestos = () => (dispatch) => {
  axios
    .get("/repuesto")
    .then((res) => {
      dispatch(setRepuestos(res.data));
    })
    .catch((err) => err.message);
};
export const aumentarCantidad = (cantidad) => (dispatch) => {
  dispatch(setCantidadMas(cantidad));
};
export const quitarcantidad = (cantidad) => (dispatch) => {
  dispatch(setCantidadMenos(cantidad));
};
