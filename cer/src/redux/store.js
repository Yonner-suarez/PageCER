import { configureStore } from "@reduxjs/toolkit";
import repuestos from "./slices/repuestos";

export default configureStore({
  reducer: {
    repuestos,
  },
});
