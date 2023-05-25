import { createSlice } from "@reduxjs/toolkit";

export const carrito = createSlice({
  name: "carrito",
  initialState: {
    cantidad: 0,
    producto: [],
    subTotal: 0,
    envio: 0,
    total: 0,
  },
  reducers: {
    setCarrito: (state, action) => {
      state.cantidad += action.payload.cantidad;

      if (state.producto.length !== 0) {
        console.log("SI HAY REPUESTOS");
        let busca = state.producto.find((pro) => pro.id == action.payload.id);

        if (busca === undefined) {
          state.producto = [
            ...state.producto,
            { ...action.payload.producto, cantidad: 1 },
          ];
          return;
        }
        if (Object.values(busca).length !== 0) {
          state.producto.map((pro) => {
            if (pro.id == action.payload.id) {
              pro.cantidad += 1;
            }
          });
        }
      } else {
        console.log("NO HAY PRODUCTOS");
        state.producto = [
          ...state.producto,
          { ...action.payload.producto, cantidad: 1 },
        ];
      }
    },
    setPrecio: (state, action) => {
      state.subTotal += action.payload;
    },
  },
});

export default carrito.reducer;

export const { setCarrito, setPrecio } = carrito.actions;

export const añadeCarrito = (cantidad, producto, id) => (dispatch) => {
  const obj = {
    id,
    cantidad,
    producto,
  };
  dispatch(setCarrito(obj));
};

export const subTotal = (precio) => (dispatch) => {
  const num = parseInt(precio.replace(/\./g, ""));
  dispatch(setPrecio(num));
};
