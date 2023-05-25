import { configureStore } from "@reduxjs/toolkit";
import repuestos from "./slices/repuestos";
import numPage from "./slices/paginado";
import carrito from "./slices/carrito";

export default configureStore({
  reducer: {
    repuestos,
    numPage,
    carrito,
  },
});
