import { createSlice } from "@reduxjs/toolkit";

const sub = (cantidad, precio) => {
  return cantidad * precio;
};

export const carrito = createSlice({
  name: "carrito",
  initialState: {
    cantidad: 0,
    local: [],
    producto: [],
    subTotal: 0,
    envio: 8500,
    total: 0,
  },
  reducers: {
    setCarritoAdd: (state, action) => {
      state.cantidad += action.payload.cantidad;

      const buscarLocal = localStorage.getItem("carrito");

      if (buscarLocal !== null) {
        const busquedaExistosa = JSON.parse(buscarLocal);

        let buscarProducto = busquedaExistosa.find((rep) => {
          return rep.id === action.payload.producto.id ? rep : undefined;
        });

        if (buscarProducto !== undefined) {
          buscarProducto = {
            ...buscarProducto,
            cantidad: (buscarProducto.cantidad += action.payload.cantidad),
          };
          const index = busquedaExistosa.findIndex(
            (item) => item.id === buscarProducto.id
          );
          if (index >= 0) {
            busquedaExistosa[index] = buscarProducto;

            localStorage.setItem("carrito", JSON.stringify(busquedaExistosa));
            return;
          }
        }

        const agregaProducto = [
          ...busquedaExistosa,
          { ...action.payload.producto, cantidad: 1 },
        ];

        localStorage.setItem("carrito", JSON.stringify(agregaProducto));
        return;
      }

      const añadeCantidad = {
        ...action.payload.producto,
        cantidad: 1,
      };

      const producto = [...state.producto, añadeCantidad];
      localStorage.setItem("carrito", JSON.stringify(producto));

      const carritoLocal = JSON.parse(localStorage.getItem("carrito"));

      state.local = [carritoLocal];
    },

    setLocalState: (state) => {
      const carrito = JSON.parse(localStorage.getItem("carrito"));

      return { ...state, local: carrito };
    },

    setCarritoRemove: (state, { payload }) => {
      state.cantidad -= payload.cantidad;
      const carritoLocal = JSON.parse(localStorage.getItem("carrito"));

      let buscaRepuesto = carritoLocal.find((rep) => rep.id === payload.id);

      if (!buscaRepuesto) return;

      buscaRepuesto = {
        ...buscaRepuesto,
        cantidad: (buscaRepuesto.cantidad -= payload.cantidad),
      };
      const index = carritoLocal.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        carritoLocal[index] = buscaRepuesto;
        state.local = carritoLocal;
        localStorage.setItem("carrito", JSON.stringify(carritoLocal));
        return;
      }
    },

    setPrecio: (state) => {
      const carritoLocal = JSON.parse(localStorage.getItem("carrito"));
      let subTotalLocal = 0;

      carritoLocal.forEach((rep) => {
        const num = parseInt(rep.precio.replace(/\./g, ""));
        return (subTotalLocal += sub(rep.cantidad, num));
      });
      return { ...state, subTotal: subTotalLocal };
    },

    setPrecioHaciaAbajo: (state) => {
      const carritoLocal = JSON.parse(localStorage.getItem("carrito"));
      let subTotalLocal = 0;

      carritoLocal.forEach((rep) => {
        const num = parseInt(rep.precio.replace(/\./g, ""));

        return (subTotalLocal += sub(rep.cantidad, num));
      });
      return { ...state, subTotal: subTotalLocal };
    },
    eliminarProducto: (state, { payload }) => {
      state.cantidad -= payload.cantidad;
      let carritoLocal = JSON.parse(localStorage.getItem("carrito"));

      carritoLocal = carritoLocal.filter((rep) => rep.id !== payload.id);

      localStorage.setItem("carrito", JSON.stringify(carritoLocal));

      state.local = carritoLocal;
    },
    obtenerCantidadesDelLocal: (state) => {
      const carritoLocal = localStorage.getItem("carrito");
      let sumaCantidades = 0;
      let subTotalLocal = 0;

      if (carritoLocal) {
        const carrito = JSON.parse(carritoLocal);

        carrito.forEach((rep) => {
          const num = parseInt(rep.precio.replace(/\./g, ""));
          subTotalLocal += sub(rep.cantidad, num);
          sumaCantidades += rep.cantidad;
        });

        state.cantidad = sumaCantidades;
        state.local = carrito;
        state.subTotal = subTotalLocal;
      }
    },
    obtenerTotal: (state) => {
      const total = (subtotal, envio) => {
        return subtotal + envio;
      };

      const carritoLocal = localStorage.getItem("carrito");
      let subTotalLocal = 0;

      if (carritoLocal) {
        const carrito = JSON.parse(carritoLocal);

        carrito.forEach((rep) => {
          const num = parseInt(rep.precio.replace(/\./g, ""));
          subTotalLocal += sub(rep.cantidad, num);
        });
        state.subTotal = subTotalLocal;
      }
      state.total = total(state.subTotal, state.envio);
    },
  },
});

export default carrito.reducer;

export const {
  setCarritoAdd,
  setPrecio,
  setCarritoRemove,
  setPrecioHaciaAbajo,
  eliminarProducto,
  setLocalState,
  obtenerCantidadesDelLocal,
  obtenerTotal,
} = carrito.actions;

export const añadeCarrito = (cantidad, producto, id) => (dispatch) => {
  const obj = {
    id,
    cantidad,
    producto,
  };
  dispatch(setCarritoAdd(obj));
};
export const qutarCarrito = (id, cantidad) => (dispatch) => {
  const obj = {
    cantidad,
    id,
  };
  dispatch(setCarritoRemove(obj));
};

export const subTotal = (precio) => (dispatch) => {
  dispatch(setPrecio(precio));
};
export const bajarPrecio = () => (dispatch) => {
  dispatch(setPrecioHaciaAbajo());
};
export const eliminarDelCarrito = (id, cantidad) => (dispatch) => {
  const obj = {
    id,
    cantidad,
  };
  dispatch(eliminarProducto(obj));
};
export const localStorageToState = () => (dispatch) => {
  dispatch(setLocalState());
};

export const obtenerCantidades = () => (dispatch) => {
  dispatch(obtenerCantidadesDelLocal());
};
export const obtenTotal = () => (dispatch) => {
  dispatch(obtenerTotal());
};
/*
ahora si no se repite y guarda los cambios nuevos sin que se borre nada pero tengo una funcionalidad en el carrito de compra que eliminar a un prod completo del carrito y esto se veia reflejado en el estado global pero ya no como lo vuelvo hacer
*/
