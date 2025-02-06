import {createSlice} from "@reduxjs/toolkit";

const LoaderSlices = createSlice({
  name: "LoaderSlices",
  initialState: {
    IsLoading: true,
  },

  reducers: {
    setLoader: (state, action) => {
      state.IsLoading = action.payload;
    },
  },
});
export const {setLoader} = LoaderSlices.actions;
export default LoaderSlices.reducer;
