import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";
import LoaderSlices from "./LoaderSlices/LoaderSlices";

const store = configureStore({
  reducer: {
    user: UserSlice,
    loader: LoaderSlices,
  },
});
export default store;
