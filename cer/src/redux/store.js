import { configureStore } from "@reduxjs/toolkit";
import repuestos from "./slices/repuestos";
import numPage from "./slices/paginado";

export default configureStore({
  reducer: {
    repuestos,
    numPage,
  },
});
