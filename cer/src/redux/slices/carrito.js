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
    setCarritoAdd: (state, action) => {
      state.cantidad += action.payload.cantidad;

      if (state.producto.length !== 0) {
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
        state.producto = [
          ...state.producto,
          { ...action.payload.producto, cantidad: 1 },
        ];
      }
    },
    setCarritoRemove: (state, action) => {
      state.cantidad -= action.payload.cantidad;

      state.producto.filter((pro) => {
        if (pro.id === action.payload.id && action.payload.cantidad > 0)
          pro.cantidad -= action.payload.cantidad;
      });
    },
    setPrecio: (state, action) => {
      state.subTotal += action.payload;
    },
    setPrecioHaciaAbajo: (state, action) => {
      state.subTotal -= action.payload;
    },
  },
});

export default carrito.reducer;

export const {
  setCarritoAdd,
  setPrecio,
  setCarritoRemove,
  setPrecioHaciaAbajo,
} = carrito.actions;

export const añadeCarrito = (cantidad, producto, id) => (dispatch) => {
  const obj = {
    id,
    cantidad,
    producto,
  };
  dispatch(setCarritoAdd(obj));
};
export const qutarCarrito = (cantidad, id) => (dispatch) => {
  const obj = {
    cantidad,
    id,
  };
  dispatch(setCarritoRemove(obj));
};

export const subTotal = (precio) => (dispatch) => {
  const num = parseInt(precio.replace(/\./g, ""));
  dispatch(setPrecio(num));
};
export const bajarPrecio = (precio) => (dispatch) => {
  const num = parseInt(precio.replace(/\./g, ""));
  dispatch(setPrecioHaciaAbajo(num));
};
