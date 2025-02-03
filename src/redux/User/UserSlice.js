import {createSlice} from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    values: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const {setUser} = UserSlice.actions;
export default UserSlice.reducer;
