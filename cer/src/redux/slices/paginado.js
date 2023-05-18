import { createSlice } from "@reduxjs/toolkit";

export const paginado = createSlice({
  name: "numPage",
  initialState: {
    numPage: 1,
  },
  reducers: {
    setNumPageNext: (state, action) => {
      state.numPage += action.payload;
    },
    setNumPagePrev: (state, action) => {
      state.numPage -= action.payload;
    },
  },
});

export default paginado.reducer;

export const { setNumPageNext, setNumPagePrev } = paginado.actions;

export const numPageNext = () => (dispatch) => {
  dispatch(setNumPageNext(1));
};
export const numPagePrevius = () => (dispatch) => {
  dispatch(setNumPagePrev(1));
};
