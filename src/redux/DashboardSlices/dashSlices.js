import {createSlice} from "@reduxjs/toolkit";

const dashSlice = createSlice({
  name: "dashSlice",
  initialState: {
    countervalues: [],
  },
  reducers: {
    setCounter: (state, action) => {
      state.countervalues = action.payload;
    },
  },
});

export const {setCounter} = dashSlice.actions;
export default dashSlice.reducer;
