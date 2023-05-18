import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const repuestoSlice = createSlice({
  name: "repuestos",
  initialState: {
    repuestos: [],
    copiaDeRepuestos: [],
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

export const getRepuestos = () => (dispatch) => {
  axios
    .get("/repuesto")
    .then((res) => {
      dispatch(setRepuestos(res.data));
    })
    .catch((err) => err.message);
};
