import { createSlice } from "@reduxjs/toolkit";

export const carrito = createSlice({
  name: "carrito",
  initialState: {
    cantidad: 0,
    producto: [],
  },
  reducers: {
    setCarrito: (state, action) => {
      state.cantidad += action.payload.cantidad;
      state.producto = [...state.producto, action.payload.producto];
    },
  },
});

export default carrito.reducer;

export const { setCarrito } = carrito.actions;

export const añadeCarrito = (cantidad, producto) => (dispatch) => {
  const obj = {
    cantidad,
    producto,
  };
  dispatch(setCarrito(obj));
};
