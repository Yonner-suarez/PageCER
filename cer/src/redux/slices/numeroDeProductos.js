import { createSlice } from "@reduxjs/toolkit";

export const numeroDeProductos = createSlice({
  name: "numeroDeProductos",
  initialState: {
    numeroDeProductos: [{ cantidad: 0, idProducto: 0 }],
  },
  reducers: {
    numeroDeProductosMas: (state, action) => {
      state.numeroDeProductos[0].cantidad += action.payload.num;
      state.numeroDeProductos[0].idProducto = action.payload.id;
    },
    numeroDeProductosMenos: (state, action) => {
      state.numeroDeProductos[0].cantidad -= action.payload.num;
    },
  },
});

export default numeroDeProductos.reducer;

export const { numeroDeProductosMas, numeroDeProductosMenos } =
  numeroDeProductos.actions;

export const sumaUnProducto = (num, id) => (dispatch) => {
  const obj = {
    num,
    id,
  };

  dispatch(numeroDeProductosMas(obj));
};
export const restaUnProduto = (num, id) => (dispatch) => {
  const obj = {
    num,
    id,
  };
  dispatch(numeroDeProductosMenos(obj));
};
